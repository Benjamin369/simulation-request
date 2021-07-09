let urlData = require('../data/data.json');
let baseData = require('../data/base.json');
function request(){}
// 检查该url配置是否存在
request.prototype.checkUrl = function(url, type) {
    let infoArray = urlData.find(function(e) {
        return e.url === url && e.type === type;
    })
    if (infoArray && infoArray.length > 0) {
        return infoArray[0]
    }else if (infoArray && infoArray.url) {
        return infoArray
    }else{
        return {}
    }
}
// 检查Token
request.prototype.checkToken = function(header, info) {
    if (info.skipToken) {
        return true
    }
    let requestToken = header.token
    if (info.token === requestToken) {
        return true
    }
    if (!info.token && requestToken === baseData.defaultToken) {
        return true
    }
    return false
},
// 检查params
request.prototype.checkparams = function(params, info) {
    let paramsRule = info.params
    try {
        parameter(params, paramsRule, 'get')
        return null
    } catch (error) {
        return error
    }
},
// 检查bogy
request.prototype.checkBody = function(body, info) {
    let bodyRule = info.body
    try {
        parameter(body, bodyRule, 'post')
        return null
    } catch (error) {
        return error
    }
}
request.prototype.getErrorReturn = function(message) {
    let returnObj = {}
    let returnObjRuls = baseData.returnObj
    for (let key in returnObjRuls) {
        let row = returnObjRuls[key]
        if (row.type === 'requestStatus') {
            returnObj[key] = row.error
        }
        if (row.type === 'returnObj') {
            returnObj[key] = row.default
        }
        if (row.type === 'message') {
            returnObj[key] = message || row.default
        }
    }
    return returnObj
}
function parameter (body, rules, type) {
    for (let key in rules) {
        if (rules[key].required && !body[key]) {
            throw type + ":[ " + key + ' ] 不能为空'
        }
        if (body[key]){
            // console.log(JSON.stringify(body))
            let value = body[key]
            if (rules[key].type === 'object') {
                if (typeof value === 'object') {
                    parameter(value, body[key].content,type)
                } else {
                    throw type + ":[ " + key + ' ] 应为对象'
                }
            } else {
                if (typeof value!=rules[key].type) {
                    throw type + ":[ " + key + ' ] 应为 '+ rules[key].type
                }
            }
        }
    }
}
module.exports = new request();
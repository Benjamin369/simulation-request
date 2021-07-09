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
    for (let key in paramsRule) {
        if (paramsRule[key].required && !params[key]) {
            return "params:[ " + key + ' ] 不能为空'
        }
        if (params[key]){
            let value = params[key]
            if (typeof value!=paramsRule[key].type) {
                return "params:[ " + key + ' ] 应为 '+ paramsRule[key].type
            }
        }
    }
},
// 检查bogy
request.prototype.checkBody = function(body, info) {
    let bodyRule = info.body
    for (let key in bodyRule) {
        if (bodyRule[key].required && !body[key]) {
            return "body:[ " + key + ' ] 不能为空'
        }
        if (body[key]){
            let value = body[key]
            if (typeof value!=bodyRule[key].type) {
                return "body:[ " + key + ' ] 应为 '+ bodyRule[key].type
            }
        }
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
module.exports = new request();
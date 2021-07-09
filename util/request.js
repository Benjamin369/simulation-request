let urlData = require('../data/data.json');
let baseData = require('../data/base.json');
function request(){}
// 检查该url配置是否存在
request.prototype.cheakUrl = function(url, type) {
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
request.prototype.cheakToken = function(header, info) {
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
request.prototype.cheakparams = function(params, info) {
    let paramsRule = info.params
    for (let key in paramsRule) {
        if (paramsRule[key].required && !params[key]) {
            return "[ " + key + ' ] 不能为空'
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
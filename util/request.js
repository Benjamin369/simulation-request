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
    }else {
        return []
    }
}
// 检查Token
request.prototype.cheakToken = function(header, info) {
    let requestToken = header.token
    
}
module.exports = new request();
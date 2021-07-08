var getUrl = require('../setting/getUrl.json');
var postUrl = require('../setting/postUrl.json');
function verification(){}
function getBsaeInfo ( type ) {
  let urlInfo = {}
  switch (type) {
    case "get":
      urlInfo = getUrl
      break;
    case "post":
      urlInfo = postUrl
      break;
    default:
      urlInfo = {}
  }
  return urlInfo
}
// 检查链接是否存在
verification.prototype.checkUrl = function(type, url){
  let urlInfo = getBsaeInfo(type)
  if (urlInfo[url]) {
    return true
  }
  return false
}

// 检查请求参数是否存在
verification.prototype.checkGetParams = function(type,url,params){
  let urlInfo = getBsaeInfo(type)
  paramsRule = urlInfo[url].params
  params = params||{}
  for (let key in paramsRule) {
    //该参数要求必传
    if (paramsRule[key].require && !params[key]) {
      return {
        check: false,
        message: key + "不能为空！"
      }
    }
    //参数存在，校验是否符合要求
    if (params[key]) {
      //暂无检验
    }
  }
  return {
    check: true,
    message: "校验通过"
  }
}
module.exports = new verification();
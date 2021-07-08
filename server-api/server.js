const app1 = require('../http')
const verification =  require('../utils/verification.js')
const result =  require('../utils/result.js')
const returnObj = { code: 0, msg:"" , data:null}

const bodyParser = require('body-parser')
app1.use(bodyParser.json());
app1.use(bodyParser.urlencoded({extended: false}));
// 接口1,get请求
app1.get('/*', (req, res) => {
  let url = req._parsedUrl.pathname
  if (!verification.checkUrl("get",url)) {
    res.status(404)
    res.end('not found')
  } else {
    res.status(200)
    let checkGetParamsInfo = verification.checkGetParams("get", url, req._parsedUrl)
    let returnInfo = returnObj
    if (!checkGetParamsInfo.check){
      returnInfo.code = 1
      returnInfo.msg = checkGetParamsInfo.message
      returnInfo.data = null
    }else{
      returnInfo.code = 0
      returnInfo.msg = null
      returnInfo.data = result.getResult("get", url)
    }
    res.json(returnInfo)
  }
})
// 接口2,post请求
app1.post('/*', (req, res) => {
  let url = req._parsedUrl.pathname
  if (!verification.checkUrl("post",url)) {
    res.status(404)
    res.end('not found')
  } else {
    res.status(200)
    let checkPostParamsInfo = verification.checkGetParams("post", url, req.body)
    let returnInfo = returnObj
    if (!checkPostParamsInfo.check){
      returnInfo.code = 1
      returnInfo.msg = checkPostParamsInfo.message
      returnInfo.data = null
    } else {
      returnInfo.code = 0
      returnInfo.msg = null
      returnInfo.data = result.getResult("post", url)
    }
    res.json(returnInfo)
  }
})

// 配置服务端口
const server = app1.listen(3000, () => {
  const host = server.address().address
  const port = server.address().port
})
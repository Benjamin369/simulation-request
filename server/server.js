const request = require('../util/request')
const app = require('./http')
app.get('/*', (req, res) => {
    doUrl(req, res, 'get')
})
app.post('/*', (req, res) => {
    doUrl(req, res, 'post')
})
function doUrl (req, res, type) {
    // 地址URL
    let url = req._parsedUrl.pathname
    let urlInfo = request.checkUrl(url, type)
    if (!urlInfo.url){
        res.status(404)
        res.end('')
        return
    }
    let header = req.headers
    if (!request.checkToken(header, urlInfo)) {
        res.status(401)
        res.end('')
        return
    }
    res.status(200)
    let returnMessage = null
    let returnInfo = null
    let params = req.query
    returnMessage = request.checkparams(params, urlInfo)
    if (returnMessage) {
        returnInfo = request.getErrorReturn(returnMessage)
        res.json(returnInfo)
        return
    }
    let body = req.body
    returnMessage = request.checkBody(body, urlInfo)
    if (returnMessage) {
        returnInfo = request.getErrorReturn(returnMessage)
        res.json(returnInfo)
        return
    }
}
const server = app.listen(3000)
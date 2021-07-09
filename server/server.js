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
    console.log('req', req)
    let url = req._parsedUrl.pathname
    let urlInfo = request.cheakUrl(url, type)
    if (!urlInfo.url){
        res.status(404)
        res.end('')
        return
    }
    let header = req.headers
    if (!request.cheakToken(header, urlInfo)) {
        res.status(401)
        res.end('')
        return
    }
    let params = req.query
    let returnMessage = request.cheakparams(params, urlInfo)
    res.status(200)
    let returnInfo = null
    if (returnMessage) {
        returnInfo = request.getErrorReturn(returnMessage)
    }
    res.json(returnInfo)
}
const server = app.listen(3000)
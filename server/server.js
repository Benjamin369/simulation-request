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
    console.log('is xhr',JSON.stringify(req.headers));
    let urlInfo = request.cheakUrl(url, type)
    if (urlInfo.length < 1){
        res.status(404)
        res.end('')
        return
    }
    // if 
    res.status(404)
    res.end('')

}
const server = app.listen(3000)
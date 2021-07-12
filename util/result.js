const utils =  require('./util.js')
function result(){}
result.prototype.getResult = function(returnInfo){
    return setResultInfo(returnInfo.returnObj)
}
// 根据概率
function checkPer (per) {
    if (!per || per <= 0) {
        return false
    }
    if (per >= 100) {
        return true
    }
    let num = utils.randomIntegerNum(0,100)
    if (per >= num){
        return true
    }
    return false
}
// 获取返回对象构造入口
function setResultInfo(row) {
    let result = null
    if (row.canNull && checkPer(row.per)) {
        return null
    }
    if (row.type === "obj") {
        result = getResultObj(row)
    }
    if (row.type === "list") {
        result = getResultList(row )
    }
    if (row.type === "number") {
        result = getResultNumber(row )
    }
    if (row.type === "date") {
        result = getResultDate(row )
    }
    if (row.type === "string") {
        result = getResultString(row )
    }
    if (row.type === "array") {
        result = getResultArray(row )
    }
    return result
}
function getResultObj (row) {
    let content = row.content
    let result = {}
    for (let key in content) {
        result[key] = setResultInfo(content[key])
    }
    return result
}
function getResultList (row) {
    let list = []
    let length = row.number
    let content = row.content
    for (let i = 0; i < length; i++) {
        let row = {}
        for (let key in content) {
        row[key] = setResultInfo(content[key])
        }
        list.push(row)
    }
    return list
}
function getResultArray (row) {
    let list = []
    let length = row.number
    let content = row.content
    for (let i = 0; i < length; i++) {
        list.push(setResultInfo(content[key]))
    }
    return list
}
function getResultNumber (row) {
    if (row.min <= row.max){
        return utils.randomIntegerNum(row.min,row.max)
    } else {
        return 0
    }
}
function getResultDate(row) {
    return utils.dateFormat(row.form, new Date())
}
function getResultString(row) {
    return utils.randomString(6)
}
module.exports = new result();
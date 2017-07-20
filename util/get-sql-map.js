const fs = require('fs')
const walkFile = require('./walk-file')

/**
 * 获取sql目录下的文件目录数据
 * @return {object} 
 */
function getSqlMap() {
  let basePath = __dirname
  console.log("basePath")
  console.log(basePath)
  basePath = basePath.replace(/\\/g, '\/')
  console.log(basePath)

  let pathArr = basePath.split('\/')
  pathArr = pathArr.splice(0, pathArr.length - 1)
  console.log(pathArr)
  basePath = pathArr.join('/') + '/sql/'

  let fileList = walkFile(basePath, 'sql')
  return fileList
}

module.exports = getSqlMap
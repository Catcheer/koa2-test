function log(cxt) {
  console.log(cxt.method)
  console.log(cxt.header.host)
}

module.exports = function () {
  return async function (cxt, next) {
    log(cxt)
    await next()
  }
}
function timeNow() {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      const time = new Date().toLocaleDateString()
      resolve(time)
    }, 3000)
  })
}

module.exports = function () {
  return async function (ctx, next) {
    const time = await timeNow()
    console.log(time)
    await next()
  }
}

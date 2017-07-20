const koa = require("koa")
const fs = require("fs")
const app = new koa()


var reader = function (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}


var parsePostData = function (ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = ""
      ctx.req.addListener("data", (data) => {
        postdata += data
      })

      ctx.req.addListener("end", function () {
        let parsedata = parseData(postdata)
        resolve(parsedata)
      })

    } catch (e) {
      console.log(e)
    }
  })
}

var parseData = function (parseData) {
  let queryData = {}
  let queryStringList = parseData.split("&")
  console.log(queryStringList)
  for (let [index, queryStr] of queryStringList.entries()) {
    let queryItem = queryStr.split("=")
    queryData[queryItem[0]] = (queryItem[1])
  }
  return queryData
}



app.use(async (ctx) => {
  if (ctx.url == "/" && ctx.method == "GET") {
    const html = await reader('./view/from.html')
    ctx.body = html
  } else if (ctx.url == "/" && ctx.method == "POST") {
    const postData = await parsePostData(ctx)
    ctx.body = postData
  } else {
    const html = await reader('./view/404.html')
    ctx.body = html
  }
})
app.listen(4000, () => {
  console.log('listening in 4000')
})



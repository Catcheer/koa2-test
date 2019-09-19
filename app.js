const Koa = require('koa')
const app = new Koa()
var cors = require('koa2-cors');

console.log('test again')

const getTableDate = () => {
  let arr = []
  for (let i = 0; i < 80; i++) {
    arr.push({
      key: i + 1,
      activityId: `活动编码 ${i}`,
      storeProv: `省市区 ${i + 2}`,
      storeName: `门店身上撒上`,
      agentName: `团长 ${i + '22333444455556666'}`,
      itemCode: `订单单号 ${i + 1}`,
      productName: `团购商品 ${i + 5}`,
      purchaseNum: `总数 ${i + 2}`,
      applyStatus: `状态 ${i + 2}`,
      applyNum: `申请收获数100`,
      unapplyNum: `剩余发货数0`,
      state: '待审核',
      handel: 'ss',

    })
  }
  return arr
}
const server = async (ctx, next) => {
  let result = {
    success: true,
    data: null
  }

  if (ctx.method === 'GET') {
    if (ctx.url === '/getString.json') {
      result.data = 'this is string data'
    } else if (ctx.url === '/getNumber.json') {
      result.data = 123456
    } else {
      result.success = false
    }
    ctx.body = result
    next && next()
  } else if (ctx.method === 'POST') {
    if (ctx.url === '/postData.json') {
      result = {
        "code": 0,
       "message": "success",
        page:{
          "order": "ASC",
          "orderBy": "string",
          "pageNo": 0,
          "pageSize": 0,
          result:getTableDate()
        }
      }
    } else {
      result.success = false
    }
    ctx.body = result
    next && next()
  } else {
    ctx.body = 'hello world'
    next && next()
  }
}

app.use(cors());
app.use(server)

module.exports = app

app.listen(3000)
console.log('[demo] test-unit is starting at port 3000')
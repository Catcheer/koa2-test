const Koa = require('koa')
const app = new Koa()
const koaBody=require('koa-body')
const fs = require('fs');
var cors = require('koa2-cors');

const Router=require('koa-router')

var router = new Router();

app.use(cors());



let result = {
  success: true,
  data: null
}

app.use(koaBody());
router.get('/', async (ctx) => {
  result.success = true
  result.data = 'ok'
  ctx.body = result
});


router.post('/upload',async (ctx)=>{
  console.log(ctx);
  console.log(ctx.request.body);
  ctx.body = JSON.stringify(ctx.request.files);
});

// const server = async (ctx, next) => {
//   ctx.set('Access-Control-Allow-Origin', '*');
//   let result = {
//     success: true,
//     data: null
//   }

//   if (ctx.method === 'GET') {
//     if (ctx.url === '/getString.json') {
//       result.data = 'this is string data'
//     } else if (ctx.url === '/getNumber.json') {
//       result.data = 123456
//     } else {
//       result.success = false
//     }
//     ctx.body = result
//     next && next()
//   } else if (ctx.method === 'POST') {
//     if (ctx.url === '/postData.json') {
//       result.data = 'ok'
//     } else if(ctx.url === '/upload'){
//       console.log(ctx)
//     // const file = ctx.request.body.files.file;    // 获取上传文件
//     // const reader = fs.createReadStream(file.path);    // 创建可读流
//     // const ext = file.name.split('.').pop();        // 获取上传文件扩展名
//     // const upStream = fs.createWriteStream(`upload/${Math.random().toString()}.${ext}`);        // 创建可写流
//     // reader.pipe(upStream);    // 可读流通过管道写入可写流
   
//     // reader.on('end',()=>{
//     //   result.data = '上传成功'
//     //   result.success = true
//     // })
//     ctx.body = result
      

//     }
//     else {
//       result.success = false
//     }
//     ctx.body = result
//     next && next()
//   } else {
//     ctx.body = 'hello world'
//     next && next()
//   }
// }

app.use(router.routes())
  .use(router.allowedMethods());
// app.use(server)
console.log(process.env.PORT)
app.listen(process.env.PORT ||3000,()=>{
  console.log('[demo]')
})

module.exports = app

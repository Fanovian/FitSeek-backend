const fs = require('fs');
const https = require('https');
const app = require('./app');

const PORT = process.env.PORT || 3000;

// 假设你的证书放在 certs 目录下
const options = {
  key: fs.readFileSync('/home/ubuntu/api.fanovian.cc.key'), // 私钥文件
  cert: fs.readFileSync('/home/ubuntu/api.fanovian.cc_bundle.crt'), // 证书文件
  // 如果有中间证书（chain），加上这个：
  // ca: fs.readFileSync('./certs/intermediate.crt')
};

// 创建 HTTPS 服务器
https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS server running on port ${PORT}`);
});
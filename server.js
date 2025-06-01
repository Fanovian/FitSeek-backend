const fs = require('fs');
const https = require('https');
const app = require('./app');

const PORT = process.env.PORT || 3000;

// 检查是否为本地测试模式
const isLocal = process.argv.includes('--local');

if (isLocal) {
  // 本地开发，使用 http
  app.listen(PORT, () => {
    console.log(`Local HTTP server running on port ${PORT}`);
  });
} else {
  // 生产环境，使用 https
  const options = {
    key: fs.readFileSync('/home/ubuntu/api.fanovian.cc.key'), // 私钥文件
    cert: fs.readFileSync('/home/ubuntu/api.fanovian.cc_bundle.crt'), // 证书文件
    // ca: fs.readFileSync('./certs/intermediate.crt')
  };

  https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS server running on port ${PORT}`);
  });
}
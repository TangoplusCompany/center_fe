// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createServer } = require("https");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createProxyServer } = require("http-proxy");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { request: httpRequest } = require("http");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { request: httpsRequest } = require("https");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const url = require("url");

const proxy = createProxyServer({ target: "http://localhost:3632" });

const options = {
  key: fs.readFileSync("./localhost+2-key.pem"),
  cert: fs.readFileSync("./localhost+2.pem"),
};

createServer(options, (req, res) => {
  // 이미지 프록시 라우트 추가
  if (req.url.startsWith('/api/proxy-image?')) {
    const queryParams = new url.URL(req.url, `https://${req.headers.host}`);
    const imageUrl = queryParams.searchParams.get('url');
    
    if (!imageUrl) {
      res.writeHead(400);
      res.end('Missing url parameter');
      return;
    }

    // 외부 이미지 가져오기
    const parsedUrl = new url.URL(imageUrl);
    const requestFn = parsedUrl.protocol === 'https:' ? httpsRequest : httpRequest;
    
    const proxyReq = requestFn(imageUrl, (proxyRes) => {
      // CORS 헤더 추가
      res.writeHead(proxyRes.statusCode, {
        'Content-Type': proxyRes.headers['content-type'],
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      });
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      console.error('Proxy image error:', err);
      res.writeHead(500);
      res.end('Failed to fetch image');
    });

    proxyReq.end();
  } else {
    // 기존 프록시 로직
    proxy.web(req, res);
  }
}).listen(4862, () => {
  console.log("🔐 HTTPS Proxy running at https://localhost:4862");
});
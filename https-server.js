const { createServer } = require("https");
const { createProxyServer } = require("http-proxy");
const fs = require("fs");

const proxy = createProxyServer({ target: "http://localhost:3632" });

const options = {
  key: fs.readFileSync("./localhost+2-key.pem"),
  cert: fs.readFileSync("./localhost+2.pem"),
};

createServer(options, (req, res) => {
  proxy.web(req, res);
}).listen(4862, () => {
  console.log("🔐 HTTPS Proxy running at https://localhost:4862");
});
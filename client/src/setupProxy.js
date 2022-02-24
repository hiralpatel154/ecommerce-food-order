const  createProxyMiddleware  = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/**", {
      // https://github.com/chimurai/http-proxy-middleware
      target: "http://localhost:8000",
      secure: false,
      router: {
        // when request.headers.host == 'dev.localhost:3000',
        // override target 'http://www.example.org' to 'http://localhost:8000'
        "dev.localhost:3000": "http://localhost:8000",
      },
    })
  );
};

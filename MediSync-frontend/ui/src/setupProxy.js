const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    const proxy_target = process.env.PROXY_TARGET || "http://localhost/";
    if (process.env.NODE_ENV === "development") {
        app.use(
          createProxyMiddleware(["/api", "/media"], {
            target: proxy_target,
            secure: false,
          }),
        );
      } else {
        app.use(
            createProxyMiddleware("/api", {
                target: proxy_target,
                secure: false,
            }),
        );
    }
};

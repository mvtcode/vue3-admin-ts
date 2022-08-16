const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: true,
  filenameHashing: true,
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugin("define").tap((args) => {
      args[0]["process.env"].APP_VERSION = `"${
        require("./package.json").version
      }"`;
      const config = args[0]["process.env"];
      args[0]["process.env"] = {
        ...config,
        API_URL: `"${process.env.API_URL}"`,
        SOCKET_URL: `"${process.env.SOCKET_URL}"`,
        RECAPTCHA_ENABLE: `"${process.env.RECAPTCHA_ENABLE}"`,
        RECAPTCHA_SITE_KEY: `"${process.env.RECAPTCHA_SITE_KEY}"`,
        GOOGLE_AUTH_CLIENT_ID: `"${process.env.GOOGLE_AUTH_CLIENT_ID}"`,
      };
      return args;
    });
  },
});

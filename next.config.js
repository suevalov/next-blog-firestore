const webpack = require("webpack");
require("dotenv").config();

module.exports = {
  webpack: config => {
    config.externals = [
      {
        xmlhttprequest: "{XMLHttpRequest:XMLHttpRequest}"
      }
    ];

    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.F_PROJECT_ID": JSON.stringify(process.env.F_PROJECT_ID),
        "process.env.F_AUTH_DOMAIN": JSON.stringify(process.env.F_AUTH_DOMAIN),
        "process.env.F_API_KEY": JSON.stringify(process.env.F_API_KEY)
      })
    );
    return config;
  }
};

const path = require("path");

const Dotenv = require("dotenv-webpack");
const SsjsPlugin = require("../plugins/SsjsPlugin");
const SsjsConfig = require("../ssjs.config.js");


module.exports = (env) => {
  return {
    entry: {
      index: './index.js',
      lib_amp: './lib_amp',
      lib_cloudpage: './lib_cloudpage',
      lib_core: './lib_core',
      lib_einstein: './lib_einstein',
      lib_jwt: './lib_jwt',
      lib_logger: './lib_logger',
      lib_polyfill: './lib_polyfill',
      lib_sfmcapi: './lib_sfmcapi',
      lib_wsproxy: './lib_wsproxy',
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js'
    },
    plugins: [new Dotenv(), new SsjsPlugin({ ...SsjsConfig, ...env })],
    mode: "none",
    optimization: {
      concatenateModules: true,
    },
    target: ["web", "es3"],
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "./loaders/htmlLoader.js",
              options: {},
            },
          ],
        },
        {
          test: /\.(js)$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [["@babel/preset-env"]],
              },
            },
          ],
        },
        {
          test: /\.(amp|ampscript)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "./loaders/ampScriptLoader.js",
              options: {},
            },
          ],
        }
      ],
    },
    resolve: {
      extensions: ["*", ".js"],
      alias: {
        polyfills: path.resolve(__dirname, "../polyfills/"),
        lib: path.resolve(__dirname, "../lib/"),
        templates: path.resolve(__dirname, "../templates/"),
      },
    },
  };
};

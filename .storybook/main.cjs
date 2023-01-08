const path = require("path");
module.exports = {
  stories: ["../src/**/*.stories.(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  framework: {
    name: "@storybook/web-components-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.css|\.s(c|a)ss$/,
      use: [
        // "to-string-loader",
        // "extract-loader",
        "css-loader",
        "postcss-loader",
        "sass-loader",
      ],
    });
    //    config.module.rules.push({ test: /\?inline$/, use: "raw-loader" });

    // Return the altered config
    return config;
  },
};

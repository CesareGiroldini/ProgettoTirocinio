//import('@storybook/react-vite').StorybookConfig;

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    '@storybook-css-modules',
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  docs: {},

  staticDirs: ['../public'],

  typescript: {
    reactDocgen: "react-docgen-typescript"
  }
};
export default config;

const config = {
    framework: '@storybook/react-vite',
    stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook-css-modules'
    ],
    docs: {
        autodocs: 'tag',
    },
    staticDirs: ['../public'],
};

export default config;

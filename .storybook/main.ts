// import type { StorybookConfig } from "@storybook/react-vite";
//
// const config: StorybookConfig = {
//   stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
//   addons: [
//     "@storybook/addon-onboarding",
//     "@storybook/addon-links",
//     "@storybook/addon-essentials",
//     "@chromatic-com/storybook",
//     "@storybook/addon-interactions",
//   ],
//   framework: {
//     name: "@storybook/react-vite",
//     options: {},
//   },
// };
// export default config;
import {dirname, join} from 'path'
import {StorybookConfig} from '@storybook/react-vite'

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
    addons: [
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-interactions'),
        getAbsolutePath('@storybook/addon-essentials'),
    ],
    framework: {
        name: getAbsolutePath('@storybook/react-vite'),
        options: {},
    },
    docs: {
        autodocs: true,
    },
    viteFinal: config => {
        config.build = config.build || {}
        config.build.sourcemap = false
        return config
    },
}
export default config

function getAbsolutePath(value: string) {
    return dirname(require.resolve(join(value, 'package.json')))
}

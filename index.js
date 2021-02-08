const mix = require('laravel-mix');
const path = require('path');
const tailwindcss = require('tailwindcss');
const ESLintPlugin = require('eslint-webpack-plugin');

require('laravel-mix-purgecss');

class WpNextMix {
    constructor () {
        this.config = {
            rootPath: './',
            publicPath: 'public_html',
            distFolder: 'dist',
            assetsFolder: 'resources/assets',
            resourcesFolder: 'resources',
            cssEntry: 'resources/app.css',
            jsEntry: 'resources/app.js',
            importCssVariablesFrom: 'resources/css/variables.css',
            tailwindConfigPath: './tailwind.config.js',
            safelistCss: {
                greedy: [/tns/]
            }
        };
    }

    dependencies () {
        this.requiresReload = true;

        return [
            'postcss@^8.0.0',
            'postcss-preset-env@^6.7.0',
            'postcss-calc@^8.0.0',
            'postcss-loader@^5.0.0'
        ];
    }

    register (config) {
        this.config = {
            ...config,
            ...this.config
        };

        mix.setPublicPath(this.config.publicPath);

        mix.js(this.config.jsEntry, this.config.distFolder).vue({ version: 2 });

        mix.postCss(this.config.cssEntry, this.config.distFolder);

        mix.copyDirectory(
            this.config.assetsFolder,
            path.resolve(this.config.publicPath)
        );

        mix.options({
            postCss: [
                require('postcss-calc')(),

                tailwindcss(this.config.tailwindConfigPath),

                require('postcss-preset-env')({
                    stage: 0,
                    preserve: false,
                    importFrom: this.config.importCssVariablesFrom
                })
            ]
        });

        if (mix.inProduction()) {
            mix.version().purgeCss({ safelist: this.config.safelistCss });
        } else {
            mix.sourceMaps();
        }
    }

    webpackRules () {
        return [
            {
                test: /\.postcss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
                include: path.resolve(this.config.resourcesFolder)
            }
        ];
    }

    webpackPlugins () {
        return new ESLintPlugin({
            extensions: ['js', 'vue'],
            exclude: ['node_modules', 'dist', 'vendor']
        });
    }

    webpackConfig (webpackConfig) {
        webpackConfig.resolve.alias = {
            '~': path.resolve(this.config.rootPath),
            '@': path.resolve(this.config.resourcesFolder),
            ...webpackConfig.resolve.alias
        };
    }
}

mix.extend('WpNextMix', new WpNextMix());

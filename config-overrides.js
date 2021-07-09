// var path = require ('path');
// var fs = require ('fs');

const {
    override,
    addWebpackModuleRule,
    addWebpackResolve,
    disableEsLint
} = require('customize-cra');
const path = require('path');

module.exports = function (config, env) {
    return Object.assign(config, override(
        // Overrides go here
        addWebpackModuleRule({
            test: /\.(s*)css$/,
            use: [
                'style-loader',
                { loader: 'css-loader', options: { importLoaders: 2 }},
                'sass-loader',
                {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: 'src/resources.scss',
                    }
                }
            ]
        }),
        addWebpackResolve({
            modules: config.resolve.modules.concat(path.resolve(__dirname, 'src'))
        }),
        disableEsLint()
    )(config, env))
};
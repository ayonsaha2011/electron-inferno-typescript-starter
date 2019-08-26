const CopyPkgJsonPlugin = require('copy-pkg-json-webpack-plugin');
const path = require('path');

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';

// #region Common settings
module.exports = (env, argv) => {
    return {
        target: 'electron-main',
        entry: './main-src/main.ts',
        output: { 
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.bundle.js'
        },
        devtool: isEnvDevelopment ? 'source-map' : false,
        mode: isEnvProduction ? 'production' : 'development',
        node: { __dirname: false, __filename: false },
        resolve: {
            extensions: ['.js', '.json', '.ts', '.tsx'],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader',
                    options: { 
                        transpileOnly: true,
                        configFile: "tsconfig.json"
                    } 
                }
            ]
        },
        plugins: [
            new CopyPkgJsonPlugin({
                remove: ['scripts', 'devDependencies', 'build'],
                replace: {
                    main: './main.bundle.js',
                    scripts: { start: 'electron ./main.bundle.js' },
                    postinstall: 'electron-builder install-app-deps',
                },
            }),
        ]
    }
};
// #endregion
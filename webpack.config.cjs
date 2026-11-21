const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = (_, argv) => {
    const production = argv.mode === 'production';

    return {
        mode: production ? 'production' : 'development',
        entry: {
            app: path.resolve(__dirname, 'resources/js/main.tsx'),
        },
        output: {
            path: path.resolve(__dirname, 'public/assets'),
            filename: production ? '[name].[contenthash:8].js' : '[name].js',
            chunkFilename: production ? '[name].[contenthash:8].js' : '[name].js',
            clean: true,
            publicPath: '/assets/',
        },
        devtool: production ? 'source-map' : 'eval-cheap-module-source-map',
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'resources/js'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            compilerOptions: { noEmit: false },
                        },
                    },
                },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
                {
                    test: /\.(png|jpe?g|gif|svg|webp|woff2?)$/i,
                    type: 'asset/resource',
                    generator: { filename: 'media/[name].[contenthash][ext]' },
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: production ? '[name].[contenthash:8].css' : '[name].css',
                chunkFilename: production ? '[name].[contenthash:8].css' : '[name].css',
            }),
            new WebpackAssetsManifest({
                output: 'manifest.json',
                publicPath: false,
                writeToDisk: true,
                entrypoints: false,
                customize(entry) {
                    if (entry.key === 'app.js') return { key: 'app.js', value: entry.value };
                    if (entry.key === 'app.css') return { key: 'app.css', value: entry.value };
                    return entry;
                },
            }),
        ],
        devServer: {
            host: '0.0.0.0',
            port: 8080,
            hot: true,
            headers: { 'Access-Control-Allow-Origin': '*' },
            static: { directory: path.resolve(__dirname, 'public') },
            devMiddleware: { writeToDisk: true },
        },
    };
};

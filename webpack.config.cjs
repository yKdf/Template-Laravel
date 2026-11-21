const path = require('path');
const AssetsManifestPlugin = require('webpack-assets-manifest');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (_env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
    mode: isProduction ? 'production' : 'development',
    target: 'web',
    entry: {
        app: path.resolve(__dirname, 'resources/scripts/main.tsx'),
    },
    output: {
        path: path.resolve(__dirname, 'public/assets'),
        filename: isProduction ? '[name].[contenthash:8].js' : '[name].js',
        chunkFilename: isProduction ? '[name].[contenthash:8].js' : '[name].js',
        publicPath: '/assets/',
        clean: true,
    },
    devtool: isProduction ? false : 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: { transpileOnly: true },
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'resources/scripts'),
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: isProduction ? '[name].[contenthash:8].css' : '[name].css',
        }),
        new AssetsManifestPlugin({
            output: 'manifest.json',
            publicPath: false,
            writeToDisk: true,
        }),
        new ForkTsCheckerWebpackPlugin(),
        process.env.ANALYZE_BUNDLE
            ? new BundleAnalyzerPlugin({ analyzerHost: '0.0.0.0', analyzerPort: 8081 })
            : null,
    ].filter(Boolean),
    optimization: {
        minimize: isProduction,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false,
                terserOptions: { format: { comments: false } },
            }),
        ],
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        hot: true,
        static: {
            directory: path.resolve(__dirname, 'public'),
        },
        devMiddleware: {
            publicPath: '/assets/',
            writeToDisk: true,
        },
        allowedHosts: 'all',
        headers: { 'Access-Control-Allow-Origin': '*' },
    },
    };
};

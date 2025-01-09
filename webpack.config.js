const
    path = require('path'),
    webpack = require('webpack'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.ts', // Entry point for your library
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'coinexams.min.js', // Output file name
        library: 'coinexams',         // Global variable for browsers
        libraryTarget: 'umd',         // Universal Module Definition
        globalObject: 'this',         // Fix for UMD in Node.js
    },
    resolve: {
        extensions: ['.ts', '.js'], // Resolve .ts and .js files
        fallback: {
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            buffer: require.resolve('buffer'),
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,         // Match .ts files
                use: 'ts-loader',      // Use ts-loader for TypeScript
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(), // Clean output directory before each build
        new webpack.BannerPlugin({
            banner: `/*! \n`
                + `* CoinExams Enterprise API SDK \n`
                + `* Licensed under MIT License https://opensource.org/licenses/MIT \n`
                + `* API to be used in accordance with CoinExams terms https://coinexams.com/terms \n`
                + `*/ \n`,
            raw: true, // Ensures the comment appears as-is without being wrapped
        }),
    ],
    optimization: {
        minimize: true,           // Minify the output
        minimizer: [new TerserPlugin()],
        usedExports: true,        // Enable tree-shaking
        sideEffects: false        // Mark the project as free of side effects
    },
    mode: 'production',          // Ensure output is optimised
};
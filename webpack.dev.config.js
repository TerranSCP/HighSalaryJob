const path =require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports ={
    entry:{
        main:['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js']
    },
    output:{
        publicPath:'/',
        path:path.join(__dirname,'build'),
        filename:'[name].js'
    },
    target:'web',
    mode:'development',
    devtool:'#source-map',
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/index.html',
            filename:'./index.html',
            excludeChunks:['server']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ] ,

    module:{
        rules:[
            {
                enforce:'pre',
                test:/\.js$/,
                exclude:'/node_modules/',
                loader:'eslint-loader',
                options: {
                    emitWarning: true,
                    failOnError: false,
                    failOnWarning: false
                  }
            },
            {
                test:/\.(js|jsx)$/,
            use:{    
                loader:'babel-loader',
                options:{
                    presets:['@babel/preset-react','@babel/preset-env']
                    }
                }
            },
            {
                test:/\.html$/,
            use:{                   
                loader:'html-loader'
                }  
            },
            {
                test:/\.(jpg|svg|png|bmp|gif)$/,
                    use:{
                        loader:'file-loader'
                    }
            }
        ]
    }
}
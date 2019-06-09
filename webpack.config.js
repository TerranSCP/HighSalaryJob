const path =require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports ={
    entry:path.resolve("index.js"),
    output:{
        publicPath:'/',
        path:path.resolve(__dirname,'./public'),
        filename:'mybundle.js'
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./public/index.html',
        })
    ] ,

    devServer: {
        contentBase: path.join(__dirname, './public'),
        compress: true,
        port: 9000
    },

    module:{
        rules:[
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
            }
        ]
    }
}
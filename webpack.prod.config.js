const path =require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');


module.exports ={
    entry:path.resolve("./src/index.js"),
    output:{
        publicPath:'/',
        path:path.resolve(__dirname,'./build'),
        filename:'[name].js'
    },
    target:'web',
    devtool:'#source-map',
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/index.html',
            filename:'./index.html'  
        })
    ] ,

    module:{
        rules:[
            {
                test: /\.jpg$/,
                use: [{loader: 'url-loader'}]
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
                loader:'html-loader',
                options:{minimize:true}
                }  
            }
        ]
    }
}
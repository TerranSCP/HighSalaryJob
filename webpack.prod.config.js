const path =require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');


module.exports ={
    entry:'./src/index.js',
    output:{
        publicPath:'/',
        path:path.join(__dirname,'build'),
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
                    presets:['@babel/preset-react','@babel/preset-env',{ plugins: ["@babel/plugin-proposal-class-properties"]}]
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
const path =require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');



module.exports = (env,argv) =>{
    const __SERVER_PATH = (argv.mode === "production") ? './src/server/server-prod.js' : './src/server/server-dev.js';

    return({
        entry:__SERVER_PATH,
        output: {
            path: path.resolve(__dirname, '/build'),
            publicPath: '/',
            filename: '[name].js'
          },
        mode:argv.mode,
        target:'node',
        node:{
            __dirname:false,
            __filename:false
        },
        externals:
            [nodeExternals()]
        ,
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
                }
            ]}
    })
}
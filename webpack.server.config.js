const path =require('path');
const nodeExternals = require('webpack-node-externals');



module.exports = (env,argv) =>{
    const __SERVER_PATH = (argv.mode === "production") ? './src/server/server-prod.js' : './src/server/server-dev.js';

    return({
        entry:{
            server:__SERVER_PATH
        },
        output: {
            path: path.join(__dirname, 'build'),
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
                    exclude:/node_modules/,
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
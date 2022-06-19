const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js", //uses the name from the entry obj ie bundle    // contenthash gives caching mechanism whenever the contents of the file changes it includes a hash with the name 
    //and the name with the hash is automatically changd due to htmlwebpack plugin 
    clean:true, // whenever a file changes a new bundlehash is created and to remove the old one from dist set clean to true
   assetModuleFilename:'[name][ext]', //eg laughing.svg has to have extension 
},
devtool:'source-map',     // for debugging as the exact line of the error and where its occuring is not shown , this creates a mapfile in dist folder  // use sources in browser                        
  devServer:{
   static:{
       directory:path.resolve(__dirname,'dist')
   },
   port:3000,
   open:true, //open the browser autically when npm run dev
   hot:true, //hot reloading
   compress:true,  //enable gzip compression
   historyApiFallback:true ,
  },
  module: {
    //   loaders are used to load files other than js such as ts,images,scss files
    rules: [
      {
        test: /\.scss$/,  
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {   //use babel loader to make it backward compatible with all browsers
          test:/\.js$/,
          exclude:/node_modules/,
          use:{
              loader:'babel-loader',
              options:{
                  presets:['@babel/preset-env']
              }
          }
      },  //use webpack's inbuilt asset resource loader
      {
          test:/\.(png|svg|jpg|jpeg|gif)$/i,
          type:'asset/resource'
      }
    ],
  },
  plugins: [
      /* to rebuild the dist/html everytime build is executed */
    new HtmlWebpackPlugin({
      title: "Webpack App",
      filename: "index.html",
      template: "src/template.html",  //whenever index.html is rebult it takes the template form the template.html file
    }),
    new BundleAnalyzerPlugin(),  // show files and the space that it takes up 
  ],
};

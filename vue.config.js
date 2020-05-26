let path = require('path');
if (process.env.NODE_ENV === 'production') {
    module.exports = {
        outputDir: path.join(process.cwd(), '../server/static/myDouban'),
        //模板文件发布的位置
        indexPath: path.join(process.cwd(), '../server/views/myDouban.html'),
        //模板中静态文件的相对路径
        publicPath: '/static/myDouban/'
    }
} else {
    // 开发环境
    module.exports = {
        css: {
            loaderOptions: {
              less: {
                modifyVars: {
                  "button-primary-background-color": "#0099ff",
                  "button-primary-border-color": "#0099ff",
                  "button-default-height": "36px",
                      "button-default-line-height": "34px",
                      'tabs-line-height': '50px',
                }
              }
            }
          },
        
        // devServer配置
        devServer: {
            // 代理
            proxy: {
                '/data/': {
                    // 目标地址
                    target: 'http://localhost:3001/'
                },
                '/api/v2': {
                    // 目标地址
                    target: 'https://m.douban.com/rexxar/',
                    changeOrigin: true,
                },
                '/v2/': {
                    // 目标地址
                    target: 'http://api.douban.com/',
                    changeOrigin: true,
                },
                '/j/gallery': {
                    target: 'https://www.douban.com',  // 接口域名
                    secure: false,  // 如果是https接口，需要配置这个参数
                    changeOrigin: true,  //是否跨域

                },
               
                '/j/search_tags': {
                    target: 'https://movie.douban.com',  // 接口域名
                    secure: false,  // 如果是https接口，需要配置这个参数
                    changeOrigin: true,  //是否跨域
                },
                '/j/search_subjects': {
                    target: 'https://movie.douban.com',  // 接口域名
                    secure: false,  // 如果是https接口，需要配置这个参数
                    changeOrigin: true,  //是否跨域

                },
                '/j/doulist': {
                    target: 'https://movie.douban.com',  // 接口域名
                },
                '/tag/': {
                    target: 'https://www.douban.com',  // 接口域名
                }
            }

        }
    }
}


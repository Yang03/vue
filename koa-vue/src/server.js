import koa from 'koa';
import json from 'koa-json'
import Router from 'koa-router'
import serve from 'koa-static'
import compose from 'koa-compose'
import convert from 'koa-convert'
import bodyParser from 'koa-bodyparser'
import path from 'path'
import fs from 'fs'

const vueServerRenderer = require('vue-server-renderer')

var app = new koa()
var router = new Router()

const serverBundleFilePath = path.join(__dirname, '../dist/app.server.js')
const serverBundleFileCode = fs.readFileSync(serverBundleFilePath, 'utf8');

const bundleRenderer = vueServerRenderer.createBundleRenderer(serverBundleFileCode)

app.use(serve(path.resolve(__dirname ,  '../dist')))

const clientBundleFileUrl = '/app.client.js'

function renderHtml () {
    return new Promise ((resolve, rejuect) => {
        bundleRenderer.renderToString((err, html) => {
            if (err){
                console.log(err)
            } else {
              resolve (`
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="utf-8">
                    <title>Vue 2.0 SSR</title>
                  </head>
                  <body id="body">
                    ${html}
                    <script src="${clientBundleFileUrl}"></script>
                  </body>
                </html>`);
            }
        })

    })
}
router.get('/', async function(){
    const html = await renderHtml()
    this.body = html
})

app.use(serve(path.resolve(__dirname ,  '../dist')))

const middlewares = convert.compose([
	//favicon(__dirname + '/favicon.ico'),
	bodyParser({formLimit: '5mb'}),
	// notFound(),
	json(),
	router.routes(),
	router.allowedMethods()
])

app.use(middlewares)

app.listen('3000', () => console.log('server started 3000'))

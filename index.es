import electron from 'electron'
import i18next from 'views/env-parts/i18next'

const { session } = electron.remote
const path = require('path')


// Only block the main.js when the request has version number query (by original code)
// Do not block the main.js when the request has no version number query (by patcher)
const filter = { urls: ['*://*/kcs2/js/main.js?*'] }



export const

    pluginDidLoad = (e) => {
        console.log('Kantai3D plugin loaded');
        

        session.defaultSession.webRequest.onBeforeRequest(filter,
            function (info, c) {
                console.log('Kantai3D replacing main.js')
                console.log(path.join(__dirname, i18next.t('main', { ns: 'poi-plugin-kantai3d' }) + '.js'))
                // The code here is to replace the main.js
                c({ redirectURL: 'k3d://main.js' })
            });

        session.defaultSession.protocol.interceptFileProtocol('k3d', (request, callback) => {
            
            callback({ path: path.join(__dirname, i18next.t('main', { ns: 'poi-plugin-kantai3d' }) + '.js') })
        })

        // force to refresh the webview to avoid loading page before plugin
        window.getStore('layout.webview.ref').reloadIgnoringCache()
    },
    pluginWillUnload = (e) => {
        session.defaultSession.webRequest.onBeforeRequest(filter, null)
    }

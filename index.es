import electron from 'electron';

const { session } = electron.remote
const path = require('path');


// Only block the main.js when the request has version number query (by original code)
// Do not block the main.js when the request has no version number query (by patcher)
const filter = { urls: ['*://*/kcs2/js/main.js?*'] };



export const
    pluginDidLoad = (e) => {
        console.log('Kantai3D plugin loaded');

        session.defaultSession.webRequest.onBeforeRequest(filter,
            function (info, c) {
                console.log('Kantai3D replacing main.js');
                // The code here is to replace the main.js
                c({ redirectURL: 'k3d://main.js' })
                return { redirectURL: 'k3d://main.js' };
            });

        session.defaultSession.protocol.interceptFileProtocol('k3d', (request, callback) => {
            callback({ path: path.join(__dirname, "main.js") })
        })
    },
    pluginWillUnload = (e) => {
        session.defaultSession.webRequest.onBeforeRequest(filter, null);
    };

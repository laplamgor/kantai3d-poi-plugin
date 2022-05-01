[⬅️ back to top repo](https://github.com/laplamgor/kantai3d)

# Kantai3D poi Plugin ![128](https://user-images.githubusercontent.com/11514317/103167807-40271080-4869-11eb-97b1-db51d5d39a0c.png)

This is a poi plugin for patching the game client to enable Kantai3D



# Install via in-app npm
It is recommended to download this plugin from in-app plugin manager whenever possible.

Simply type in `poi-plugin-kantai3d` and click install.

If you cannot install it from the cnpm server, please try npmjs(US).

![image](https://user-images.githubusercontent.com/11514317/136703323-31e69f8f-0c28-456d-8858-d749b06f8c4f.png)



npmjs package name: https://www.npmjs.com/package/poi-plugin-kantai3d


# Compatibility
This plugin is tested with both Direct DMM connection and OOI. 

Since this MOD requires patching of the game client (main.js), the local caching feature of the game client will not take place. Refreshing the game may take a bit longer and cost more data usage. it is recommended to disable this plugin during events.


⚠️Duo to some [limitation of electron](https://github.com/electron/electron/issues/10478), this plugin conflicts with [poi-plugin-subtitle](https://github.com/kcwikizh/poi-plugin-subtitle). Only one plugin will be effective at a time.

If you want to use both Kantai3D with subtitles, please follow:
1. disable and re-enable Kantai3D patcher plugin. The game will reload with the Kantai3D patch. 
2. Once the game is loaded, disable and re-enable the subtitle plugin.

# Disclaimer
Kantai3D is not an officially approved program. Using it may be against the Terms of Service of DMM.

Kantai3D modifies your local game client (main.js) in order to achieve the visual effects but does not modify any in-game API request and response. It does not affect your normal gameplay or game balance. 

Please use it at your own risk. 


This mod alone does not include any data from the origin game. All depth maps used are also 100% hand-drawn. 

If you have any questions or queries, please contact me at laplamgor@gmail.com

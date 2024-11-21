var xhr = new XMLHttpRequest();
xhr.open("GET", window.location.protocol + '//' + window.location.hostname + '/kcs2/js/main.js', true);
xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            result = xhr.responseText;
            fetch("https://cdn.jsdelivr.net/gh/laplamgor/kantai3d-depth-maps@latest/metadata.json").then(
                function (response) {
                    // Called successfully
                    return response.json();
                }).then(function (data) {
                    // patch the main.js and then store it into the storage
                    patchedMainJs = patchMainJs(result, data.patches);
                    // Better performance than using eval
                    var f = Function(patchedMainJs + ";KCS.init();")();
                }).catch(function (err) {
                    // There was an error
                    alert("Unable to load Kantai3D metadata." + err);
                    var f = Function(result)();
                });
        }
    }
};
xhr.send();

function patchMainJs(contents, patches) {
    contents = contents.toString();
    var oldContents = contents;
    var oldlength = contents.length;
    var version = '4.0';
    var error_text = ' - 發生錯誤。 Kantai3D 目前不可用。 請等待開發者更新插件。';
    var setting_text1 = '120 FPS\\n\\nKantai3D V' + version + '\\n\\n使用額外深度圖';
    var setting_text2 = '額外深度圖由深度學習生成，\\n可以支持未有手繪深度圖的立繪。\\n但立體效果品質普遍較粗糙。\\n\\n變更會在下次返回母港時生效。';

    for (const patch of patches) {
        contents = contents.replace(new RegExp(patch.pattern, "gm"), patch.replacement.replace("setting_text1", setting_text1).replace("setting_text2", setting_text2));
        if (contents.length == oldlength) {
            alert(patch.id + error_text);
            return oldContents;
        } else {
            oldlength = contents.length;
        }
    }
    return contents;
}
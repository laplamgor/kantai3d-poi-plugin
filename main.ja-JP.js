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
    var error_text = ' - エラーが発生します。 Kantai3D は現在利用できません。 開発者がプラグインを更新するまでお待ちください。';
    var setting_text1 = '120 FPS\\n\\nKantai3D V' + version + '\\n\\n追加の深度マップ';
    var setting_text2 = '追加の深度マップはAIによって生成され、\\nカスタム手描き深度マップなしでCGに\\nよって使用されます。3D効果の品質は、\\n比較すると粗くなります。\\n\\n変更は、次回母港に戻ったときに有効に\\nなります。';

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
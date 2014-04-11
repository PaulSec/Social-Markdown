function getContent() {
    if (typeof nicEditors != "undefined") {
        return nicEditors.findEditor('doc-frame').getContent();
    }

    if (typeof ace != "undefined") {
        editor = ace.edit("editor");
        return editor.getSession().getValue();
    }

    return null;
}

function setContent(content) {
    if (typeof nicEditors != "undefined") {
        editor = nicEditors.findEditor('doc-frame');
        editor.setContent(content);
    }

    if (typeof ace != "undefined") {
        editor = ace.edit("editor");
        editor.getSession().setValue(content);
        code = editor.getSession().getValue();
        resMarked = marked(code);
        $("#result").html(resMarked);    
    }

    return -1;   
}

$("#save-document").on('click', function() {
    content = getContent();
    if (content != null) {
        var url = document.URL; 
        var idDocument = url.match(/[a-z0-9]{48}/g);
        idDocument = idDocument[0];

        key = $("#aes-key").val();
        if (content[0] == "\n") {
            content = content.substring(1, content.length)
        }
        encrypted = encrypt(content, key);
        $.post("/saveDocument", {id: idDocument, content:encrypted});
    }
});
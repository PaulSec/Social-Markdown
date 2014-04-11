function encrypt(text, key){
    return CryptoJS.AES.encrypt(text, key).toString();
}

function decrypt(text, key){
    test = text.replace(/(\r\n|\n|\r)/gm,"");
    return CryptoJS.AES.decrypt(text, key).toString(CryptoJS.enc.Utf8);
}

function displayOrHideDecryptButton() {
    var key = $("#aes-key").val();
    if (key != "") {
        $("#decrypt-document").show();
    } else {
        $("#decrypt-document").hide();
    }    
}

$(document).ready(function() {
    displayOrHideDecryptButton();

    $("#aes-key").keyup(function () {
        displayOrHideDecryptButton();
    });
});

$("#decrypt-document").on('click', function() {
    var key = $("#aes-key").val();

    var content = getContent();
    if (content != null) {
        setContent(decrypt(content, key));
    }
});
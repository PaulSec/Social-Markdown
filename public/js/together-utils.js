$("#start-togetherjs").on('click', function() {
    var textButton = $("#start-togetherjs").text();
    if (textButton == "Edit live") {
        $("#start-togetherjs").text("Stop live editing");
        $("#start-togetherjs").attr('class', 'btn btn-sm btn-warning');
    } else {
        $("#start-togetherjs").text("Edit live");
        $("#start-togetherjs").attr('class', 'btn btn-sm btn-success');
    }
    TogetherJS();
});

import React from "react";

const $ = window.$;
$(document).ready(function() {
    $('#list').click(function(event){event.preventDefault();$('#products .item').addClass('list-group-item');});

    $('#grid').click(function(event){event.preventDefault();$('#products .item').removeClass('list-group-item');$('#products .item').addClass('grid-group-item');});
});
$(document).ready(function() {
    if (window.File && window.FileList && window.FileReader) {
        $("#files").on("change", function(e) {
            var files = e.target.files,
                filesLength = files.length;
            for (var i = 0; i < filesLength; i++) {
                var f = files[i]
                var fileReader = new FileReader();
                fileReader.onload = (function(e) {
                    var file = e.target;
                    $("<span class=\"pip\">" +
                        "<img class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +
                        "<br/><span class=\"remove\">Remove image</span>" +
                        "</span>").insertAfter("#files");
                    $(".remove").click(function(){
                        $(this).parent(".pip").remove();
                    });
                });
                fileReader.readAsDataURL(f);
            }
        });
    } else {
        alert("Your browser doesn't support to File API")
    }
});

$(document).ready(function() {

    $(".selLabel").click(function () {
        $('.dropdown').toggleClass('active');
    });

    $(".dropdown-list li").click(function() {
        $('.selLabel').text($(this).text());
        $('.dropdown').removeClass('active');
        $('.selected-item p span').text($('.selLabel').text());
    });

});






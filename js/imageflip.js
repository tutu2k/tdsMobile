// imageflip. Lightweight JQuery Mobile Image Gallery 
// Saman W Jayasekara : sam@cflove.org : www.cflove.org
// 15 Sap 2012 - Ver 0.1 - MIT License 
(function ($) {
    $.fn.imageflip = function () {
        var loadingimg = 'js/images/loading.gif';
		var i	= $("<img />").attr('src',loadingimg).load() //pre load the loading image
        var g = $(this);
        $(this).children().each(function (index, element) { // remove href from the list
            var $t = $(this).find('a');
            $t.attr('data-href', $t.attr('href')).removeAttr('href');
        }).click(function (e) {
            $(g).children('[showing]').removeAttr('showing'); //remove the marker form previous selector
            $(this).attr('showing', 'yes'); //mark this one
            var bimg = $(this).find('a').attr('data-href');
            var title = $(this).find('a').attr('title');

            if (bimg !== '') {
                // create a layer for big image 
                if (!$('#imageflippage').length) {
                    $('body').append('<div data-role="page" id="imageflippage" data-theme="b" data-title=""><div data-role="content" id="tadcontent"><div id="imageflipimg"></div><div id="imagefliper"></div><div id="tadinfo"></div><div id="tadnavi" data-role="navbar" data-theme="B"><a href="" data-role="button" data-icon="delete" id="tadclose" data-inline="true"></a><a href="" data-role="button" data-icon="arrow-l" id="tadbk" style="display:none" data-inline="true"></a><a href="" data-role="button" data-icon="arrow-r" id="tadnxt" data-inline="true"  style="display:none"></a></div></div></div>')
                    $.mobile.initializePage();
                    $('#imageflippage').live('pagehide', function () {
                        $(this).remove()
                    }); //distroy the page on exits
                    $('#tadclose').click(function (e) {
                        history.back();
                    });
                    $('#imagefliper').click(function (e) { //show hide the navi bar/image info
                        if ($('#tadnavi').is(':visible')) {
                            $('#tadnavi').slideUp('slow');
                            $('#tadinfo:visible').slideUp('slow')
                        } else {
                            $('#tadnavi').slideDown('slow');
                            if ($('#tadinfo').html() !== '') {
                                $('#tadinfo').slideDown('slow')
                            }
                        };
                    }).swipeleft(function () {
                        $('#tadbk').click()
                    }).swiperight(function () {
                        $('#tadnxt').click()
                    })
                    // go to next
                    $('#tadnxt').click(function (e) {
                        if ($(g).children('[showing]').next().length) {
                            $(g).children('[showing]').next().click()
                        } else {
                            $(g).children(':first-child').click()
                        }
                    });
                    // previous image
                    $('#tadbk').click(function (e) {
                        if ($(g).children('[showing]').prev().length) {
                            $(g).children('[showing]').prev().click()
                        } else {
                            $(g).children(':last-child').click()
                        }
                    });
                }

                $('#imageflipimg').fadeOut('fast', function () { //fade the current image
                    $('.ui-btn-active').removeClass("ui-btn-active"); //remove button active status
                    $('#imageflipimg').html('<img src="' + loadingimg + '" style="margin-top:120px">') // show loading image
                    $("<img />").attr('src', bimg).load(function (e) { // image lading
                        if (typeof title !== 'undefined' && title !== false && title !== '') { // handle image title info
                            $('#tadinfo').html(title).slideDown('slow', function () {
                                $('#tadinfo:visible').delay('4000').slideUp('slow')
                            })
                        } else {
                            $('#tadinfo').html('')
                        };
                        $('#imageflipimg').css({
                            'background-image': 'url(' + bimg + ')'
                        }).html('').fadeIn('slow') //add image, clear loading image
                    });
                });
                if (!$("#imageflippage").is(':visible')) {
                    $.mobile.changePage("#imageflippage")
                } // move to the imageflip page

            }
        })
    }
})(jQuery);
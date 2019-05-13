(function($){
    $('.article img:not(".not-gallery-item")').each(function () {
        // wrap images with link and add caption if possible
        if ($(this).parent('a').length === 0) {
            $(this).wrap('<a class="gallery-item" href="' + $(this).attr('src') + '"></a>');
            if (this.alt) {
                $(this).after('<div class="has-text-centered is-size-6 has-text-grey caption">' + this.alt + '</div>');
            }
        }
    });

    if (typeof(moment) === 'function') {
        $('.article-meta time').each(function () {
            $(this).text(moment($(this).attr('datetime')).fromNow());
        });
    }

    function adjustNavbar() {
        const navbarWidth = $('.navbar-main .navbar-start').outerWidth() + $('.navbar-main .navbar-end').outerWidth();
        if ($(document).outerWidth() < navbarWidth) {
            $('.navbar-main .navbar-menu').addClass('is-flex-start');
        } else {
            $('.navbar-main .navbar-menu').removeClass('is-flex-start');
        }
    }
    adjustNavbar();
    $(window).resize(adjustNavbar);

    var $toc = $('#toc');
    if ($toc.length > 0) {
    var $mask = $('<div>');
        $mask.attr('id', 'toc-mask');

        $('body').append($mask);

        function toggleToc() {
            $toc.toggleClass('is-active');
            $mask.toggleClass('is-active');
        }

        $toc.on('click', toggleToc);
        $mask.on('click', toggleToc);
        $('.navbar-main .catalogue').on('click', toggleToc);
    }

    //* visibilitychange event
    var OriginTitile = document.title//, titleTime;
    $(document).on('visibilitychange', function() {
        if (document.hidden) {
            $('[rel="icon"]').attr('href', '/images/favicon2.ico')
            document.title = 'LOOK AT THIS!';
            // clearTimeout(titleTime);
        } else {
            // document.title = 'o(`▽′)ψ';
            // titleTime = setTimeout(function() {
                $('[rel="icon"]').attr('href', '/images/favicon.ico')
                document.title = OriginTitile;
            // },1500);
        }
    });

    //* profile button flow
    function getX(obj){ 
        var parObj=obj
        var left=obj.offsetLeft
        while(parObj=parObj.offsetParent){ 
            left+=parObj.offsetLeft 
        } 
        return left
    }
    function getY(obj){ 
        var parObj=obj
        var top=obj.offsetTop
        while(parObj = parObj.offsetParent){ 
            top+=parObj.offsetTop
        } 
        return top
    }
    $('.button-flow').on("touchmove mousemove",(e) => {
        const x = e.pageX - getX(e.target)
        const y = e.pageY - getY(e.target) 
        e.target.style.setProperty('--x', `${ x }px`)
        e.target.style.setProperty('--y', `${ y }px`)
    })


    //* codepen resize
    $(document).on('mousemove touchmove',function(e) {
		if (!!this.move) {
			var callback = document.call_down 
			callback.call(this, e);
		}
	}).on('mouseup touchend',function(e) {
        $('#cp_embed_MRoOWV').css({'pointer-events': 'auto'})

		if (!!this.move) {
			$.extend(this, {
				'move': false,
				'call_down': false
			});
		}
	});
	$('.codenpen-size').on('mousedown touchstart',function(e) {
        $('#cp_embed_MRoOWV').css({'pointer-events': 'none'})

        var $box = $('.codepen-w')
	    var posix = {
	            'w': $box.width(), 
	            'h': $box.height(), 
	            'x': e.pageX, 
	            'y': e.pageY
	        };
	    
	    $.extend(document, {'move': true, 'call_down': function(e) {
	        $box.css({
	            'width': Math.max(30, e.pageX - posix.x + posix.w),
	            'height': Math.max(30, e.pageY - posix.y + posix.h)
	        });
	    }});
	    return false;
    });
    
    //qrcode
    $('.qrcodebox-close1,.qrcodebox-close2').on('click',(e)=>{
        $('.qrcodebox').css('opacity',0)
        setTimeout(()=>{
            $('.qrcodebox').toggleClass('show')
        },300)

    })
    $('a[title*=Wechat],a[title*=QQ]').on('click',function(e){
        $('img[alt="qrcode"]').attr('src', `/images/${this.title}.png`)
        $('.qrcodebox').toggleClass('show')
        $('.qrcodebox').css('opacity') //解决transition与display冲突
        $('.qrcodebox').css('opacity',1)
    })
})(jQuery);

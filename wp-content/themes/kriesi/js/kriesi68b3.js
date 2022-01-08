(function($)
{
    "use strict";

    $(document).ready(function()
    {
    	var container 	= 'body',
    		loaded		= [];
    
    	if($.fn.avia_sc_big_number)
		{
			$('.avia-big-number', container).avia_sc_big_number();
		}
		
		if($.fn.avia_sc_principles)
		{
			$('.avia-principles', container).avia_sc_principles();
		}
		
		$('.social-container-twitter').on('click', function()
		{
			if(!loaded['twitter']){
				$(this).addClass('av-social-loaded');
				avia_load_twitter();
				loaded['twitter'] = true;
			}
		});
		
		$('.social-container-facebook').on('click', function()
		{
			if(!loaded['facebook']){
				$(this).addClass('av-social-loaded');
				avia_load_facebook();
				loaded['facebook'] = true;
			}
		});
		
		
		
		$('.grid-sort-container').data({'margin_base':1}).removeClass('no_margin-container');
		
    });
    

	


// -------------------------------------------------------------------------------------------
// Principles picker
// -------------------------------------------------------------------------------------------


$.fn.avia_sc_principles = function(options)
{
	return this.each(function()
	{
		var container = $(this), logos = container.find('.avia-priciple-logo');
		
		//trigger number animation
		container.on('avia_start_animation', function()
		{
			setTimeout(function(){ 
			
				container.addClass('avia_animation_finished'); 
				setTimeout(function()
				{ 
					if(!logos.filter('.active').length)
					{
						logos.eq(0).addClass('active');
						container.addClass('active-container-1');
					}
						
				},800);
				
			},2000);
			
			logos.on('mouseenter', function()
			{
				logos.removeClass('active');
			
				var logo = $(this).addClass('active');
			
				container.removeClass('active-container-1 active-container-2 active-container-3 active-container-4 active-container-5 active-container-6').addClass('active-container-' + logo.data('priciple-logo'));
			});
			
			container.on('mouseleave', function()
			{
				container.removeClass('active-container-1 active-container-2 active-container-3 active-container-4 active-container-5 active-container-6');
				logos.removeClass('active');
			});
			
			
		});
	});
}




// -------------------------------------------------------------------------------------------
// Big Number animation shortcode javascript
// -------------------------------------------------------------------------------------------

//http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/ (improve it with framerate in the future?)

$.fn.avia_sc_big_number = function(options)
{
	var skipStep = false,
	start_count = function(element, countTo, increment, current)
	{
	
		//calculate the new number
		var newCount = current + increment;
		
		//if the number is bigger than our final number set the number and finish
		if(newCount >= countTo) 
		{
			element.text(countTo);
			//exit
		}
		else
		{
			var prepend = "", addZeros = countTo.toString().length - newCount.toString().length
			
			//if the number has less digits than the final number some zeros where omitted. add them to the front
			for(var i = addZeros; i > 0; i--){ prepend += "0"; }
			
			element.text(prepend + newCount);
			window.aviaAnimFrame(function(){ start_count(element, countTo, increment, newCount) });
		}
	};

	return this.each(function()
	{
		var number_container = $(this), elements = number_container.find('.avia-single-number'), countTimer = number_container.data('timer') || 3000;
		
		//prepare elements
		elements.each(function(i)
		{
			var element = $(this), text = element.text();
			element.text( text.replace(/./g, "0")); 
		});
		
		
		//trigger number animation
		number_container.addClass('number_prepared').on('avia_start_animation', function()
		{
			elements.each(function(i)
			{
				var element = $(this), countTo = element.data('number'), current = parseInt(element.text(),10), increment = Math.round( countTo * 30 / countTimer);
				if(increment == 0 || increment % 10 == 0) increment += 1;
				
				setTimeout(function(){ start_count(element, countTo, increment, current);}, 300);
			});
		});
	});
}

window.aviaAnimFrame = (function(){
  return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
})();



// -------------------------------------------------------------------------------------------
// Social loaders: http://www.paulund.co.uk/lazy-load-social-media
// -------------------------------------------------------------------------------------------

function avia_load_facebook()
{
	if($('.av-load-facebook').length == 0 ) return;

    if (typeof (FB) != 'undefined') {
        FB.init({ status: true, cookie: true, xfbml: true });
    } else {
        $.getScript("https://connect.facebook.net/en_US/all.js", function () {
            FB.init({ status: true, cookie: true, xfbml: true });  $('.fb-like a').remove();
        });
    }
    
}

function avia_load_twitter()
{
	if($('.av-load-twitter').length == 0 ) return;

    if (typeof (twttr) != 'undefined'){
        twttr.widgets.load();
    } else {
        $.getScript('https://platform.twitter.com/widgets.js');
    }
}

function avia_load_gplus()
{
    if (typeof (gapi) != 'undefined') {
        $(".g-plusone").each(function () {
            gapi.plusone.render($(this).get(0));
        });
    } else {
        $.getScript('https://apis.google.com/js/plusone.js');
    }
}

function avia_load_add_this()
{
	$.getScript('//s7.addthis.com/js/300/addthis_widget.js#pubid=undefined');
}


}(jQuery));

$(function() 
{
	setTimeout(function() {
		$('header').animate({opacity:1}, 5000);
	},2000);

	HashChange();

	

	$('.nav a').click(function(e){
		e.preventDefault();
		HashChange($(this).prop('href'));
		$('.nav a').removeClass('selected');
		$(this).addClass('selected');
	});


	function HashChange(hash) {

		if(hash == undefined)
			hash = "";
		if(hash.indexOf("#photos") != -1) {
			$('#body').html($('#photos-page').html());
			$.ajax({
				type: "GET",
				url: "https://vondruska-wedding-photos-thumbs.s3.amazonaws.com/",
				dataType: "xml",
				success: function(xml) {
					$('#photo-list').html('');
					$(xml).find('Contents').each(function() {
						$('#photo-list').append("<a target='_blank' rel='group' href='https://vondruska-wedding-photos.s3.amazonaws.com/" + $(this).find('Key').text() + "'><img src='https://vondruska-wedding-photos-thumbs.s3.amazonaws.com/" + $(this).find('Key').text() + "' /></a>");
						$('#photo-list a').fancybox({
    	openEffect	: 'elastic',
    	closeEffect	: 'elastic',
    	helpers : {
    		title : {
    			type: 'outside'
    		},
    		thumbs	: {
				width	: 50,
				height	: 50
			}
    	}
    });
					})
				}
			});
		}
		else if(hash.indexOf("program") != -1) {
			$('#body').html($('#program-page').html());
		}

		else {
			$('#body').html($('#home-page').html());
			$('.slideshow').imagesLoaded(function() {
				$('.slideshow').show().cycle({speed:4000, timeout: 3000, random: 1	});
			});
		}
	}
});
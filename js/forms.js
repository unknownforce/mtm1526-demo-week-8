$(document).ready(function() {
	
	// On change: whenever a user commits a change to a text field by:
	// 1. moving to another field
	// 2. hitting return
	$('#username').on('change', function (ev) {
		
		var username = $(this).val();	// Gets the user input from the form field 'username'
		
		// Forces our users to have a username at least 3 characters long
		if (username.length >= 3 ) {
			// By putting our AJAX request in a variable we can listen for when it has completed
			// When the response is done, we can see the data PHP sent
			var ajax = $.post('check-username.php', {
				'username' : username
			});
			
			ajax.done(function (data) {
				//console.log(data);
				
				$('.status').removeClass('available unavailable');
				
				if (data == 'available') {
					// If you wanted to use an image instead of text:
					// 1. delete the '.html()' part
					// 2. use the class in your CSS to add a background-image
					$('.status').html('✔').addClass(data);	
				} else {
					$('.status').html('✖').addClass(data);	
				}
			});
		} else {
			$('.status').html('✖').removeClass('available').addClass('unavailable');
		}
		
	});
	
});

$(document).ready(function() {
	
	var passStrength = 0;
	
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
	
	
	$('#password').on('keyup', function (ev) {
		
		var pass = $(this).val();
		
		passStrength = 0;
		
		if (pass.length > 5 ) {
			passStrength++;
			$('.req-length').addClass('met');	
		} else {
			$('.req-length').removeClass('met');	
		}
		
		// Regular expressions (Regex) are a sub programming language for dealing with text
		// They allows us to manupulate and search text
		if (pass.match(/[a-z]/)) {
			passStrength++;
			$('.req-low').addClass('met');	
		} else {
			$('.req-low').removeClass('met');	
		}
		
		if (pass.match(/[A-Z]/)) {
			passStrength++;
			$('.req-up').addClass('met');	
		} else {
			$('.req-up').removeClass('met');	
		}
		
		if (pass.match(/[0-9]/)) {
			passStrength++;
			$('.req-num').addClass('met');	
		} else {
			$('.req-num').removeClass('met');	
		}
		
		// '^' means NOT
		if (pass.match(/[^a-zA-Z0-9]/)) {
			passStrength++;
			$('.req-spec').addClass('met');	
		} else {
			$('.req-spec').removeClass('met');	
		}
		
		
		
		
	});
	
	$('form').on('submit', function (ev) {
		if (passStrength < 5 || $('.status').hasClass('unavailable')) {
			ev.preventDefault();	
		}
	
	});
	
});

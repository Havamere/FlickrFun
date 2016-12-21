// Credentials for Flickr API.
var credentials = {
	key: "03a3596a934e192f8d95f41bb5bc1684",
	secret: "1158b7c4ac3fa826"
}

var numArr = ["one","two","three","four","five",
				"six","seven","eight","nine","ten",
				"eleven","twelve","thirteen","fourteen","fifteen",
				"sixteen","seventeen","eightteen","nineteen","twenty",
				"twenty-one","twenty-two","twenty-three","twenty-four","twenty-five"];

var photoArr = [];

// Assures that page is ready before any functions are run.
$(document).ready(function() {
	// Grabs search bar info and preforms search on Flickr.
	function photoSearch() {
		// Clears Carousel of previously searched image section.
		$('#carousel').empty();
		// Clears Splash Image.
		$('#splash-image').empty();
		// Clrears Thumbnail gallery
		$('#thumbnails').empty();
		// Clears PhotoArr for new set of photos
		photoArr = [];
		// Allows re-initialization of carousel for new searches
		if ($('#carousel').hasClass('initialized')){
		    $('#carousel').removeClass('initialized')
		}
		console.log(photoArr);
		// Captures the search query thta the user entered.
		var imgRequest = $('#search-field').val();
		console.log(imgRequest);
		// Query string to assemble API call
		var queryURL = "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key="
						+credentials.key+"&format=json&per_page=25&safe_search=1&tags="+imgRequest+"&extras=url_o,url_q,url_t,tags";
		// Call to Flickr 
		$.ajax({
			url: queryURL,
			method: 'GET'
		})
			.done(function(response){
				// Test response given by request.
				//console.log(typeof response);
				//console.log(response);
				var responseObj = JSON.parse(response.slice(14, response.length - 1));
				console.log(responseObj);
				// Accessing the array of photos
				photoArr = responseObj.photos.photo;
				console.log(photoArr);
				// For loop to build out photo objects for display
				for (var i=0; i<photoArr.length; i++){
					// Builds photo object
					var photo = {
						// Grabs url for photo
						lgSqrUrl: photoArr[i].url_q,
						// Grabs url for thumbnail
						thumbURL: photoArr[i].url_t,
						// Grabs url for original image
						splashUrl: photoArr[i].url_o,
					}
					// Builds carousel image div.
					$('#carousel').append('<a class="carousel-item" href="#'+numArr[i]+'!"><img class="pic" src="'+photo.lgSqrUrl+'" data-original-url="'+photo.splashUrl+'"/></a>');
					$("#thumbnails").append('<div class="thumbnail"><img class="pic" src="'+photo.thumbURL+'" data-original-url="'+photo.splashUrl+'"/></div>');
				}
			}).then(function(){
				// Activates the Materialize Carousel
				$('.carousel').carousel();
			})
	}
	// Runs search function each time the search button is pressed.
	$(document).on('click','#search', photoSearch);
	// Sets new Splash image each time a picture is clicked
	$(document).on('click','.pic', function(){
		// Clears Splash Image.
		$('#splash-image').empty();
		// Sets url for splash src
		var splashSRC = $(this).data("original-url");
		console.log(splashSRC);
		// Places image in Splash div. 
		$('#splash-image').append('<img class="splashPic" src="'+splashSRC+'"/>');
	});
})
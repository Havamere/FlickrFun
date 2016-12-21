// Credentials for Flickr API.
var credentials = {
	key: "03a3596a934e192f8d95f41bb5bc1684",
	secret: "1158b7c4ac3fa826"
}

var numArr = ["one","two","three","four","five"];

// Assures that page is ready before any functions are run.
$(document).ready(function() {
	// Grabs search bar info and preforms search on Flickr.
	function photoSearch() {
		// Clears Carousel of previously searched image section.
		//$('#carousel').empty();
		// Clears Hero Image.
		$('#hero-iamge').empty();
		// Captures the search query thta the user entered.
		var imgRequest = $('#search-field').val();
		console.log(imgRequest);
		// Query string to assemble API call
		var queryURL = "https://api.flickr.com/services/rest/?&method=flickr.photos.search&api_key="
						+credentials.key+"&format=json&per_page=5&safe_search=1&tags="+imgRequest+"&extras=url_q";
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
				var photoArr = responseObj.photos.photo;

				for (var i=0; i<photoArr.length; i++){
					// Builds src for photo
					var photoSRC = photoArr[i].url_q;
					// Builds carousel image div.
					$('#carousel').append('<a class="carousel-item" href="#'+numArr[i]+'!"><img src="'+photoSRC+'"/></a>');
				}
			}).then(function(){
				// Activates the Materialize Carousel
				$('.carousel').carousel();			
			})
	}

	$(document).on('click','#search', photoSearch);
})
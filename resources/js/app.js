$(document).ready(function() {
	// _______________ Automatically focus on input field _______________
	$("#userInput").focus();
	// _______________ Store variables in cache _______________
	var url;
	var ip;
	var city;
	var region;
	var country;
	var zip;
	var time_zone;
	var country_code;

	// _______________ Search function _______________
	function search() {
		// _______________ Store user input and remove protocol _______________
	    var userInput = $("#userInput").val();
			userInput = userInput.replace("http://", "");
			userInput = userInput.replace("https://", "");
			userInput = userInput.replace("/", "");

        // _______________ API call for information _______________
        $.ajax({
            type: "GET",
            dataType: 'jsonp',
            url: "http://freegeoip.net/json/" + userInput,
			// _______________ On successful call _______________
            success: function(whoIs) {
				// _______________ Store results in variables _______________
				url = userInput;
				ip = whoIs.ip;
				city = whoIs.city;
				region = whoIs.region_name;
				country = whoIs.country_name;
				zip = whoIs.zip_code;
				time_zone = whoIs.time_zone;
				country_code = whoIs.country_code;
				// _______________ Update page elements _______________
								$(".content").css("display", "block");
                $("#application").css("visibility",
                    "visible");
                $(".intro").css("visibility",
                    "hidden");
                $(".introd").css("display", "none");
				// _______________ Update Flag _______________
				var flag = document.getElementById('flag');
				var mapName = whoIs.country_name;
				mapName = mapName.replace(" ", "_");
				mapName = mapName + ".png";
				flag.src="resources/images/flags/" + mapName;
				console.log(mapName);

				// _______________ Apply information to page _______________
                if (url === "" || url ===" ") {
                    url = "Personal Computer";
                }
                $("#url").html(url);
                $("#ipAddr").html(ip);
                $("#city").html(city);
                $("#region").html(region);
                $("#country").html(country);
                $("#zip").html(zip);
                $("#time_zone").html(time_zone);
                $("#country_code").html(country_code);

				addHistory();
                // _______________ Set map properties _______________
                var mapPos = {
                    lat: whoIs.latitude,
                    lng: whoIs.longitude
                };
                var mapProp = {
                    center: mapPos,
                    zoom: 6,
                    mapTypeId: google.maps.MapTypeId
                        .ROADMAP
                };
                // _______________ Initialize map function _______________
                function initialize() {
                    var map = new google.maps.Map(
                        document.getElementById(
                            "googleMap"),
                        mapProp);
					// _______________ Map styles _______________
                    var mapStyle = [{
                        "featureType": "all",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#ffffff"
                        }]
                    }, {
                        "featureType": "all",
                        "elementType": "labels.text.stroke",
                        "stylers": [{
                            "color": "#000000"
                        }, {
                            "lightness": 13
                        }]
                    }, {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "color": "#000000"
                        }]
                    }, {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [{
                            "color": "#144b53"
                        }, {
                            "lightness": 14
                        }, {
                            "weight": 1.4
                        }]
                    }, {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [{
                            "color": "#08304b"
                        }]
                    }, {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#0c4152"
                        }, {
                            "lightness": 5
                        }]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "color": "#000000"
                        }]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [{
                            "color": "#0b434f"
                        }, {
                            "lightness": 25
                        }]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "geometry.fill",
                        "stylers": [{
                            "color": "#000000"
                        }]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "geometry.stroke",
                        "stylers": [{
                            "color": "#0b3d51"
                        }, {
                            "lightness": 16
                        }]
                    }, {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#000000"
                        }]
                    }, {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [{
                            "color": "#146474"
                        }]
                    }, {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [{
                            "color": "#021019"
                        }]
                    }];
                    map.setOptions({
                        styles: mapStyle
                    });
                    // _______________ Add map marker _______________
                    var marker = new google.maps
                        .Marker({
                            position: mapPos,
                            map: map,
                            title: 'Server / Person Located Here!'
                        });
                }
                initialize();
            }
        })}
	// _______________ History function _______________
	function addHistory() {
		var existingEntries = JSON.parse(localStorage.getItem("allEntries"));
		if(existingEntries == null) existingEntries = [];
		var entry = "<a>" + url + "</a>" + "<br/>";
		localStorage.setItem("entry", JSON.stringify(entry));
		// _______________ Add entry & update history list _______________
		existingEntries.push(entry);
		$(".history").html("");
		for ( i = 0 ; i < existingEntries.length; i++) {
			console.log(existingEntries[i]);
			var formattedEntry = "<p>"+ "Search " + (i + 1) + " : " + existingEntries[i] + "</p>" + "<br/>";
			$(".history").prepend(formattedEntry);
		}
		// _______________ Save history  _______________
		localStorage.setItem("allEntries", JSON.stringify(existingEntries));
		};
	// _______________ Clear history _______________
	$("#clearHistory").on('click', function() {
		localStorage.clear();
		$(".history").html("");
	})

	// _______________ Listener for Key Press _______________
	window.onkeyup = function(k) {
	var key = k.keyCode ? k.keyCode : k.which;
	   if (key == 13) {
		   console.log("enter was pressed");
		   search();
	   }
	}
    // _______________ Listener for search button _______________
    $("#button").on('click', function() {
        console.log("Button has been clicked!");
		search();
    })

	// _______________ Listener for save button _______________
	$("#save-button").on('click', function() {
		console.log("Saving file...");
		var saveName = $("#saveName").val() + ".txt";
		// _______________ Info for .txt file _______________
		var blob = new Blob([
			"URL: " + url + "\u000D\u000A" +
			"IP Address: " + ip + "\u000D\u000A" +
			"City: " + city + "\u000D\u000A" +
			"Region: " + region + "\u000D\u000A" +
			"Country: " + country + "\u000D\u000A" +
			"ZIP Code: " + zip + "\u000D\u000A" +
			"Time Zone: " + time_zone + "\u000D\u000A" +
			"Country Code: " + country_code + "\u000D\u000A"
			], {type: "text/plain;charset=utf-8"});
		// _______________ Save .txt document _______________
		saveAs(blob, saveName);
	})
})

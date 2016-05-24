$(document).ready(function() {
    // _______________ Listener for button _______________
    $("#button").on('click', function() {
        console.log("Button has been clicked!");
        var ipInput = $("#ipInput").val();
        console.log(ipInput);
        // _______________ API call for information _______________
        $.ajax({
            type: "GET",
            dataType: 'jsonp',
            url: "http://freegeoip.net/json/" + ipInput,
            success: function(whoIs) {
                console.log(whoIs);
                // _______________ On succsesfull call update page _______________
                $("#application").css("visibility",
                    "visible");
                $(".intro").css("visibility",
                    "hidden");
                $(".header").css("display", "none");
                if (ipInput === "" || ipInput ===
                    " ") {
                    $("#url").html(
                        "Personal Computer");
                } else {
                    $("#url").html(ipInput);
                }
                $("#ipAddr").html(whoIs.ip);
                $("#city").html(whoIs.city);
                $("#region").html(whoIs.region_name);
                $("#country").html(whoIs.country_name);
                $("#zip").html(whoIs.zip_code);
                $("#time_zone").html(whoIs.time_zone);
                $("#country_code").html(whoIs.country_code);
                // _______________ Map properties _______________
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
                // _______________ Initializing map in background _______________
                function initialize() {
                    var map = new google.maps.Map(
                        document.getElementById(
                            "googleMap"),
                        mapProp);
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
        })
    })
})
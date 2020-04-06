 /*Description : This is to show the location of restaurant, hospital, movie theater, bus station 
                on google maps with respect to a user location.
                This project uses google maps API.*/
 
 // Call getLocation()
 getLocation();

 //get current position of user
 function getLocation() {
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function (position) {
             let latitude = position.coords.latitude;
             let longitute = position.coords.longitude

             // Sending latitude and longitude to initMap()
             initMap(latitude, longitute)
         });
     } else {
         console.log("Geolocation is not supported by this browser.");
     }
 }


 //this is the main function
 function initMap(latitude, longitude) {
     var myLatLng = {
         lat: latitude,
         lng: longitude
     };

     var map = new google.maps.Map(document.getElementById('map'), {
         zoom: 9,
         center: myLatLng
     });

     var infoWindow = new google.maps.InfoWindow({
         map: map
     });

     //point marker at current position
     var marker = new google.maps.Marker({
         position: myLatLng,
         map: map,
         // title: 'Hello World!'
     });

     var service = new google.maps.places.PlacesService(map);

     var searchItems = ['restaurant',"hospital","movie_theater","bus_station"];

     for(let i of searchItems){

        var request = {
            location: myLatLng,
             radius: 5500,
             type: i
         };

         service.nearbySearch(request,callback);
     }
 
    // this function creates marker for every search result.
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            var place = results[i];
            createMarker(results[i]);
          }
        }
    }

    //creating marker for places and used icon for different search catagories.
     function createMarker(place) {
        
        var placeLoc = place.geometry.location;
        
         var icon = {
            url: place.icon,
            scaledSize: new google.maps.Size(20,20),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(0,0)
        };

        var marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            icon: icon
        });

         google.maps.event.addListener(marker, 'click', function () {
             // console.log(place.name);
             infoWindow.setPosition(placeLoc);
             infoWindow.setContent(place.name);
             infoWindow.open(map, this);
         });
     }

 }
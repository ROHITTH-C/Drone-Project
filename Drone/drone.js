let map;  // Declare a global map variable
let marker;  // Declare a global marker variable

// Function to initialize the map
function myMap() {
    // Initial default location
    const defaultLatitude = 16.81766372714521; 
    const defaultLongitude = 81.51771261137856; 

    // Create a new map centered at the default coordinates
    map = new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(defaultLatitude, defaultLongitude),
        zoom: 16,
    });

    // Create a marker at the default location
    marker = new google.maps.Marker({
        position: { lat: defaultLatitude, lng: defaultLongitude },
        map: map,
        title: "Default Location",
    });

    // Log initial marker position
    console.log(`Marker initially set at: Latitude ${defaultLatitude}, Longitude ${defaultLongitude}`);

    // Fetch the coordinates from the API and update the map and marker
    fetchCoordinatesAndUpdateMap();
}

// Function to fetch coordinates from the API and update the map and marker
function fetchCoordinatesAndUpdateMap() {
    // API URL
    const apiUrl = 'http://localhost/drone.php';

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Log the raw data received
            console.log('Data received from API:', data);

            // Check if the status is success and the data contains latitude and longitude
            if (data.status === "success" && data.data && data.data.latitude && data.data.longitude) {
                // Convert latitude and longitude to floats
                const newLatitude = parseFloat(data.data.latitude);
                const newLongitude = parseFloat(data.data.longitude);

                // Log the converted latitude and longitude
                console.log(`Converted coordinates: Latitude ${newLatitude}, Longitude ${newLongitude}`);

                if (!isNaN(newLatitude) && !isNaN(newLongitude)) {
                    // Update the map center and marker position
                    const newLocation = new google.maps.LatLng(newLatitude, newLongitude);
                    map.setCenter(newLocation);
                    marker.setPosition(newLocation);
                    marker.setTitle("Updated Location");  // Optionally update the marker's title

                    // Log the updated marker position
                    console.log(`Marker updated to: Latitude ${newLatitude}, Longitude ${newLongitude}`);
                } else {
                    console.error("Invalid coordinates received from the API");
                }
            } else {
                console.error("Failed to fetch valid coordinates from the API or data is incomplete");
            }
        })
        .catch(error => {
            console.error('Error fetching coordinates:', error);
        });
}

// Load the map when the window loads
window.onload = myMap;

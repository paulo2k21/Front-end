// Initialize the map
var map = L.map('map').setView([-14.7896, -39.2804], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Fetch countries from the API and populate the select element
fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        var selectPaises = document.getElementById('paises');

        data.forEach(country => {
            var option = document.createElement('option');
            option.value = country.name.common;
            option.text = country.name.common;
            selectPaises.appendChild(option);
        });

        // Event listener for the select element
        selectPaises.addEventListener('change', function () {
            var selectedCountry = this.value;
            showOnMap(selectedCountry, data);
        });
    });

// Function to show the selected country on the map
function showOnMap(countryName, countriesData) {
    // Find the selected country in the data
    var selectedCountry = countriesData.find(country => country.name.common === countryName);

    // Get the coordinates of the selected country
    var countryCoordinates = selectedCountry.latlng;

    // Clear existing markers
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Add a marker for the selected country
    L.marker(countryCoordinates)
        .addTo(map)
        .bindPopup(countryName)
        .openPopup();

    // Adjust the map view to the selected country
    map.setView(countryCoordinates, 5);
}

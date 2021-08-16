function getLocation() {
  const geolocation = navigator.geolocation;
  const Http = new XMLHttpRequest();
  
  geolocation.getCurrentPosition(response => {
    var BigDataCloudApi = "https:/api.bigdatacloud.net/data/reverse-geocode-client";

    BigDataCloudApi = BigDataCloudApi + "?latitude=" + response.coords.latitude + "&longitude" + response.coords.longitude + "&localityLanguage=en";

    Http.open("GET", BigDataCloudApi);
    Http.send();
    Http.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("location").innerHTML  = JSON.parse(this.responseText).city + ", " + JSON.parse(this.responseText).principalSubdivision;
      }
    }
  }, err => {
    document.getElementById("location").innerHTML  = "Unknown Location";
  }, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  })
}

getLocation();
// targeting elements on our featured.html page



// setting up our requirements for our API calls from the terminal
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const { document } = new JSDOM("")
const $ = require("jquery")(window, document);

const cors = "https://cors-anywhere.herokuapp.com/";
const key = "8dmo8ta4dscian61zluqduys";


function initialApiCall() {
  $.ajax({
    url: cors + "https://openapi.etsy.com/v2/listings/active/?api_key=" + key,
    type: "GET",
  }).then(function (data) {
    const allResults = data.results;
    for (let index = 0; index < allResults.length; index++) {
      const resultItem = allResults[index];
      let listingId = resultItem.listing_id;
      let listingName = resultItem.listing_title;
      secondApiCall(listingId);
    }
  });
}
function secondApiCall(listingId) {
  //   console.log(listingId);
  $.ajax({
    url:
      "https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/" +
      listingId +
      "/images?api_key=" +
      key,
    type: "GET",
  }).then(function (data) {
    const image = data.results[0].url_170x135;
    console.log(image);
  });
}
// API call using the listing ID
// https://openapi.etsy.com/v2/listings/864793648/images?api_key=8dmo8ta4dscian61zluqduys
$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    // $.get("/api/user_data").then(function (data) {
    //   console.log(data);
    //   $(".member-name").text(data.user.first_name + " " + data.user.last_name);
    // });

    initialApiCall();

  });

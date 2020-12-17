const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

const cors = "https://cors-anywhere.herokuapp.com/";
const key = "8dmo8ta4dscian61zluqduys";

initialApiCall();

function initialApiCall() {
  $.ajax({
    url: cors + "https://openapi.etsy.com/v2/listings/active/?api_key=" + key,
    type: "GET",
  }).then(function (data) {
    const allResults = data.results;
    for (let index = 0; index < allResults.length; index++) {
      const resultItem = allResults[index];
      let listingId = resultItem.listing_id;
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

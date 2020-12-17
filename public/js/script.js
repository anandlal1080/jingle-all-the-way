const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

const cors = "https://cors-anywhere.herokuapp.com/";
const key = "8dmo8ta4dscian61zluqduys";
let justThePic = [];
initialApiCall();

function initialApiCall() {
  $.ajax({
    url: cors + "https://openapi.etsy.com/v2/listings/active/?api_key=" + key,
    type: "GET",
  }).then(function (data) {
    const allResults = data.results;
    const listingIdNums = [];
    for (let index = 0; index < allResults.length; index++) {
      const resultItem = allResults[index];
      listingIdNums.push(resultItem.listing_id);
    }
    secondApiCall(listingIdNums);
  });
}
function secondApiCall(listingIds) {
  for (let index = 0; index < listingIds.length; index++) {
    const singleId = listingIds[index];
    $.ajax({
      url:
        "https://cors-anywhere.herokuapp.com/https://openapi.etsy.com/v2/listings/" +
        singleId +
        "/images?api_key=" +
        key,
      type: "GET",
    }).then(function (data) {
      const allImages = data.results;

      for (let index = 0; index < allImages.length; index++) {
        justThePic.push(allImages[index].url_170x135);
      }
    });
  }
}
// API call using the listing ID
// https://openapi.etsy.com/v2/listings/864793648/images?api_key=8dmo8ta4dscian61zluqduys

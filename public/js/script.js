const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

const cors = "https://cors-anywhere.herokuapp.com/";

initialApiCall();

function initialApiCall() {
  $.ajax({
    url:
      cors +
      "https://openapi.etsy.com/v2/listings/active?api_key=8dmo8ta4dscian61zluqduys",
    type: "GET",
  }).then(function (data) {
    const allResults = data.results;
    console.log(allResults.length);
  });
}

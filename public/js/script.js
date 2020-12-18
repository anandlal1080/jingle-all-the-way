const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);



console.log(process.env.ETSY_KEY)

initialApiCall();

function initialApiCall() {
  $.ajax({
    
    url: "/api/etsy",
    type: "GET",
  }).then(function (data) {
    
    const image = data.results[0].url_170x135;
    console.log(image);
    
  });
}


// API call using the listing ID
// https://openapi.etsy.com/v2/listings/864793648/images?api_key=8dmo8ta4dscian61zluqduys

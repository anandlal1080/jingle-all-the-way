// $(document).ready(function () {
// });
// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page
// $.get("/api/user_data").then(function (data) {
//   console.log(data);
//   $(".member-name").text(data.user.first_name + " " + data.user.last_name);
// });
// tester code inside of $(document).ready=======================================
// $.get("/api/etsy").then(function (data) {
//   console.log(data);
// });
// end of tester code inside of $(document).ready================================
// Getting references to our form, inputs, and anchors
const listInput = $("#list-name").val();
console.log(listInput);
const logoutAncher = $("#logout");
console.log(listInput);
$(logoutAncher).on("click", function () {
  $.get("/api/logout");

  // When the form is submitted, we send the data to our api/db
  $("#list-btn").on("click", function (event) {
    event.preventDefault();
    // get our user data from the form and store it in a new object
    const newListData = {
      listName: listInput.val().trim(),
    };
    console.log(newListData);
    // Check to make sure our new object has a value
    if (!newListData.listName) return;
    // call our sendlist function passing in our new object
    sendList(newListData);
    // clear the input value on the screen
    listInput.val("");
  });
  function sendList(listName) {
    console.log("made it this far");
    $.get("/api/user_data").then(function (data) {
      let userID = data.user.id;
      console.log(data.user);
      try {
        $.post("/api/user_lists", {
          name: listName,
          userId: userID,
        });
      } catch (error) {
        console.log("this is in the memebers.js");
        console.log(error);
        res.status(500).end();
      }
    });

    // console.log(listName, userID, "this is still in the members.js")
  }
  // Tester code =======================================================
  getEtsyListings();

  function getEtsyListings() {
    $.get("/api/etsy").then(function (data) {
      console.log(data);
    });
  }
  // ===================================================================
});

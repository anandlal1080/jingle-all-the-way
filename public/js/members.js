<<<<<<< HEAD
// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page
$.get("/api/user_data").then(function (data) {
  console.log(data);
  $(".member-name").text(data.user.first_name);
=======
$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    $(".member-name").text(data.user.first_name + " " + data.user.last_name);
  });
>>>>>>> 9e9749dfdf92c87fb49738988151ce9c6e03e365
});

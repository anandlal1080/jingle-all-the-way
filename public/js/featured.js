$(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // $.get("/api/user_data").then(function (data) {
  //   console.log(data);
  //   $(".member-name").text(data.user.first_name + " " + data.user.last_name);
  // });

  // Getting references to our form and inputs
  const newListForm = $(".create-form");
  const listInput = $(".form-control");

  // When the form is submitted, we send the data to our api/db
  $(".create-form").on("submit", function (event) {
    event.preventDefault();
    console.log("click me");
    // get our user data from the form and store it in a new object
    const newListData = {
      listName: listInput.val().trim(),
    };
    // Check to make sure our new object has a value
    if (!newListData.listName) return;
    // call our sendlist function passing in our new object
    sendList(newListData);
    // clear the input value on the screen
    listInput.val("");
  });
  function sendList(listName) {
    $.get("/api/user_data").then(function (data) {
      let userID = data.user.id;
      // console.log(data.user);
      try {
        $.post("/api/user_lists", {
          name: listName,
          userId: userID,
        }).then(function () {
          // Reload the page to get the updated list
          location.reload();
        });
      } catch (error) {
        console.log(error);
        res.status(500).end();
      }
    });

    // console.log(listName, userID, "this is still in the members.js")
  }
});

$("#more-items").on("click", function (event) {
  event.stopPropagation();
  renderEtsy();
});
function renderEtsy() {
  $.get("/api/etsy");
  location.reload();
}

localStorage.clear();

$(".list-group-item").on("click", function (event) {
  event.stopPropagation();
  let listId = $(this).attr("data");
  localStorage.setItem("listId", listId);
  $.post("/api/list_items", {
    list: listId,
  });
});

$(".fas.fa-trash-alt").on("click", function (event) {
  event.stopPropagation();
  let trashId = $(this).attr("data");
  console.log(trashId);
});

$(".fas.fa-gift").on("click", function (event) {
  event.stopPropagation();
  if (localStorage.getItem("listId") != null) {
    let etsyId = $(this).attr("data");
    const listId = localStorage.getItem("listId");
    console.log(listId, etsyId);
    $.post("/api/etsy_items", {
      etsy: etsyId,
      list: listId,
    });
  }
});

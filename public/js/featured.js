$(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // $.get("/api/user_data").then(function (data) {

  //   $(".member-name").text(data.user.first_name + " " + data.user.last_name);
  // });

  // Getting references to our form and inputs
  const newListForm = $(".create-form");
  const listInput = $(".form-control");

  // When the form is submitted, we send the data to our api/db
  $(newListForm).on("submit", function (event) {
    event.preventDefault();

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
  }
});

$("#more-items").on("click", function (event) {
  event.stopPropagation();
  $("#imgload").show();
  $("#more-items").hide();
  renderEtsy();
});

function renderEtsy() {
  $.get("/api/etsy").then(function () {
    location.reload();
  });
}

$("#clear-etsy").on("click", function (event) {
  event.stopPropagation();
  clearEtsy();
});

function clearEtsy() {
  $.post("/api/clear_etsy").then(function (data) {
    location.reload();
  });
}

localStorage.clear();

// this is our click function for lists in col-1
$(".list-group-item").on("click", function (event) {
  event.stopPropagation();
  let listId = $(this).attr("data");
  localStorage.setItem("listId", listId);
  $.post("/api/list_items", {
    list: listId,
  }).then(function (data) {
    // $.get("/members", { userGifts: data });
    // ==================================================================

    // this is where I"m going to clear the list before populating it
    $("#gifts-location").empty();

    // this is where I'm going to dynamically create the gift items inside each list
    console.log(data);
    for (let i = data.length-1; i >= 0; i--) {
      let name = data[i].name;
      let image = data[i].url;
      let price = data[i].price;
      let url = data[i].listing_url;

      let cardEl = $("<div>").attr("class", "card shadow mt-5");
      let cardInner = $("<div>").attr("class", "inner");
      let imgEl = $("<img>").attr("src", image);
      let cardBody = $("<div>").attr("class", "card-body text-justify");
      let pEl = $("<p>").attr("style", "margin-left: 0").text(name);
      let spanEl = $("<span>")
        .attr("style", "font-weight: bold")
        .text(`Price:${price}`);
      let urlEl = $("<a>").attr("href", url).text("Item Link");
      $("#gifts-location").append(
        cardEl.append(
          cardInner
            .append(imgEl)
            .append(cardBody.append(pEl).append(spanEl).append(urlEl))
        )
      );
    }
  });
});
// this is our click function for the gifts Icon
$(".fas.fa-gift").on("click", function (event) {
  event.stopPropagation();
  if (localStorage.getItem("listId") != null) {
    let etsyId = $(this).attr("data");
    $.get("/api/user_data").then(function (data) {
      let userID = data.user.id;
      console.log(etsyId);
      const listId = localStorage.getItem("listId");

      $.post("/api/etsy_items", {
        etsy: etsyId,
        list: listId,
        userId: userID,
      });
    });
    console.log($(this).siblings());
    console.log($(this).siblings("span").text());

    let name = $(this).parent().text();
    console.log(name);
    let image = data[i].url;
    let price = $(this).siblings("span").text();
    let url = data[i].listing_url;

    let cardEl = $("<div>").attr("class", "card shadow mt-5");
    let cardInner = $("<div>").attr("class", "inner");
    let imgEl = $("<img>").attr("src", image);
    let cardBody = $("<div>").attr("class", "card-body text-justify");
    let pEl = $("<p>").attr("style", "margin-left: 0").text(name);
    let spanEl = $("<span>")
      .attr("style", "font-weight: bold")
      .text(price);
    let urlEl = $("<a>").attr("href", url).text("Item Link");
    $("#gifts-location").append(
      cardEl.append(
        cardInner
          .append(imgEl)
          .append(cardBody.append(pEl).append(spanEl).append(urlEl))
      )
    );
  }
});

// This button click will delete a list
$(".fas.fa-trash-alt").on("click", function (event) {
  event.stopPropagation();
  let trashId = $(this).attr("data");

  // this makes the call to our api controller that will delete it from the db.
  $.post("/api/delete_list", {
    dlt_list: trashId,
  }).then(function (data) {
    location.reload();
  });
});

$("#logout").on("click", function (event) {
  event.stopPropagation();

  logOut();
});

function logOut() {
  $.get("/api/logout");
  location.reload();
}

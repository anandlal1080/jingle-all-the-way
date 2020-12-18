$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // $.get("/api/user_data").then(function (data) {
  //   console.log(data);
  //   $(".member-name").text(data.user.first_name + " " + data.user.last_name);
  // });

  // Getting references to our form and inputs
  const newListForm = $("form.create-new-list");
  const listInput = $("input#list-name");

  // When the form is submitted, we send the data to our api/db
  newListForm.on("submit", function (event) {
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
    listInput.val("")
    
  });
  function sendList(listName){
    let userID = "";
    $.get("/api/user_data").then(function (data) {
      console.log(data);
      userID = data.user.id;
    });
    // console.log(listName, userID, "this is still in the members.js")
    try {
      $.post("/api/user_lists", {
        name: listName,
        user_id: userID
      });
    } catch (error) {
      console.log("this is in the memebers.js")
      console.log(error)
      res.status(500).end()
    }
  }
});

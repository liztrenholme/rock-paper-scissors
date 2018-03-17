  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyCmK6VgVTtzZ5ZDPOkGssOJLgMrK1mAdjI",
      authDomain: "rock-paper-scissors-5c265.firebaseapp.com",
      databaseURL: "https://rock-paper-scissors-5c265.firebaseio.com",
      projectId: "rock-paper-scissors-5c265",
      storageBucket: "rock-paper-scissors-5c265.appspot.com",
      messagingSenderId: "146335845104"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var loggedOn = database.ref("loggedOn");
  var chatbox = {
      name: " ",
      text: " "
  };
  var player1 = {
      name: " ",
      wins: 0,
      losses: 0,
      turn: false,
      choice: " "
  };

  var player2 = {
      name: " ",
      wins: 0,
      losses: 0,
      turn: false,
      choice: " "
  };

  // onclick function for submitting a name
  $("button#submit-name").on("click", function() {
      player1.name = $("#name-goes-here").val();
      loggedOn = true;
      if (loggedOn === true) {
          database.ref().set({
              player: player1
          });
      }
      if (player1.name.length > 0) {
          database.ref().child("player").set({
              player1: true
          });
          database.ref().child("player1").set({
          name: player1.name
        });
          $("#name-prompt").hide();
          $(".headline").append("Hi, " + player1.name + "!  You are Player One!");
          console.log(player1.name);
      }

      return false;
  });


  var rockPOne = $("#p-one-rock");
  var rockPTwo = $("#p-two-rock");
  var paperPOne = $("#p-one-paper");
  var paperPTwo = $("#p-two-paper");
  var scissorsPOne = $("#p-one-scissors");
  var scissorsPTwo = $("#p-two-scissors");

      $(".selectors").on("click", function() {
          player1.choice = (this.id);
          if (player1.choice === rockPOne) {
              $("#p-one-paper", "#p-one-scissors").hide();
              database.update().child(player1.choice);
              var choice = {
                  choice: rock
              };
          } else if (player1.choice === paperPOne) {
              $("#p-one-rock", "#p-one-scissors").hide();
              database.update().child(player1.choice);
              var choice = {
                  choice: paper
              };
          } else if (player1.choice === scissorsPOne) {
              $("#p-one-rock", "#p-one-paper").hide();
              database.ref().update().child(player1.choice);
              var choice = {
                  choice: scissors
              };
          }

      });



    // chatbox function
      $("#send-chat").on("click", function () {
          var message = $("#message-input").val();
          $("#message-input").val("");
          var chatMessages = database.ref("chat");
          var chat = database.ref().set({
              message: message,
              timestamp: firebase.database.ServerValue.TIMESTAMP,
              sender: player1.name
          });
          chatMessages.push(message);

          return false;
      });
  
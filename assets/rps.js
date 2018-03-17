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


  //database.ref().on("value", function(snapshot) {

     // player1.choice = snapshot.child("Player1").child("choice").val();
      //   player1.name = snapshot.child("Player1").child("name").val();
      //    player1WinCount = snapshot.child("Player1").child("wins").val();
      //    player1LossCount = snapshot.child("Player1").child("losses").val();

    //  player2.choice = snapshot.child("Player2").child("choice").val();
     // player2.name = snapshot.child("Player2").child("name").val();
      //    player2WinCount = snapshot.child("Player2").child("wins").val();
      //    player2LossCount = snapshot.child("Player2").child("losses").val();

      //updateScoreDisplay();

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
  //});

/*
var chatRef = database.ref().child("chatbox");  
$("#send-chat").on("click", function() {
    
      database.ref().set({
            chatbox: chatbox
        });

  

 
  
    /*  if (e.keyCode == 13) {
          if ($("name-goes-here").val() === "") {
              //   $('#chatError').show();
              console.log("error");
              return
          }

          //   $('#chatError').hide(); 

           }); 
          var text = $().val();
          chatRef.push({
              name: player1.name,
              text: text
      });

  chatRef.on("child_added", function(snapshot) {
      var message = snapshot.val();
      $("<div/>").text(message).prepend($("<p/>").text(name + ": " + message)).appendTo($("#chat-space"));
  });
  });
*/
      



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
  
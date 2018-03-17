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
  var chatbox = {
      name: " ",
      text: " "
  };

  var currentPlayer;

  var player = {
      player1stat: false,
      player2stat: false
  }

  var player1 = {
      name: " ",
      wins: 0,
      losses: 0,
      turn: false,
      choice: " ",
      chat: " "
  };

  var player2 = {
      name: " ",
      wins: 0,
      losses: 0,
      turn: false,
      choice: " ",
      chat: " "
  };
  /*
        function data(data) {
            console.log(data);
            var playerCheck = data.val();
            var playerCheckStats = Object.keys(playerCheck);
            console.log(playerCheckStats);
        }

        var fbPlayerStat2 = database.ref("player2stat");
        fbPlayerStat2.on("value", data, error);
        console.log(fbPlayerStat2);


        function error(err) {
            console.log("error");
            console.log(err);
        } */



// need to fix errors and figure out why player 1 and 2 names are repeating?
// need to better understand how snapshot works on firebase and how to pull the data, because .val() only works sometimes
  $("button#submit-name").on("click", function(data) {
              $("#name-prompt").hide();
              //    var fbPlayerStat = database.ref().child("player");
              database.ref().on("value", function(snapshot) {
                  console.log(snapshot.val().player2stat);
                  switch (player) {

                      case snapshot.child("player1").exists():
                          player2.name = $("#name-goes-here").val();
                          currentPlayer = player2.name;
                          database.ref().child("player").set({
                              player1stat: true,
                              player2stat: true
                          });
                          database.ref().child("player2").set({
                              name: player2.name
                          });
                          $(".headline").append("Hi, " + player2.name + "!  You are Player Two!");
                          console.log(player2.name);
                          break;

                      case snapshot.child("player1").exists() && snapshot.child("player2").exists():
                          return false;
                          break;

                      default:
                          player1.name = $("#name-goes-here").val();
                          player2.name = " ";
                          currentPlayer = player1.name;
                          player1stat = true;
                          player2stat = false;

                          database.ref().update({
                              player: player1stat
                          });
                          database.ref().child("player").set({
                              player1stat: true,
                              player2stat: false
                          });
                          database.ref().child("player1").set({
                              name: player1.name
                          });

                          $(".headline").append("Hi, " + player1.name + "!  You are Player One!");
                          console.log(player1.name);
                          break;

                  }
                  function err(errorObject) {
                      console.log("Errors handled: " + errorObject.code);
                  };
              });

// needs more functionality- images don't hide when they're supposed to
// and selection isn't registered to firebase
              var rockPOne = $("#p-one-rock");
              var rockPTwo = $("#p-two-rock");
              var paperPOne = $("#p-one-paper");
              var paperPTwo = $("#p-two-paper");
              var scissorsPOne = $("#p-one-scissors");
              var scissorsPTwo = $("#p-two-scissors");

              $("img").on("click", function() {
                  player1.choice = (this);
                  console.log(this);
                  if (player1.choice === $("#p-one-rock")) {
                      $("#p-one-paper", "#p-one-scissors").hide();
                      database.ref().update(player1.choice);
                      var choice = {
                          choice: rock
                      };
                  } else if (player1.choice === paperPOne) {
                      $("#p-one-rock", "#p-one-scissors").hide();
                      database.ref().update(player1.choice);
                      var choice = {
                          choice: paper
                      };
                  } else if (player1.choice === scissorsPOne) {
                      $("#p-one-rock", "#p-one-paper").hide();
                      database.ref().update(player1.choice);
                      var choice = {
                          choice: scissors
                      };
                  }

              });


// chat is currently one-sided. messages go to firebase, but don't come back
              // chatbox function
              var chatRef = database.ref().child("chat");
              $("#send-chat").on("click", function() {
                  var message = $("#message-input").val();
                  $("#message-input").val("");
                  var sender = player1.name;
                  var chatMessages = database.ref().child("chat");
                  var chat = database.ref().push({
                      message: message,
                      timestamp: firebase.database.ServerValue.TIMESTAMP,
                      sender: player1.name
                  });
                  chatMessages.push(message);
                  $("#chat-space").text(sender + ": " + message);

                  return false;


                  chatRef.on('child_added', function(snapshot) {
                      var newMessage = snapshot.val();
                      $("<span/>").text(message).prepend($("<em/>").text(sender + ": ")).appendTo($('#chat-space'));


                  });
              });
               });
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

  // On-click function for submitting a name.
    $("button#submit-name").on("click", function () {
        player1.name = $("#name-goes-here").val();
        if (player1.name.length > 0) {
              database.ref().set({
                name: player1.name
            });
            $("#name-prompt").hide();
            $(".headline").append("Hi, " + player1.name + "!  You are Player One!");
        }

        return false;
    });

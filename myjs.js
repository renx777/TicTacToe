$(document).ready(function () {

  $('span').addClass('zod');


  var g = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  var userchoice, compchoice;
  //  all possible three pair moves
  var m = [
    ["zero", "one", "two"],
    ["zero", "three", "six"],
    ["one", "four", "seven"],
    ["two", "four", "six"],
    ["three", "four", "five"],
    ["six", "seven", "eight"],
    ["zero", "four", "eight"],
    ["two", "five", "eight"]
  ]
  //  keeps track of number of moves made by either players
  var numOfMoves = 0;
  // gotta name variables better
  // t and h are arrays to ids of span items
  var t = [];
  var h = [];
  //  push ids of all span in t and h array
  $('span').each(function () {
    t.push(this.id);
    h.push(this.id);
  })

  // hide the gameBoard at the start of the game
  $('.gameBoard').hide()
  $('.dis').css('margin-top', '150px')


  //  when user chooses his symbol,show the board and randomly decide whether user or computer to make the first move
  $('.btn').on('click', function () {

    $('.dis').css('margin-top', '5px')
    $('.btn').css('visibility', 'hidden')
    $('.gameBoard').show()

    $('span').unbind('click', moveMade);

    // alternating the user and comp choices
    if (this.id == "X") {
      userchoice = "X";
      compchoice = "O"
    } else {
      userchoice = "O";
      compchoice = "X"
    }

    //  randomnly deciding to let user or ai play the first move
    var players = ["user", "ai"];
    var rand = Math.floor(Math.random() * players.length);

    if (players[rand] == "user") {
      $('i').text("you play first");
      setTimeout(function () { $('i').text("<[o_O]>"); }, 1500)
      setTimeout(function () { $('span').bind('click', moveMade) }, 2000)


    } else {
      $('i').text("my turn");
      setTimeout(function () { $('i').text("<[o_O]>"); }, 1500)
      setTimeout(function () {
        $('span').bind('click', moveMade)
        aix();
      }, 2000)




    }

  })

  /* 
  when either of player makes move,moveMade funtion is called
  ---> checks if numOfMoves is greater than 8,if it is checks there is any winner by calling checkWinner function
       --->if there isn't a winner by now,game is considered draw and board is reloded for new game instance
  */




  function moveMade() {

    // check if game is a draw
   if (numOfMoves >= 8) {
      if (checkwinner(userchoice) != "winner") {
        console.log(checkwinner(userchoice))
        $('i').text("game is a draw");
        setTimeout(function () {
          location.reload(true);
        }, 3000)



      }
    }

    numOfMoves++

    // check if 3 pair move is made,and remove if it has
    for (var i = 0; i < m.length; i++) {
      var coun = 0;
      for (j = 0; j < m[i].length; j++) {
        if (m[i][j] == "O" || m[i][j] == "X") {
          coun++;
        }
      }
      if (coun == 3) {
        m[i].splice(i, 1);
        coun = 0;
      }

    }

    $("#" + this.id).text(userchoice).css('color', 'black');

    //  unbind click event on already clicked cells, so that user wont be able to click it again
    $("#" + this.id).unbind('click', moveMade);

    // removed clicked cell from possible moves array
    for (var i = 0; i < m.length; i++) {

      for (var j = 0; j < m[i].length; j++) {
        if (m[i].indexOf(this.id) != -1) {

          m[i].splice(m[i].indexOf(this.id), 1, userchoice);

        }

      }

    }
    g.splice(h.indexOf(this.id), 1, userchoice);

    t.splice(t.indexOf(this.id), 1)

    checkwinner(userchoice);

    aix();
  }

  //  function which lets ai decide move
  function aix() {
    
    // checkwinner(compchoice);
    if (numOfMoves >= 8) {
      if (checkwinner(compchoice) != "winner") {
        $('i').text("game is a draw");
        setTimeout(function () {
          location.reload(true);
        }, 3000)


      }
    }
    numOfMoves++
    var choice = ai();

    if (choice == compchoice || choice == userchoice) {
      var rand = Math.floor(Math.random() * t.length);
      choice = t[rand];

    }
    for (var i = 0; i < m.length; i++) {

      for (var j = 0; j < m[i].length; j++) {
        if (m[i].indexOf(choice) != -1) {

          m[i].splice(m[i].indexOf(choice), 1, compchoice);

        }

      }

    }

    $('#' + choice).text(compchoice).css('color', 'red');
    $('#' + choice).unbind('click');

    g.splice(h.indexOf(choice), 1, compchoice);
    t.splice(t.indexOf(choice), 1);
    checkwinner(compchoice);
    console.log(numOfMoves)

  


  }

  $('span').click(moveMade)

  function ai() {

    // if num of mov is <3,ai choice is random
    for (var i = 0; i < m.length; i++) {
      var count = 0;
      for (var j = 0; j < m[i].length; j++) {

        if (m[i][j] == compchoice) {
          count++;
        }
      }

      if (count == 2) {
        for (var l = 0; l < m[i].length; l++) {
          if (m[i][l] != compchoice && m[i][l] !== userchoice) {

            var o = m[i][l];
            m.splice(i, 1);

            return o;

          }

        }

      }

    }
    for (var i = 0; i < m.length; i++) {
      var counts = 0;
      for (var j = 0; j < m[i].length; j++) {

        if (m[i][j] == userchoice) {
          counts++;
        }
      }

      if (counts == 2) {
        for (var l = 0; l < m[i].length; l++) {
          if (m[i][l] != compchoice && m[i][l] !== userchoice) {
            var o = m[i][l];
            m.splice(i, 1);

            return o;
          }

        }

      }

    }

    var rand = Math.floor(Math.random() * t.length);

    return t[rand];

  }

  function checkwinner(b) {

   
    if ((g[0] == b && g[1] == b && g[2] == b) || (g[0] == b && g[3] == b && g[6] == b) || (g[0] == b && g[4] == b && g[8] == b) || (g[2] == b && g[4] == b && g[6] == b) || (g[3] == b && g[4] == b && g[5] == b) ||
      (g[6] == b && g[7] == b && g[8] == b) || (g[1] == b && g[4] == b && g[7] == b) || (g[2] == b && g[5] == b && g[8] == b)) {

      if (b == userchoice) {
        $('i').text("you won");
        console.log(userchoice)
        setTimeout(function () {
          location.reload(true);
          return "winner"
        }, 1000)


      } 
      if(b==compchoice) {
        $('i').text("you lost")
        console.log(userchoice)
        setTimeout(function () {
          location.reload(true);
          return "winner"
        }, 1000)

      }

    }

  }








})

$('document').ready(function(){
  
  var player
  var scoreboard
  var frame; 
  var rollsArray
  var clicks
  var isFrameTen = false

  newGame();
  rackupFrame();
  
  function newGame(){
    player = new Player
    scoreboard = new ScoreBoard
    clicks = 0
    unpopulateTable();
    unpopulateRollTable();
  }

  function rackupFrame(){
    player.newFrame();
    frame = new Frame;
    displayPins();
    textTakeARoll();
  }; 

  function rackFrameTen(){
    player.newFrame();
    frame = new FrameTen;
    isFrameTen = true
    displayPins();
    textTakeARoll();  
  }; 

  function displayPins(){
    $('#pins-remaining').text(frame.pinsRemaining);
  };

  function textTakeARoll(){
    $('#take-roll').text("Take a roll!");
  }

  function textNextFrame(){
    $('#take-roll').text("Next frame!");
  }

  function textNewGame(){
    $('#take-roll').text("New Game!");
  }

  function getRoll(){
    return player.roll();
  };

  function isRollOneDone(){
    return frame.rollOneDone;
  };

  function isRollTwoDone(){
    return frame.rollTwoDone;
  };

  $('#take-roll').click(function(e){
    e.preventDefault();
    clicksCounter();
    if(frame instanceof FrameTen) return frameTen();    
    if(!isRollOneDone()) return rollOne();
    if(!isRollTwoDone()) return rollTwo();
  });

  function frameTen(){
    roll = getRoll();
    if(!frame.rollOneDone) frame.getRollOne(roll, player);
    if(!frame.rollTwoDone) frame.getRollTwo(roll, player);
    if(!frame.rollThreeDone) frame.getRollThree(roll); 
    postRollDo();
  };

  function clicksCounter(){
    clicks++;
    // if(clicks===21) textNewGame();
    // if(clicks===22) location.reload();
  }

  function rollOne(){
    roll = getRoll();
    frame.getRollOne(roll);
    postRollDo();
  };

  function rollTwo(){
    roll = getRoll();
    frame.getRollTwo(roll);
    postRollDo();
  };
    
  function postRollDo(){
    displayPins();
    onClickDo(); 
  }

  function onClickDo(){
    populateRollArray();
    populateTable();
    if(isFrameTen = true) checkFrameTen();
    if(isRollOneDone() && isRollTwoDone()) closeFrame();
  }

  function checkFrameTen(){
    if(frame.rollThreeDone){
      closeFrame();
    }  
  }

  function closeFrame(){
    doScoreBoardCloseFrame();
    totalScore();
    if(scoreboard.frameScores.length < 10){ 
      rackupFrame();
    }else{
      rackFrameTen();
    }  
    console.log(scoreboard.frameScores.length)
  }

  function doScoreBoardCloseFrame(){
    scoreboard.addFrame(frame);
    scoreboard.processScores();
    scoreboard.totalUpGame();  
  };

  function populateRollArray(){
    rollsArray = []  
    for (var i = 0; i < scoreboard.gameFrames.length; i++) {
      rollsArray.push(scoreboard.gameFrames[i].rollOneScore)
      rollsArray.push(scoreboard.gameFrames[i].rollTwoScore)
      if(typeof scoreboard.frameScores[i].rollThreeScore != 'undefined') rollsArray.push(scoreboard.gameFrames[i].rollThreeScore); 
    }; 
    populateRollTable(); 
  };

  function populateRollTable(){
    $('.roll').each(function(i){
      $(this).text(rollsArray[i]);
    }); 
  };

  function unpopulateRollTable(){
    $('.roll').each(function(i){
      $(this).text("-");
    });     
  };

  function populateTable(){
    $('.frame').each(function(index){
      if(typeof scoreboard.frameScores[index]!='undefined') return $(this).text(scoreboard.frameScores[index]);
      return $(this).text("-");
    });  
  };

  function unpopulateTable(){
    $('.frame').each(function(index){
      return $(this).text("-");
    }); 
  };

  function totalScore(){
    $('#total-score').text(scoreboard.currentScore);
  };

});
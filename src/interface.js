$('document').ready(function(){
  
  var player
  var scoreboard
  var frame; 
  var rollsArray

  newGame();
  rackupFrame();
  
  function newGame(){
    player = new Player
    scoreboard = new ScoreBoard
    unpopulateTable();
    unpopulateRollTable();
  }

  function rackupFrame(){
    player.newFrame();
    frame = new Frame;
  }; 

  function rackFrameTen(){
    player.newFrame();
    frame = new FrameTen;
  }; 

  function totalScore(){
    $('#total-score').text(scoreboard.currentScore);
  };

  function getRoll(){
    return player.roll();
  };

  function frameTen(){
    roll = getRoll();
    if(!frame.rollOneDone) frame.getRollOne(roll, player);
    if(!frame.rollTwoDone) frame.getRollTwo(roll, player);
    if(!frame.rollThreeDone) frame.getRollThree(roll); 
    postRollDo();
  };
    
  function postRollDo(){
    displayPins();
    onClickDo(); 
  }

  function checkFrameTen(){
    if(frame.rollThreeDone) closeFrame();
  }

  function closeFrame(){
    doScoreBoardCloseFrame();
    totalScore();
    if(scoreboard.frameScores.length < 10) return rackupFrame();
    return rackFrameTen(); 
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

});
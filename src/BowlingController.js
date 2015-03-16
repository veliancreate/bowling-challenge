$('document').ready(function(){
  
  var scoreboard
  var frame; 
  var rollsArray

  newGame();
  rackupFrame();
  
  function newGame(){
    scoreboard = new ScoreBoard
    unpopulateTable();
    unpopulateRollTable();
  }

  function rackupFrame(){
    frame = new Frame;
  }; 

  function rackupFrameTen(){
    frame = new FrameTen;
  }; 

  function getRoll(){

  };

  function totalScore(){
    $('#total-score').text(scoreboard.currentScore);
  };

  function populateRollTable(){
    $('.roll').each(function(i){
      $(this).text(rollsArray[i]);
    }); 
  };

  function unpopulateRollTable(){
    $('.roll').each(function(){
      $(this).text("-");
    });     
  };

  function populateTable(){
    $('.frame').each(function(i){
      if(typeof scoreboard.frameScores[i]!='undefined') return $(this).text(scoreboard.frameScores[i]);
      return $(this).text("-");
    });  
  };

  function unpopulateTable(){
    $('.frame').each(function(){
      return $(this).text("-");
    }); 
  };

  function frameTen(){
    roll = getRoll();
    if(!frame.rollOneDone) frame.getRollOne(roll);
    if(!frame.rollTwoDone) frame.getRollTwo(roll);
    if(!frame.rollThreeDone) frame.getRollThree(roll); 
  };
  
  function checkFrameTen(){
    if(frame.rollThreeDone) closeFrame();
  }

  function closeFrame(){
    doScoreBoardCloseFrame();
    totalScore();
    if(scoreboard.frameScores.length < 10) return rackupFrame();
    return rackupFrameTen(); 
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


});
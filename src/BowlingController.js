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

  $('.number').click(function(){
    roll = parseInt($(this).data('value'))
    rollsArray.push(roll)
    if()    
  });

  function totalScore(){
    $('#total-score').text(scoreboard.currentScore);
  };

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

});
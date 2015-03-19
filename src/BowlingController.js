$('document').ready(function(){
  
  var scoreboard
  var frame; 
  var rollsArray = []

  newGame();
  rackupFrame();
  
  function newGame(){
    scoreboard = new ScoreBoard
    unpopulateTable();
    unpopulateRollTable();
  }

  function rackupFrame(){
    frame = new Frame;
    showNumbers();
  }; 

  function rackupFrameTen(){
    frame = new FrameTen;
    console.log(frame);
    showNumbers();
  }; 

  $('.number').click(function(){
    roll = parseInt($(this).data('value'))
    rollsArray.push(roll);
    frame.getRoll(roll);
    doRemoveNumbers(roll);
    populateRollTable();
    if(frame.frameOver){
      closeFrame();
    }
    if(frame.gameOver){
      doScoreBoardCloseFrame();
      populateTable();
      totalScore();
      console.log(frame)
      console.log(scoreboard.frameScores)
      $('.number').hide();
    }
  });

  function doRemoveNumbers(roll){
    $('.number').each(function(i){
      if(i > frame.pinsRemaining) {
        $(this).hide();
      };  
    });    
  };

  function closeFrame(){
    doScoreBoardCloseFrame();
    populateTable()
    totalScore();
    if(scoreboard.gameFrames.length < 9){
      rackupFrame();
    }else{
      rackupFrameTen();   
    };  
  }

  function totalScore(){
    $('#total-score').text(scoreboard.currentScore);
  };

  function doScoreBoardCloseFrame(){
    scoreboard.addFrame(frame);
    scoreboard.processScores();
    scoreboard.totalUpGame(); 
  };

  function showNumbers(){
    $('.number').show();
  }

  $('#new-game').click(function(){
    location.reload();
  });
      
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
      return $(this).text(scoreboard.frameScores[i]);
      return $(this).text("-");
    });  
  };

  function unpopulateTable(){
    $('.frame').each(function(){
      return $(this).text("-");
    }); 
  };

});
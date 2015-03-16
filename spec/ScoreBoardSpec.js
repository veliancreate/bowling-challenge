describe('ScoreBoard', function(){

  var scoreboard 
  var player
  var frame1
  var frame2
  var frame3
  var frame4
  var frame5
  var frame6
  var frame7
  var frame8
  var frame9
  var frame10

  beforeEach(function(){
    scoreboard = new ScoreBoard();
    frame1 = new Frame
    frame2 = new Frame
    frame3 = new Frame
    frame4 = new Frame
    frame5 = new Frame
    frame6 = new Frame
    frame7 = new Frame
    frame8 = new Frame
    frame9 = new Frame
    frame10 = new FrameTen
  });

  function fillBoard(){
    scoreboard.addFrame(frame1)
    scoreboard.addFrame(frame2)
    scoreboard.addFrame(frame3)
    scoreboard.addFrame(frame4)
    scoreboard.addFrame(frame5)
    scoreboard.addFrame(frame6)
    scoreboard.addFrame(frame7)
    scoreboard.addFrame(frame8)
    scoreboard.addFrame(frame9)
    scoreboard.addFrame(frame10)
  };
    
  it('can add frames', function(){
    fillBoard();
    expect(scoreboard.gameFrames.length).toEqual(10);
  });

  it('knows when a frame scored a strike', function(){
    frame1.rollOneScore = 10;
    expect(scoreboard.isStrike(frame1)).toEqual(true);
  });

  it('knows when a frame has scored a half strike', function(){
    frame1.rollOneScore = 5;
    frame1.rollTwoScore = 5;
    expect(scoreboard.isHalfStrike(frame1)).toEqual(true); 
  });

  it('can return the index of a frame from the gameFrames array', function(){
    fillBoard();
    expect(scoreboard.getFrameIndex(frame1)).toEqual(0);
    expect(scoreboard.getFrameIndex(frame2)).toEqual(1);
    expect(scoreboard.getFrameIndex(frame3)).toEqual(2);
    expect(scoreboard.getFrameIndex(frame4)).toEqual(3);
  });

  it('knows that it cant check an item if it doesnt have an item one or two places above it in the array', function(){
    fillBoard();
    expect(scoreboard.canCheck(frame8)).toEqual(true)
    expect(scoreboard.canCheck(frame9)).toEqual(false)
  });

  it('knows when a player scores a turkey', function(){
    frame1.getRoll(10);
    frame2.getRoll(10);
    frame3.getRoll(10);
    fillBoard();
    scoreboard.processScores();
    expect(scoreboard.frameScores[0]).toEqual(30);  
  });

  it('knows when a player scores a double strike', function(){
    frame1.getRoll(10);
    frame2.getRoll(10);
    frame3.getRoll(5);
    frame3.getRoll(3);
    fillBoard();
    scoreboard.processScores();
    expect(scoreboard.frameScores[0]).toEqual(25);
  });

  it('can accumulate scores after a strike', function(){
    frame1.getRoll(10);
    frame2.getRoll(5);
    frame2.getRoll(3);
    fillBoard();
    scoreboard.processScores();
    expect(scoreboard.frameScores[0]).toEqual(18)
  });

  it('can accumulate after a half strike if the next roll is a strike', function(){
    frame1.getRoll(5);
    frame1.getRoll(5);
    frame2.getRoll(10);
    fillBoard();
    scoreboard.processScores();
    expect(scoreboard.frameScores[0]).toEqual(20);
  });

  it('can accumulate after a half strike if the next roll isnt a strike', function(){
    frame1.getRoll(5);
    frame1.getRoll(5);
    frame2.getRoll(8);
    fillBoard();
    scoreboard.processScores();
    expect(scoreboard.frameScores[0]).toEqual(18);
  });

  it('if frame 9 is a strike can add the next two rolls of frame 10', function(){
    frame9.getRoll(10);
    frame10.getRoll(3);
    frame10.getRoll(4);
    fillBoard();
    scoreboard.processScores();
    expect(scoreboard.frameScores[8]).toEqual(17);       
  });

  it('if frame 9 is a half strike it can add the next roll of frame 10', function(){
    frame9.getRoll(5);
    frame9.getRoll(5);
    frame10.getRoll(3);
    fillBoard();
    scoreboard.processScores();
    expect(scoreboard.frameScores[8]).toEqual(13);       
  });

  it('if frame 9 is not a half strike it can add its own frame scores', function(){
    frame9.getRoll(5);
    frame9.getRoll(3);
    frame10.getRoll(3);
    fillBoard();
    scoreboard.processScores();
    expect(scoreboard.frameScores[8]).toEqual(8);       
  });

  it('can confirm if frame 9 is a turkey', function(){
    frame9.getRoll(10);
    frame10.getRoll(10);
    frame10.getRoll(10);
    fillBoard();
    scoreboard.processScores();
    expect(scoreboard.frameScores[8]).toEqual(30);      
  });

  it('can calculate frame 10', function(){
    frame10.getRoll(10)
    frame10.getRoll(10)
    frame10.getRoll(10)
    fillBoard()
    scoreboard.processScores();
    expect(scoreboard.frameScores[9]).toEqual(30)  
  });

  it('can calculate frame 10', function(){
    frame10.getRoll(5)
    frame10.getRoll(5)
    frame10.getRoll(10)
    fillBoard()
    scoreboard.processScores();
    expect(scoreboard.frameScores[9]).toEqual(20)  
  });

  it('can calculate frame 10', function(){
    frame10.getRoll(3)
    frame10.getRoll(3)
    frame10.getRoll(0)
    fillBoard()
    scoreboard.processScores();
    expect(scoreboard.frameScores[9]).toEqual(6)
    expect(scoreboard.gameOver).toEqual(true)  
  });


  it('can calculate a game', function(){
    frame1.getRoll(7)
    frame1.getRoll(3)
    frame2.getRoll(10)
    frame3.getRoll(3)
    frame3.getRoll(7)
    frame4.getRoll(4)
    frame4.getRoll(5)
    frame5.getRoll(10)
    frame6.getRoll(3)
    frame6.getRoll(5)
    frame7.getRoll(4)
    frame7.getRoll(6)
    frame8.getRoll(10)
    frame9.getRoll(10)
    frame10.getRoll(10)
    frame10.getRoll(10)
    frame10.getRoll(10)
    fillBoard();
    scoreboard.processScores();
    scoreboard.totalUpGame();
    expect(scoreboard.currentScore).toEqual(199)
    expect(scoreboard.gameOver).toEqual(true)
  });

});
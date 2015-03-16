FrameTen = function() {
  this.pinsRemaining = 10
  this.rollOneScore = 0
  this.rollTwoScore = 0
  this.rollThreeScore = 0
  this.rollOneDone = false
  this.rollTwoDone = false
  this.rollThreeDone = false
};

FrameTen.prototype.isStrike = function(roll){
  return roll === 10
}

FrameTen.prototype.rollOneScoreStrike = function(){
  this.rollOneScore = 10
}

FrameTen.prototype.rollTwoScoreStrike = function(){
  this.rollTwoScore = 10
}

FrameTen.prototype.getRollOne = function(roll) {
  if(this.isStrike(roll)){
    this.rollOneScoreStrike(roll)  
  }else{ 
    this.rollOneScore = this.getScore(roll)   
  }
  this.rollOneDone = true;
};

FrameTen.prototype.getRollTwo = function(roll){
  if(this.isStrike(roll)) {
    this.rollTwoScoreStrike()
  }else{
    this.rollTwoScore = this.getScore(roll)   
  }; 
  this.rollTwoDone = true;
};

FrameTen.prototype.getRollThree = function(roll){
  if(this.isRollThree()){
    this.rollThreeScore = roll
  }else{
    this.rollThreeScore = 0;
  }  
  this.rollThreeDone = true
};

FrameTen.prototype.isRollThree = function(){
  if(this.rollOneScore + this.rollTwoScore >= 10) return true
  return false
};

FrameTen.prototype.getScore = function(roll){  
  this.pinsRemaining -= roll;
  return roll
};


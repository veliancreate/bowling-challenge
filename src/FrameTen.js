FrameTen = function() {
  this.pinsRemaining = 10
  this.rollOneScore = 0
  this.rollTwoScore = 0
  this.rollThreeScore = 0
  this.rollOneDone = false
  this.rollTwoDone = false
  this.rollThreeDone = false
  this.frameOver = false
};

FrameTen.prototype.getRoll = function(roll){
  if(!this.rollOneDone) return this.getRollOne(roll);
  if(!this.rollTwoDone) return this.getRollTwo(roll);
  if(this.isRollThree()) return this.getRollThree(roll);
  return frameOver = true;
}

FrameTen.prototype.isStrike = function(roll){
  return roll === 10
}

FrameTen.prototype.getRollOne = function(roll) {
  if(this.isStrike(roll)){
    this.rollOneScore = 10
  }else{ 
    this.rollOneScore = this.getScore(roll)   
  }
  this.rollOneDone = true;
};

FrameTen.prototype.getRollTwo = function(roll){
  if(this.isStrike(roll)) {
    this.rollTwoScore = 10
  }else{
    this.rollTwoScore = this.getScore(roll)   
  }; 
  this.rollTwoDone = true;
};

FrameTen.prototype.getRollThree = function(roll){
  this.rollThreeScore = roll 
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


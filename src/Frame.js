Frame = function() {
  this.pinsRemaining = 10
  this.rollOneScore = 0
  this.rollTwoScore = 0
  this.rollOneDone = false
  this.frameOver = false
};

Frame.prototype.getRoll = function(roll){
  if(!this.rollOneDone) return this.getRollOne(roll);
  if(!this.rollTwoDone) return this.getRollTwo(roll);
  return this.frameOver
}

Frame.prototype.getRollOne = function(roll) {
  this.rollOneScore = this.getScore(roll);
  this.rollOneDone = true;
};

Frame.prototype.getRollTwo = function(roll){
  if(this.rollOneScore===10) this.rollTwoScore === 0
  if(this.rollOneScore!==10) this.rollTwoScore = this.getScore(roll);
  this.frameOver = true;
};

Frame.prototype.getScore = function(roll){  
  this.pinsRemaining -= roll;
  return roll
};


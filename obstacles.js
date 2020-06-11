const obstacles = [];

function Obstacle(obstacleObject, startingLeft, startingTop = container.height + 200) {
  this.type = obstacleObject.type;
  this.subType = obstacleObject.subType;
  this.width = obstacleObject.width;
  this.height = obstacleObject.height;
  this.left = startingLeft;
  this.top = startingTop;
  this.url = obstacleObject.url;
  this.speedTop = obstacleObject.speedTop;
  this.speedLeft = obstacleObject.speedLeft;
  this.health = obstacleObject.health;
  this.color = obstacleObject.color;
  this.startingLeft = startingLeft;
  this.startingTop = startingTop;
  this.willExplode = false;
  this.lineOfFire = false;
  this.sound = document.createElement('audio');
  this.sound.src = obstacleObject.sound;
  this.element = document.createElement('div');
  this.element.classList.add('obstacle');
  this.element.style.left = this.left + 'px';
  this.element.style.top = this.top + 'px';
  this.element.style.backgroundImage = this.url;
  this.element.style.width = this.width + 'px';
  this.element.style.height = this.height + 'px';

  this.wasShot = function(bullet, playerCollision) {
    let damage = playerCollision ? 70 : bullet.damage;

    this.health -= damage;

    if (this.health <= 0) {
      this.willExplode = true;
    }
}

  enemyContainer.appendChild(this.element);
  obstacles.push(this);
}


function updateObstacle(obstacle) {
    obstacle.left += obstacle.speedLeft;
    obstacle.top -= obstacle.speedTop;
    obstacle.element.style.left = obstacle.left + 'px';
    obstacle.element.style.top = obstacle.top + 'px';
}


const rockBasic = {
  type: 'rock',
  subType: 'rockBasic',
  width: 100,
  height: 100,
  url: 'url(./Assets/Images/rockBasic.png)',
  speedTop: 1,
  speedLeft: 0,
  health: 6,
  color: 'grey',
  sound: './audio/rockBasicExplosion.mp3'
}
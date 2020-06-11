const powerUps = [];

function PowerUp(powerUpObject, startingLeft, startingTop = container.height + 200) {
  this.type = powerUpObject.type;
  this.subType = powerUpObject.subType;
  this.width = powerUpObject.width;
  this.height = powerUpObject.height;
  this.left = startingLeft;
  this.top = startingTop;
  this.url = powerUpObject.url;
  this.speedTop = powerUpObject.speedTop;
  this.speedLeft = powerUpObject.speedLeft;
  this.color = powerUpObject.color;
  this.filter = powerUpObject.filter;
  this.startingLeft = startingLeft;
  this.startingTop = startingTop;
  this.applyPowerUp = powerUpObject.powerUpToApply;
  this.powerUpUsed = false;
  // this.sound = document.createElement('audio');
  // this.sound.src = powerUpObject.sound;
  this.element = document.createElement('div');
  this.element.classList.add('powerUp');
  this.element.style.left = this.left + 'px';
  this.element.style.top = this.top + 'px';
  this.element.style.backgroundImage = this.url;
  this.element.style.width = this.width + 'px';
  this.element.style.height = this.height + 'px';
  this.element.style.filter = this.filter;

  enemyContainer.appendChild(this.element);
  powerUps.push(this);
}

function updatePowerUp(powerUp) {
  powerUp.left += powerUp.speedLeft;
  powerUp.top -= powerUp.speedTop;
  powerUp.element.style.left = powerUp.left + 'px';
  powerUp.element.style.top = powerUp.top + 'px';
}

const primary2 = {
  type: 'primary',
  subType: 'primary2',
  width: 100,
  height: 100,
  url: 'url(./Assets/Images/missile-icon-png-3-original.png)',
  speedTop: 3,
  speedLeft: 0,
  filter: "invert(7%) sepia(100%) saturate(7171%) hue-rotate(246deg) brightness(108%) contrast(146%)",
  powerUpToApply(plane) {
    plane.bulletType = {type: 'primary2', color: 'blue'}
  }
}
const planes = [];
const enemies = [];
const primaryAudio = document.getElementById('primary');

function FighterJet(left, top, width, height, rateOfFire, bulletSpeed, secondarySpeed, maxHealth, enemy) {
  this.element = document.createElement('div');
  this.element.classList.add('fighterJet');
  this.tooltip = document.createElement('div');
  this.tooltip.classList.add('tooltip');
  this.tooltipHealtherMeter = document.createElement('div');
  this.tooltipHealtherMeter.classList.add('health');
  this.tooltip.appendChild(this.tooltipHealtherMeter);
  this.element.appendChild(this.tooltip);
  this.willExplodeSound = document.createElement('audio');
  this.willExplodeSound.src = "./audio/enemyCollision.mp3"
  this.left = left;
  this.top = top;
  this.width = width;
  this.height = height;
  this.flyRight = false;
  this.flyLeft = false;
  this.flyDown = false;
  this.flyUp = false;
  this.fire = false;
  this.image = 'url("./Assets/Images/fighterJetTwoVector.png")';
  this.willExplode = false;
  this.lastFired = 0;
  this.timeSinceLastFired = 0;
  this.timeSinceLastShot = 0;
  this.rateOfFire = rateOfFire;
  this.lineOfFire = false;
  this.bulletSpeed = bulletSpeed;
  this.bulletCount = 1;
  this.secondarySpeed = secondarySpeed;
  this.topAccel = 0;
  this.rightAccel = 0;
  this.maxHealth = maxHealth;
  this.currentHealth = maxHealth;
  this.score = 0;
  this.setTooltipHealth = function(currentHealth) {
    let healthRatio = currentHealth/this.maxHealth;
    let healthMeterColor;

    if (healthRatio > 0.7) {
      healthMeterColor = 'lime';
    } else if (healthRatio > 0.3) {
      healthMeterColor = 'yellow'
    } else {
      healthMeterColor = 'red';
    }
    this.tooltipHealtherMeter.style.backgroundColor = healthMeterColor;
    this.tooltipHealtherMeter.style.width = Math.max(healthRatio, 0) * 100 + '%';
  };
  this.wasShot = function(bullet, playerCollision) {
    this.timeSinceLastShot = window.time;
    let damage;
    if (bullet) {
      damage = bullet.type === 'secondary' ? 30 : 1;
    } else if (playerCollision) {
      damage = 70;
    }
      document.getElementsByClassName('hitbox')[0].style.backgroundColor = 'green';
      this.tooltip.style.transition = 'opacity 0.2s'
      this.tooltip.style.opacity = 1;
      this.setTooltipHealth(this.currentHealth -= damage);
      if (this.currentHealth <= 0) {
        //enemy plane explodes
        this.willExplode = true;
      }
  }
  if (enemy) {
    this.element.style.backgroundImage = 'url("./Assets/Images/enemy1.png")';
    enemyContainer.appendChild(this.element);
    enemies.push(this);
  } else {
    container.appendChild(this.element);
    planes.push(this);
  }
  }

  function directionToFly(fighterJet) {
    if (fighterJet.flyRight) {
      fighterJet.rightAccel += 0.1;
    }
    if (fighterJet.flyLeft) {
      fighterJet.rightAccel -= 0.1;
    }
    if (fighterJet.flyUp) {
      fighterJet.topAccel -= 0.1;
    }
    if (fighterJet.flyDown) {
      fighterJet.topAccel += 0.1;
    }
  }


  function updatePosition(fighterJet) {
    fighterJet.left += fighterJet.rightAccel;
    fighterJet.top += fighterJet.topAccel;
    fighterJet.element.style.left = fighterJet.left + 'px';
    fighterJet.element.style.top = fighterJet.top + 'px';
    fighterJet.timeSinceLastFired += 1;
  }

  function checkFire(fighterJet, isEnemy) {
    const bulletArray = isEnemy ? enemyBullets : bullets;
    const containerToAppend = isEnemy ? enemyContainer : container;

    if (fighterJet.fire) {
      if (fighterJet.timeSinceLastFired - fighterJet.lastFired > fighterJet.rateOfFire) {
        if (fighterJet.bulletCount % 20 === 0) {
          let bulletSecondaryLeft = new Bullet(fighterJet.left - 12, fighterJet.top, 'secondary', 'left', 'cyan', window.time, isEnemy);
          // bulletSecondaryLeft.sound.play()
          let bulletSecondaryRight = new Bullet(fighterJet.left - 12, fighterJet.top, 'secondary', 'right', 'cyan', window.time, isEnemy);

          fighterJet.bulletCount += 1;

          bulletArray.push(bulletSecondaryLeft);
          bulletArray.push(bulletSecondaryRight);

          containerToAppend.appendChild(bulletSecondaryLeft.element);
          containerToAppend.appendChild(bulletSecondaryRight.element);
        }
        let bullet = new Bullet(fighterJet.left, fighterJet.top, 'primary', null, 'red', window.time, isEnemy);
        // bullet.sound.play()
          bulletArray.push(bullet)
          containerToAppend.appendChild(bullet.element)

        // throttle the amount of bullets fired
        fighterJet.lastFired = fighterJet.timeSinceLastFired;
        fighterJet.bulletCount += 1;
      }

    }
  }

  function fighterJetCollisions(array, type) {
    for (let i = 0; i < array.length; i++) {
      let entity = array[i]

      if (type === 'enemies') {
        //update enemy tooltips
        if (window.time - entity.timeSinceLastShot > 120) {
          entity.tooltip.style.transition = 'opacity 1s';
          entity.tooltip.style.opacity = 0;
        }
      }
      let playerCollision = ((container.width - entity.left - (entity.width / 5) >= fighterJet.left) && (container.width - entity.left - entity.width + entity.width / 5) <= fighterJet.left + fighterJet.width) && (container.height - entity.top - (entity.height / 5) >= fighterJet.top) && (container.height - entity.top - entity.height + (entity.height / 4) <= fighterJet.top + fighterJet.height);

      if (playerCollision) {
        if (!entity.hitByPlayer) {
          entity.wasShot(null, true)
          entity.hitByPlayer = true;
          fighterJet.currentHealth -= 20;
        }
      } else {
        entity.hitByPlayer = false;
      }
    }
  }

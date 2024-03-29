const bullets = [];
const enemyBullets = [];

function updateBullet(bullet, enemies, obstacles) {
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    let lineOfFire = (bullet.left < container.width - enemy.left) && (bullet.left > container.width - (enemy.left + enemy.width));
    if (lineOfFire) {
      enemy.lineOfFire = true;
      if (enemy.flyLeft) {
        enemy.flyRight = false;
      } else if (enemy.flyRight) {
        enemy.flyLeft = false;
      } else {
        enemy.flyLeft = true;
        enemy.flyRight = false;
      }
    } else {
      enemy.lineOfFire = false;
    }
    let enemyCollision = enemy.lineOfFire && ((bullet.top < container.height - enemy.top - (enemy.height / 3)) && (container.height - bullet.top > enemy.top - enemy.height + (enemy.height / 3))) && (container.height - bullet.top > enemy.top && (container.height - bullet.top < enemy.top + enemy.height))


    if (enemyCollision) {
      enemy.wasShot(bullet);
      bullet.collided = true;
    }
  }

  //obstacles
  for (let i = 0; i < obstacles.length; i++) {
    let obstacle = obstacles[i];
    let lineOfFire = (bullet.left < container.width - obstacle.left) && (bullet.left > container.width - (obstacle.left + obstacle.width));

    obstacle.lineOfFire = lineOfFire;

    let obstacleCollision = obstacle.lineOfFire && ((bullet.top < container.height - obstacle.top - (obstacle.height / 3)) && (container.height - bullet.top > obstacle.top - obstacle.height + (obstacle.height / 3))) && (container.height - bullet.top > obstacle.top && (container.height - bullet.top < obstacle.top + obstacle.height))
    if (obstacleCollision) {
      obstacle.wasShot(bullet);
      bullet.collided = true;
    }
  }

  let topCollision = bullet.top <= 0
  if (topCollision) {
    bullet.collided = true;
    if (bullet.type === 'secondary') {
      if (!muted) {
        bullet.soundCollision.play();
      }
    }
  }

  if (bullet.type === 'secondary') {
    //Initial positioning of missiles
    if (window.time - bullet.time < 60) {
      let direction = bullet.subtype === 'left' ? -0.3 : 0.3;
      bullet.left += direction;
      bullet.top -= 0.5;
    } else {
      bullet.top -= bullet.bulletSpeed;
    }
  } else {
    bullet.top -= bullet.bulletSpeed;
  }

  bullet.element.style.left = bullet.left + 'px';
  bullet.element.style.top = bullet.top + 'px';
}


function updateEnemyBullet(bullet) {

  let topCollision = bullet.top <= 0
  if (topCollision) {
    bullet.collided = true;
    if (bullet.type === 'secondary') {
      if (!muted) {
        bullet.soundCollision.play();
      }
    }
  }


  if (bullet.type === 'secondary') {
    //Initial positioning of missiles
    if (window.time - bullet.time < 60) {
      let direction = bullet.subtype === 'left' ? -0.3 : 0.3;
      bullet.left += direction;
      bullet.top -= 0.5;
    } else {
      bullet.top -= bullet.bulletSpeed;
    }
  } else if (bullet.type.startsWith('primary')) {
    bullet.top -= bullet.bulletSpeed;
  }

  bullet.element.style.left = bullet.left + 'px';
  bullet.element.style.top = bullet.top + 'px';

}




function Bullet(left, top, type = 'primary', subtype = 'left', color, time, enemy) {
  this.time = time;
  this.type = type;
  this.color = color;
  this.subtype = subtype;
  this.sound = document.createElement('audio');
  this.soundCollision = document.createElement('audio');
  this.collided = false;
  this.element = document.createElement('div')
  this.element.classList.add('bullet')
  this.top = top;
  this.bulletSpeed = 2;
  this.element.exploded = false;
  this.isEnemyBullet = enemy;

  if (this.type === 'secondary') {
    this.element.classList.add('secondary');
    this.soundCollision.src = './audio/secondaryCollision.mp3';
    this.width = 8;
    this.height = 20;
    this.damage = 30;
    this.bulletSpeed = 12;
    if (this.subtype === 'left') {
      this.sound.src = './audio/secondary.mp3';
    }
  } else if (this.type === 'primary') {
    this.height = 10;
    this.bulletSpeed = 2;
    this.width = 5;
    this.damage = 1;
    this.sound.src = './audio/primary.mp3';
    this.element.style.width = '5px';
    this.element.style.height = '10px';
    this.element.style.backgroundColor = 'red';
  } else if (this.type === 'primary2') {
    this.height = 12;
    this.width = 5;
    this.damage = 2;
    this.bulletSpeed = 3;
    this.sound.src = './audio/primary.mp3';
    this.element.style.width = '5px';
    this.element.style.height = '12px';
    this.element.style.backgroundColor = 'blue';
  } else if (this.type === 'primary3') {
    this.height = 15;
    this.width = 4;
    this.damage = 3;
    this.bulletSpeed = 4;
    this.sound.src = './audio/primary.mp3';
    this.element.style.width = '4px';
    this.element.style.height = '15px';
    this.element.style.backgroundColor = 'orange';
  }

  this.left = left + (fighterJet.width / 2) - 3;

  if (enemy) {
    enemyBullets.push(this)
  } else {
    bullets.push(this)
  }
}


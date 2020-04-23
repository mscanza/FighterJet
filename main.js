const container = document.getElementsByClassName('container')[0];
const enemyContainer = document.getElementsByClassName('enemyContainer')[0];
const scoreNumber = document.getElementsByClassName('scoreNumber')[0];
const backgroundContainer = document.getElementsByClassName('backgroundContainer')[0];
const gameOver = document.getElementsByClassName("gameOver")[0];


const useStars = true;

container.height = 900;
container.width = 1400;

const playerHealthMeter = document.getElementsByClassName('currentPlayerHealth')[0];

var fighterJet = new FighterJet(350, 700, 100, 100, 5, 3, 10, 100)
for (let i = 1; i < 3; i++) {
  var enemy = new FighterJet(1000 / i, 700 - (i * 50), 100, 100, 5, 5, 20, 100, true)
}


window.addEventListener('keydown', function (event) {
  event.preventDefault()

  switch (event.keyCode) {
    // left arrow
    case 37: fighterJet.flyLeft = true;
      break;
    // up arrow
    case 38: fighterJet.flyUp = true;
      break;
    // right arrow
    case 39: fighterJet.flyRight = true;
      break;
    // down arrow
    case 40: fighterJet.flyDown = true;
      break;
    // spacebar
    case 32: fighterJet.fire = true;

    //Remove me!!!
      for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        enemy.fire = true;
      }

      break;
  }

})

window.addEventListener('keyup', function (event) {
  event.preventDefault()

  switch (event.keyCode) {
    // left arrow
    case 37: fighterJet.flyLeft = false
      break;
    // up arrow
    case 38: fighterJet.flyUp = false;
      break;
    // right arrow
    case 39: fighterJet.flyRight = false;
      break;
    // down arrow
    case 40: fighterJet.flyDown = false;
      break;
    // spacebar
    case 32: fighterJet.fire = false;

        //Remove me!!!
        for (let i = 0; i < enemies.length; i++) {
          const enemy = enemies[i];
          enemy.fire = false;
        }
      break;

  }

})

if (useStars) {
  for (let i = 0; i < 100; i++) {
    let myStar = new Star(Math.random() * container.width, Math.random() * container.width, Math.random() * 5, Math.random() * 2, Math.random())
  }
}


window.time = 0;
// Game loop
var gameInterval = setInterval(function () {
  window.time += 1;
  console.log(window.time)
  if (useStars) {
    if (window.time % 30 === 0) {
      let myStar = new Star(Math.random() * container.width, 0, Math.random() * 5, Math.random() * 2, Math.random() * 5)
      // (left, top, size, brightness, speed)
    }
  }
if (enemies.length <= 2) {
  for (let i = 1; i < 3; i++) {
    var enemy = new FighterJet(1000 / i, 700 - (i * 50), 100, 100, 5, 5, 20, 100, true)
  }
}
  if (window.time % 300 === 0) {
    let obstacle = new Obstacle(rockBasic, Math.random() * container.width)
  }


  if (useStars) {
    var starElements = Array.from(document.getElementsByClassName('star'));
  }
  let explosionContainerArray = Array.from(document.getElementsByClassName('explosionContainer'));


  //bullets
  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i]
    if (bullet.collided) {
      if (bullet.type === 'primary') {
        bullet.element.remove()
        bullets.splice(i, 1);
        i -= 1;
        continue;
      } else if (bullet.type === 'secondary') {
        bullet.soundCollision.play();
        Explosion(bullet.left, bullet.top, window.time, 2, 'cyan', 10, 10, 50)
        bullet.element.remove()
        bullets.splice(i, 1);
        i -= 1;
        continue;
      }
    }
    updateBullet(bullet, enemies, obstacles)
  }

  //enemy bullets
  for (let i = 0; i < enemyBullets.length; i++) {
    let bullet = enemyBullets[i]
    if (bullet.collided) {
      if (bullet.type === 'primary') {
        bullet.element.remove()
        enemyBullets.splice(i, 1);
        i -= 1;
        continue;
      } else if (bullet.type === 'secondary') {
        bullet.soundCollision.play();
        Explosion(bullet.left, bullet.top, window.time, 2, 'cyan', 10, 10, 50, true)
        bullet.element.remove()
        enemyBullets.splice(i, 1);
        i -= 1;
        continue;
      }
    }
    updateEnemyBullet(bullet)
  }

  checkFire(fighterJet)

  planes.forEach(plane => {
    directionToFly(plane)
    updatePosition(plane)
  })


  //enemies
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];

    //check enemy bullets
    checkFire(enemy, true)

    if (enemy.willExplode) {
      fighterJet.score += 20;
      Explosion(container.width - enemy.left - enemy.width / 2, container.height - enemy.top - enemy.height / 2, window.time, 100, 'rgb(9, 71, 73)', 10, 50, 200)
      enemy.willExplodeSound.play();
      enemy.element.remove();
      enemies.splice(i, 1)
      i -= 1;
      continue;
    }

    if (!enemy.lineOfFire) {
      if (Math.abs((container.width - enemy.left - enemy.width / 2) - fighterJet.left) < 50) {
        enemy.flyLeft = false;
        enemy.flyRight = false;
      } else {
        if (fighterJet.left < container.width - enemy.left - enemy.width / 2) {
          enemy.flyLeft = false;
          enemy.flyRight = true;
        } else {
          enemy.flyRight = false;
          enemy.flyLeft = true;
        }
      }
    }

    if (!bullets.length) {
      enemy.lineOfFire = false;
      //collision detector
      document.getElementsByClassName('hitbox')[0].style.backgroundColor = 'red';
    }

    directionToFly(enemy)
    updatePosition(enemy)
  }

  //obstacles
  for (let i = 0; i < obstacles.length; i++) {
    let obstacle = obstacles[i];
    if (obstacle.willExplode) {
      fighterJet.score += 5;
      Explosion(container.width - obstacle.left - obstacle.width / 2, container.height - obstacle.top - obstacle.height / 2, window.time, 20, 'rgb(100, 100, 100)', 10, 20, 100)
      obstacle.sound.play();
      obstacle.element.remove();
      obstacles.splice(i, 1)
      i -= 1;
      continue;
    }
    updateObstacle(obstacle)
  }


  //player collisions
  fighterJetCollisions(enemies, 'enemies')
  fighterJetCollisions(obstacles)


  //update player health
  if (fighterJet.currentHealth <= 0 && !fighterJet.hasExploded) {
    Explosion(fighterJet.left - fighterJet.width / 2, fighterJet.top - fighterJet.height / 2, window.time, 20, 'rgb(255, 255, 200)', 8, 300, 2000);
    fighterJet.hasExploded = true;
    fighterJet.element.remove();
    fighterJet = false;
    setTimeout(function() {
      gameOver.style.opacity = 1;
    }, 3000)

  }

  let playerHealthColor = fighterJet.currentHealth / fighterJet.maxHealth > 0.7 ? "lime" : fighterJet.currentHealth / fighterJet.maxHealth > 0.3 ? "yellow" : "red";
  playerHealthMeter.style.width = fighterJet.currentHealth / fighterJet.maxHealth * 100 + '%';
  playerHealthMeter.style.backgroundColor = playerHealthColor;


  if (useStars) {
    updateStarPosition(starElements)
  }


  updateExplosionParticles(explosionContainerArray)

  scoreNumber.textContent = fighterJet.score;

}, 1000 / 60)


const explosionColors = ['red','red'];

function updateExplosionParticles(explosionContainerArray) {
  for (let i = 0; i < explosionContainerArray.length; i++) {
    Array.from(explosionContainerArray[i].children).forEach(function(piece, index) {

      piece.left += piece.directionLeft * (index/piece.distanceLeft)/ (window.time - explosionContainerArray[i].time + 1);
      piece.bottom += piece.directionBottom * (piece.trajectory * piece.distanceBottom) / (window.time - explosionContainerArray[i].time + 1);
      piece.style.left = piece.left + 'px';
      piece.style.bottom = piece.bottom + 'px';
      piece.opacity -= 0.008;
      piece.style.opacity = piece.opacity;
      if (piece.opacity < -0.5) {
        piece.remove();
      }
    })

  }
}

function Explosion(left, top, time, size, color, distanceLeft, distanceBottom, particles, enemyBullet) {
  let explosionContainer = document.createElement('div');
  explosionContainer.time = time;
  explosionContainer.classList.add('explosionContainer');
  explosionContainer.style.height = size + 'px';
  explosionContainer.style.left = left + 'px';
  explosionContainer.style.top = top + 'px';
  for (let i = 0; i < particles; i++) {
    let explosionPiece = document.createElement('div');
    explosionPiece.directionLeft = Math.random() > 0.5 ? 1 : -1;
    explosionPiece.directionBottom = Math.random() > 0.5 ? 1 : -1;
    explosionPiece.left = 0;
    explosionPiece.distanceLeft = distanceLeft
    explosionPiece.distanceBottom = distanceBottom
    explosionPiece.trajectory = Math.random();
    explosionPiece.classList.add('explosionPiece');
    explosionPiece.bottom = i * (size / particles);
    explosionPiece.style.bottom = explosionPiece.bottom + 'px'
    explosionPiece.style.backgroundColor = color;
    explosionPiece.opacity = Math.random();
    explosionContainer.appendChild(explosionPiece)
  }
  if (enemyBullet) {
    enemyContainer.appendChild(explosionContainer)
  } else {
    container.appendChild(explosionContainer)
  }

}
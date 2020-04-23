const stars = [];

function updateStarPosition(starElements) {
  for (let i = 0; i < starElements.length; i++) {
    let star = starElements[i];

    if (stars[i] && (stars[i].top > container.height)) {
      stars.splice(i, 1)
      star.remove();
      i -= 1;
      continue;
    }
    if (stars[i]) {
      stars[i].top += stars[i].speed;
      star.style.top = stars[i].top + 'px';
      star.style.left = stars[i].left + 'px';
    }
  }
}

function Star(left, top, size, brightness, speed) {
  this.left = left;
  this.top = top;
  this.size = size;
  this.brightness = brightness;
  this.speed = speed;
  this.element = document.createElement('div');
  this.element.classList.add('star');
  this.element.style.height = size + 'px';
  this.element.style.top = top + 'px';
  this.element.style.width = size + 'px';
  this.element.style.filter = `brightness(${brightness})`;
  container.appendChild(this.element)
  stars.push(this)
}

document.querySelectorAll('.grid-item').forEach(item => {
  item.addEventListener('click', () => {
    // Rotate the image
    const currentRotation = item.style.transform.match(/rotateY\((\d+)deg\)/);
    const currentAngle = currentRotation ? parseInt(currentRotation[1]) : 0;
    const newRotation = `rotateY(${currentAngle + 90}deg)`;
    item.style.transform = newRotation + ' scale(1.1)';
    setTimeout(() => {
      item.style.transform = newRotation + ' scale(1)';
    }, 150);

    const clickSound = document.getElementById('clickSound');
    clickSound.currentTime = 0; // Rewind to the start
    clickSound.play();
  });
});

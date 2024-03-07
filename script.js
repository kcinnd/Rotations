document.querySelectorAll('.grid-item').forEach(item => {
  item.addEventListener('click', () => {
    const currentRotation = item.style.transform.match(/rotateY\((\d+)deg\)/);
    const currentAngle = currentRotation ? parseInt(currentRotation[1]) : 0;
    const newRotation = `rotateY(${currentAngle + 90}deg)`;
    item.style.transform = newRotation + ' scale(1.1)';
    setTimeout(() => {
      item.style.transform = newRotation + ' scale(1)';
    }, 150);
  });
});

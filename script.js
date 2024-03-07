document.querySelectorAll('.grid-item').forEach(item => {
  item.addEventListener('click', () => {
    const currentRotation = item.style.transform;
    const newRotation = `rotateY(${currentRotation.replace(/\D/g,'') * 1 + 90}deg)`;
    item.style.transform = newRotation;
  });
});

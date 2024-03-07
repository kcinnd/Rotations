document.querySelectorAll('.grid-item').forEach(item => {
  item.addEventListener('click', () => {
    const currentRotation = item.style.transform.match(/rotate\((\d+)deg\)/);
    const currentAngle = currentRotation ? parseInt(currentRotation[1], 10) : 0;
    // Increment the rotation angle by 90 degrees
    const newRotation = `rotate(${currentAngle + 90}deg)`;
    // Apply the new rotation angle to the transform style
    item.style.transform = newRotation;
  });

    const clickSound = document.getElementById('clickSound');
    clickSound.currentTime = 0; // Rewind to the start
    clickSound.play();
  });
});

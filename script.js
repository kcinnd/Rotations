document.addEventListener('DOMContentLoaded', () => { // Ensures the DOM is fully loaded before attaching event listeners
  const clickSound = document.getElementById('clickSound'); // Get the audio element once

  document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('click', () => {
      // Check and extract the current rotation angle from the style
      const currentRotation = item.style.transform.match(/rotate\((\d+)deg\)/);
      const currentAngle = currentRotation ? parseInt(currentRotation[1], 10) : 0;

      // Increment the rotation angle by 90 degrees
      const newRotation = `rotate(${currentAngle + 90}deg)`;
      item.style.transform = newRotation;

      // Play the click sound
      if (clickSound) {
        clickSound.currentTime = 0; // Rewind to the start
        clickSound.play();
      }
    });
  });
});

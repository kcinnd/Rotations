document.addEventListener('DOMContentLoaded', () => { // Ensures the DOM is fully loaded
  const clickSound = document.getElementById('clickSound'); // Get the audio element

  document.querySelectorAll('.grid-item').forEach(item => {
    // Apply a random rotation to each grid item when the page loads
    const randomRotation = Math.floor(Math.random() * 4) * 90; // 0, 90, 180, or 270 degrees
    item.style.transform = `rotate(${randomRotation}deg)`;

    item.addEventListener('click', () => {
      // Extract the current rotation angle from the transform style
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

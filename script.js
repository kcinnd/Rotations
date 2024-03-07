document.addEventListener('DOMContentLoaded', () => { 
  // Get the audio element
  const clickSound = document.getElementById('clickSound');

  // Apply a random rotation to each grid item when the page loads
  document.querySelectorAll('.grid-item').forEach(item => {
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

  // Initialize the first tab as active on page load
  document.querySelector('.tab-button').click();

  // Tab switching functionality
  window.openTab = (evt, tabName) => {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tabContent => {
      tabContent.style.display = 'none';
    });

    // Remove the "active" class from all tab buttons
    document.querySelectorAll('.tab-button').forEach(tabButton => {
      tabButton.classList.remove('active');
    });

    // Show the current tab's content and highlight the tab button as active
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.classList.add('active');
  };
});

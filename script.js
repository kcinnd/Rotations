document.addEventListener('DOMContentLoaded', () => { 
  const clickSound = document.getElementById('clickSound');
  const modal = document.getElementById("congratsModal");
  const span = document.getElementsByClassName("close-button")[0];

  // Close the modal when the (x) button is clicked
  span.onclick = function() {
    modal.style.display = "none";
  };

  // Close the modal when clicking outside of it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Track rotations for each grid item
  const rotations = {};

  document.querySelectorAll('.grid-item').forEach((item, index) => {
    const randomRotations = Math.floor(Math.random() * 4); // 0 to 3 random rotations
    rotations[index] = randomRotations; // Store initial rotations
    const initialRotation = 90 * randomRotations;
    item.style.transform = `rotate(${initialRotation}deg)`;

    item.addEventListener('click', () => {
      rotations[index] = (rotations[index] + 1) % 4; // Update the rotation count modulo 4
      const newRotation = 90 * rotations[index];
      item.style.transform = `rotate(${newRotation}deg)`;

      // Play the click sound
      if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
      }

      // Check if the puzzle is solved after each click
      checkPuzzleCompletion();
    });
  });

  function checkPuzzleCompletion() {
    const isSolved = Object.values(rotations).every(rot => rot === 0); // Check if all rotations are back to initial state
    if (isSolved) {
      document.getElementById('tab2').classList.remove('locked');
      modal.style.display = "block";
    }
  }

  // Initialize the first tab as active on page load
  document.querySelector('.tab-button').click();

  // Tab switching functionality
  window.openTab = (evt, tabName) => {
    document.querySelectorAll('.tab-content').forEach(tabContent => {
      tabContent.style.display = 'none';
    });

    document.querySelectorAll('.tab-button').forEach(tabButton => {
      tabButton.classList.remove('active');
    });

    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.classList.add('active');
  };
});

document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const modal = document.getElementById("congratsModal");
  const span = document.getElementsByClassName("close-button")[0];
  const gridItems = document.querySelectorAll('.grid-item');

  // Initialize and randomize each grid item's state
  gridItems.forEach(item => {
    const randomState = Math.floor(Math.random() * 4); // Random initial state (0-3)
    item.dataset.state = randomState.toString(); // Store the state
    applyRotation(item); // Apply the rotation based on the state
  });

  // Set up click event for each grid item
  gridItems.forEach(item => {
    item.addEventListener('click', () => {
      const currentState = parseInt(item.dataset.state);
      const newState = (currentState + 1) % 4; // Move to the next state
      item.dataset.state = newState.toString(); // Update the state
      applyRotation(item); // Apply the new rotation

      // Play click sound
      if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
      }

      // Check if the puzzle is solved
      if (checkPuzzleCompletion()) {
        document.getElementById('tab2').classList.remove('locked');
        modal.style.display = "block";
      }
    });
  });

  // Function to apply rotation based on the item's state
  function applyRotation(item) {
    const state = parseInt(item.dataset.state);
    const rotationDegrees = state * 90; // Calculate rotation degrees
    item.style.transform = `rotate(${rotationDegrees}deg)`; // Apply rotation
  }

  // Function to check if all grid items are in their original state
  function checkPuzzleCompletion() {
    return Array.from(gridItems).every(item => item.dataset.state === "0");
  }

  // Modal close handlers
  span.onclick = () => modal.style.display = "none";
  window.onclick = event => { if (event.target == modal) modal.style.display = "none"; };

  // Open the first tab on load
  openTab(null, 'puzzle1');
});

// Function to manage tab switching
function openTab(evt, tabName) {
  document.querySelectorAll('.tab-content').forEach(tabContent => tabContent.style.display = 'none');
  document.querySelectorAll('.tab-button').forEach(tabButton => tabButton.classList.remove('active'));

  document.getElementById(tabName).style.display = 'block';
  const targetButton = evt ? evt.currentTarget : document.querySelector(`.tab-button[onclick="openTab(event, '${tabName}')"]`);
  targetButton.classList.add('active');
}

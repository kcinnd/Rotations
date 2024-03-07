document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const modal = document.getElementById("congratsModal");
  const span = document.getElementsByClassName("close-button")[0];
  const gridItems = document.querySelectorAll('.grid-item');

  // Close modal handlers
  span.onclick = function() { modal.style.display = "none"; };
  window.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; } };

  gridItems.forEach((item) => {
    // Assign a random initial rotation (0, 90, 180, or 270 degrees) and set it as a data attribute
    const initialRotation = Math.floor(Math.random() * 4) * 90;
    item.style.transform = `rotate(${initialRotation}deg)`;
    item.dataset.rotation = initialRotation;

    item.addEventListener('click', () => {
      // Update rotation on click and store the new value in the data attribute
      const newRotation = (parseInt(item.dataset.rotation) + 90) % 360;
      item.style.transform = `rotate(${newRotation}deg)`;
      item.dataset.rotation = newRotation;

      // Play the click sound
      if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
      }

      // Check puzzle completion after each click
      checkPuzzleCompletion();
    });
  });

  function checkPuzzleCompletion() {
    // The puzzle is solved when all items are rotated back to their original orientation (0 degrees)
    const isSolved = Array.from(gridItems).every(item => parseInt(item.dataset.rotation) % 360 === 0);
    if (isSolved) {
      document.getElementById('tab2').classList.remove('locked');
      modal.style.display = "block";
    }
  }

  // Function to open tabs
  openTab(null, 'puzzle1');
});

function openTab(evt, tabName) {
  // Tab content and button visibility handling
  document.querySelectorAll('.tab-content').forEach(tabContent => tabContent.style.display = 'none');
  document.querySelectorAll('.tab-button').forEach(tabButton => tabButton.classList.remove('active'));

  document.getElementById(tabName).style.display = 'block';
  const targetButton = evt ? evt.currentTarget : document.querySelector(`.tab-button[onclick="openTab(event, '${tabName}')"]`);
  targetButton.classList.add('active');
}

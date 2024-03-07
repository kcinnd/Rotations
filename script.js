document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const modal = document.getElementById("congratsModal");
  const span = document.getElementsByClassName("close-button")[0];
  const gridItems = document.querySelectorAll('.grid-item');

  // Close modal handlers
  span.onclick = () => modal.style.display = "none";
  window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

  gridItems.forEach(item => {
    // Assign a random initial rotation (0, 90, 180, 270 degrees)
    const initialRotation = Math.floor(Math.random() * 4) * 90;
    item.style.transform = `rotate(${initialRotation}deg)`;
    item.dataset.rotation = initialRotation; // Store the current rotation

    item.addEventListener('click', () => {
      // Increment the rotation by 90 degrees on click
      const newRotation = (parseInt(item.dataset.rotation) + 90) % 360;
      item.dataset.rotation = newRotation;
      item.style.transform = `rotate(${newRotation}deg)`;

      // Play the click sound
      if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
      }

      // Check if all items are back to their original orientation
      if (checkPuzzleCompletion(gridItems)) {
        document.getElementById('tab2').classList.remove('locked');
        modal.style.display = "block";
      }
    });
  });

  // Open Puzzle 1 tab on page load
  openTab(null, 'puzzle1');
});

function checkPuzzleCompletion(items) {
  return Array.from(items).every(item => parseInt(item.dataset.rotation) % 360 === 0);
}

function openTab(evt, tabName) {
  // Tab content and button visibility handling
  document.querySelectorAll('.tab-content').forEach(tabContent => tabContent.style.display = 'none');
  document.querySelectorAll('.tab-button').forEach(tabButton => tabButton.classList.remove('active'));

  document.getElementById(tabName).style.display = 'block';
  const targetButton = evt ? evt.currentTarget : document.querySelector(`.tab-button[onclick="openTab(event, '${tabName}')"]`);
  targetButton.classList.add('active');
}

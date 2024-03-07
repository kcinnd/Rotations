document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const modal = document.getElementById("congratsModal");
  const span = document.getElementsByClassName("close-button")[0];
  const gridItems = document.querySelectorAll('.grid-item');

  span.onclick = function() { modal.style.display = "none"; };
  window.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; } };

  gridItems.forEach((item) => {
    // Set initial correct state as 0 (no rotation)
    item.dataset.correctState = 0;

    // Apply a random rotation to start
    const randomRotation = Math.floor(Math.random() * 4) * 90; // 0, 90, 180, 270
    item.dataset.currentRotation = randomRotation; // Store current rotation
    item.style.transform = `rotate(${randomRotation}deg)`;

    item.addEventListener('click', () => {
      // Update rotation on click, add 90 degrees
      let newRotation = (parseInt(item.dataset.currentRotation) + 90) % 360;
      item.dataset.currentRotation = newRotation;
      item.style.transform = `rotate(${newRotation}deg)`;

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
    // The puzzle is solved when all items are back to their correct state
    const isSolved = Array.from(gridItems).every(item => parseInt(item.dataset.currentRotation) === parseInt(item.dataset.correctState));
    if (isSolved) {
      document.getElementById('tab2').classList.remove('locked');
      modal.style.display = "block";
    }
  }

  // Open Puzzle 1 tab
  openTab(null, 'puzzle1');
});

function openTab(evt, tabName) {
  document.querySelectorAll('.tab-content').forEach(tabContent => tabContent.style.display = 'none');
  document.querySelectorAll('.tab-button').forEach(tabButton => tabButton.classList.remove('active'));

  document.getElementById(tabName).style.display = 'block';
  const targetButton = evt ? evt.currentTarget : document.querySelector(`.tab-button[onclick="openTab(event, '${tabName}')"]`);
  targetButton.classList.add('active');
}

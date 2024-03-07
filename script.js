document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const modal = document.getElementById("congratsModal");
  const span = document.getElementsByClassName("close-button")[0];
  const gridItems = document.querySelectorAll('.grid-item');

  span.onclick = function() { modal.style.display = "none"; };
  window.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; } };

  // Assuming each image starts in its correct orientation
  const correctOrientations = Array.from(gridItems).map(_ => 0);

  gridItems.forEach((item, index) => {
    let currentRotation = 0; // Track current rotation of each grid item

    item.addEventListener('click', () => {
      currentRotation = (currentRotation + 90) % 360; // Update rotation
      item.style.transform = `rotate(${currentRotation}deg)`;

      if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
      }

      // Update current orientation in the tracking array
      correctOrientations[index] = currentRotation;

      // Check puzzle completion after each click
      checkPuzzleCompletion();
    });
  });

  function checkPuzzleCompletion() {
    // Check if all current orientations match the correct orientations
    const isSolved = correctOrientations.every(orientation => orientation === 0);
    if (isSolved) {
      document.getElementById('tab2').classList.remove('locked');
      modal.style.display = "block";
    }
  }

  // Open Puzzle 1 tab directly
  openTab(null, 'puzzle1');
});

function openTab(evt, tabName) {
  document.querySelectorAll('.tab-content').forEach(tabContent => tabContent.style.display = 'none');
  document.querySelectorAll('.tab-button').forEach(tabButton => tabButton.classList.remove('active'));

  document.getElementById(tabName).style.display = 'block';
  // Activate the tab button
  if (evt) evt.currentTarget.classList.add('active');
  else document.querySelector(`.tab-button[onclick="openTab(event, '${tabName}')"]`).classList.add('active');
}

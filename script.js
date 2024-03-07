document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const modal = document.getElementById("congratsModal");
  const span = document.getElementsByClassName("close-button")[0];
  const gridItems = document.querySelectorAll('.grid-item');

  span.onclick = function() { modal.style.display = "none"; };
  window.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; } };

  gridItems.forEach(item => {
    // Initial state is 1 (no rotation). Randomly set to 1-4 (0, 90, 180, 270 degrees)
    const initialState = Math.floor(Math.random() * 4) + 1;
    item.dataset.state = initialState.toString();
    applyRotation(item);

    item.addEventListener('click', () => {
      // Cycle through states 1-4 on each click
      item.dataset.state = ((parseInt(item.dataset.state) % 4) + 1).toString();
      applyRotation(item);

      if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
      }

      checkPuzzleCompletion();
    });
  });

  function applyRotation(item) {
    const rotationDegrees = (parseInt(item.dataset.state) - 1) * 90;
    item.style.transform = `rotate(${rotationDegrees}deg)`;
  }

  function checkPuzzleCompletion() {
    const isSolved = Array.from(gridItems).every(item => item.dataset.state === "1");
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

document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const modal = document.getElementById("congratsModal");
  const span = document.getElementsByClassName("close-button")[0];
  const gridItems = document.querySelectorAll('.grid-item');

  span.onclick = () => modal.style.display = "none";
  window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

  // Initialize grid items with a random rotation class
  gridItems.forEach(item => {
    // Initialize each item's rotation count (number of clicks)
    item.dataset.rotationCount = "0";

    item.addEventListener('click', () => {
      // Increment the rotation count
      item.dataset.rotationCount = (parseInt(item.dataset.rotationCount) + 1) % 4;

      // Apply rotation based on the rotation count
      const rotationDegrees = parseInt(item.dataset.rotationCount) * 90;
      item.style.transform = `rotate(${rotationDegrees}deg)`;

function playClickSound(clickSound) {
  if (clickSound) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
}

function isPuzzleSolved(gridItems) {
  return Array.from(gridItems).every(item => item.classList.contains('rotate0'));
}

function unlockNextPuzzle() {
  document.getElementById('tab2').classList.remove('locked');
  modal.style.display = "block";
}

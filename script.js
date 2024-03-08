document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const modal = document.getElementById("congratsModal");
  // Changed to use querySelector for selecting the close button
  const span = document.querySelector(".close-button");
  const gridItems = document.querySelectorAll('.grid-item');

  gridItems.forEach(item => {
    // Assign a random initial rotation
    let initialRotationDegrees = Math.floor(Math.random() * 4) * 90;
    item.style.transform = `rotate(${initialRotationDegrees}deg)`;
    // Store the number of rotations from the original state
    item.dataset.rotationsFromOriginal = "0";

    item.addEventListener('click', () => {
      // Increment the rotation count and apply the new rotation
      let rotationsFromOriginal = (parseInt(item.dataset.rotationsFromOriginal) + 1) % 4;
      item.dataset.rotationsFromOriginal = rotationsFromOriginal.toString();
      let currentRotationDegrees = (initialRotationDegrees + rotationsFromOriginal * 90) % 360;
      item.style.transform = `rotate(${currentRotationDegrees}deg)`;

      playClickSound(clickSound);

      if (isPuzzleSolved(gridItems)) {
        unlockNextPuzzle();
      }
    });
  });

  // Attach event listener for the close button
  span.addEventListener('click', () => {
    modal.style.display = "none";
  });

  // Attach event listener for clicking outside the modal to close it
  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  openTab(null, 'puzzle1'); // Show Puzzle 1 on page load
});

function playClickSound(clickSound) {
  if (clickSound) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
}

function isPuzzleSolved(gridItems) {
  // The puzzle is solved when all items have been rotated back to their original state
  return Array.from(gridItems).every(item => parseInt(item.dataset.rotationsFromOriginal) % 4 === 0);
}

function unlockNextPuzzle() {
  document.getElementById('tab2').classList.remove('locked');
  const modal = document.getElementById("congratsModal");
  modal.style.display = "block";
}

// Define the openTab function here
function openTab(evt, tabName) {
  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }

  const tabButtons = document.getElementsByClassName("tab-button");
  for (let i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

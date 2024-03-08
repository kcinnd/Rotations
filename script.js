document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const modal = document.getElementById("congratsModal");
  const span = document.getElementsByClassName("close-button")[0];
  const gridItems = document.querySelectorAll('.grid-item');

  gridItems.forEach(item => {
    // Assign a random initial rotation (0, 90, 180, or 270 degrees)
    let initialRotationDegrees = Math.floor(Math.random() * 4) * 90;
    item.style.transform = `rotate(${initialRotationDegrees}deg)`;

    // Calculate and store the offset needed to return to the correct position
    // Since we're rotating in 90 degree increments, a 270 degree rotation is effectively -90 degrees
    let offsetToCorrectPosition = (360 - initialRotationDegrees) % 360;
    item.dataset.offsetToCorrect = offsetToCorrectPosition.toString();

    item.addEventListener('click', () => {
      // Update rotation
      let currentRotationDegrees = (parseInt(item.style.transform.match(/rotate\((\d+)deg\)/)[1]) + 90) % 360;
      item.style.transform = `rotate(${currentRotationDegrees}deg)`;

      // Update offset to correct position
      item.dataset.offsetToCorrect = ((parseInt(item.dataset.offsetToCorrect) + 270) % 360).toString();

      if (isPuzzleSolved(gridItems)) {
        unlockNextPuzzle();
      }
    });
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
  return Array.from(gridItems).every(item => {
    // Calculate the effective rotation taking into account the continuous rotation
    const match = item.style.transform.match(/rotate\((\d+)deg\)/);
    const currentRotation = match ? parseInt(match[1]) : 0;
    const offsetToCorrect = parseInt(item.dataset.offsetToCorrect);

    // The effective rotation is the current rotation plus the offset needed to return to the correct position
    // This ensures that even with continuous rotation, we can determine if the piece is in the correct orientation
    const effectiveRotation = (currentRotation + offsetToCorrect) % 360;

    // The puzzle piece is considered correctly positioned if the effective rotation is a multiple of 360
    return effectiveRotation % 360 === 0;
  });
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

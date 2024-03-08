document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const modal = document.getElementById("congratsModal");
  const span = document.querySelector(".close-button");
  const gridItems = document.querySelectorAll('.grid-item');

  gridItems.forEach(item => {
    const initialRotationDegrees = Math.floor(Math.random() * 4) * 90;
    item.style.transform = `rotate(${initialRotationDegrees}deg)`;
    item.dataset.rotation = initialRotationDegrees; // Store the cumulative rotation degrees
    item.dataset.initialRotation = initialRotationDegrees; // Store the initial rotation for checking completion

    item.addEventListener('click', () => {
      const newRotationDegrees = parseInt(item.dataset.rotation) + 90;
      item.dataset.rotation = newRotationDegrees;
      item.style.transform = `rotate(${newRotationDegrees}deg)`;

      playClickSound(clickSound);

      if (isPuzzleSolved(gridItems)) {
        unlockNextPuzzle();
      }
    });
  });

  span.addEventListener('click', () => {
    modal.style.display = "none";
  });

  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  openTab(null, 'puzzle1');
});

function playClickSound(clickSound) {
  if (clickSound) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
}

function isPuzzleSolved(gridItems) {
  return Array.from(gridItems).every(item => {
    // Parse the current total rotation and the initial rotation from the item's dataset
    const totalRotation = parseInt(item.dataset.rotation);
    const initialRotation = parseInt(item.dataset.initialRotation);

    // Calculate the net rotation by subtracting the initial rotation from the total rotation
    const netRotation = totalRotation - initialRotation;

    // Check if the net rotation is a multiple of 360, indicating the item is back in its original orientation
    return netRotation % 360 === 0;
  });
}

function unlockNextPuzzle() {
  document.getElementById('tab2').classList.remove('locked');
  modal.style.display = "block";
}

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

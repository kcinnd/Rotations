document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const modal = document.getElementById("congratsModal");
  const span = document.querySelector(".close-button");
  const gridItems = document.querySelectorAll('.grid-item');

  gridItems.forEach(item => {
    const initialRotationDegrees = Math.floor(Math.random() * 4) * 90;
    item.style.transform = `rotate(${initialRotationDegrees}deg)`;
    // Use dataset to store the cumulative rotation degrees
    item.dataset.rotation = initialRotationDegrees;

    item.addEventListener('click', () => {
      // Continuously increment rotation degrees by 90 on each click
      const newRotationDegrees = parseInt(item.dataset.rotation) + 90;
      item.dataset.rotation = newRotationDegrees; // Update the stored rotation
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

  openTab(null, 'puzzle1'); // Initialize the first tab on page load
});

function playClickSound(clickSound) {
  if (clickSound) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
}

function isPuzzleSolved(gridItems) {
  return Array.from(gridItems).every(item => {
    // Check if the rotation for each item is a multiple of 360
    return parseInt(item.dataset.rotation) % 360 === 0;
  });
}

function unlockNextPuzzle() {
  document.getElementById('tab2').classList.remove('locked');
  modal.style.display = "block";
}

function openTab(evt, tabName) {
  // OpenTab function implementation...
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

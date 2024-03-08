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
    const totalRotation = parseInt(item.dataset.rotation);
    const initialRotation = parseInt(item.dataset.initialRotation);
    
    // Adjust the total rotation by subtracting the initial rotation
    // and then normalizing it to a 360-degree cycle
    const adjustedRotation = (totalRotation - initialRotation + 360) % 360;

    // The item is considered to be in its original orientation if the adjusted rotation is 0
    return adjustedRotation === 0;
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
  
  // Check if evt is null and select the tab button based on tabName if so
  if (evt === null) {
    const tabButton = [...tabButtons].find(button => button.getAttribute('onclick') === `openTab(event, '${tabName}')`);
    if (tabButton) {
      tabButton.classList.add("active");
    }
  } else {
    evt.currentTarget.classList.add("active");
  }
}

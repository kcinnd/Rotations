document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const modal = document.getElementById("congratsModal");
  const span = document.getElementsByClassName("close-button")[0];
  const gridItems = document.querySelectorAll('.grid-item');

  span.onclick = () => modal.style.display = "none";
  window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

  gridItems.forEach(item => {
    item.dataset.rotationCount = "0";

    item.addEventListener('click', () => {
      item.dataset.rotationCount = (parseInt(item.dataset.rotationCount) + 1) % 4;
      const rotationDegrees = parseInt(item.dataset.rotationCount) * 90;
      item.style.transform = `rotate(${rotationDegrees}deg)`;
      playClickSound(clickSound);

      if (isPuzzleSolved(gridItems)) {
        unlockNextPuzzle();
      }
    });
  });

  // Call openTab for Puzzle 1 to show it upon initial page loading
  openTab(null, 'puzzle1'); // Added line to show Puzzle 1 on page load
});

function playClickSound(clickSound) {
  if (clickSound) {
    clickSound.currentTime = 0;
    clickSound.play();
  }
}

function isPuzzleSolved(gridItems) {
  return Array.from(gridItems).every(item => parseInt(item.dataset.rotationCount) % 4 === 0);
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

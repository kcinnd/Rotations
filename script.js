document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const modal = document.getElementById("congratsModal");
  const span = document.getElementsByClassName("close-button")[0];
  const gridItems = document.querySelectorAll('.grid-item');

  span.onclick = () => modal.style.display = "none";
  window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

  gridItems.forEach(item => {
    // Initialize rotation degree count
    let rotationDegree = 0;

    item.addEventListener('click', () => {
      // Increment the rotation by 90 degrees on each click
      rotationDegree += 90;
      // Apply the rotation
      item.style.transform = `rotate(${rotationDegree}deg)`;

      playClickSound(clickSound);

      if (isPuzzleSolved(gridItems)) {
        unlockNextPuzzle();
      }
    });
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
    // Extract the current rotation degree from the transform style
    const match = item.style.transform.match(/rotate\((\d+)deg\)/);
    const currentRotation = match ? parseInt(match[1]) : 0;
    // Check if the current rotation is a multiple of 360
    return currentRotation % 360 === 0;
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

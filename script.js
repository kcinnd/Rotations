document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const modal = document.getElementById("congratsModal");
  const span = document.getElementsByClassName("close-button")[0];
  const gridItems = document.querySelectorAll('.grid-item');

  span.onclick = () => modal.style.display = "none";
  window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

  // Initialize grid items with a random rotation class
  gridItems.forEach(item => initializeRotation(item));

  // Add click event listener to rotate items
  gridItems.forEach(item => {
    item.addEventListener('click', () => {
      rotateItem(item);
      playClickSound(clickSound);
      if (isPuzzleSolved(gridItems)) {
        unlockNextPuzzle();
      }
    });
  });
});

function initializeRotation(item) {
  const rotationClasses = ['rotate0', 'rotate90', 'rotate180', 'rotate270'];
  const randomIndex = Math.floor(Math.random() * rotationClasses.length);
  item.classList.add(rotationClasses[randomIndex]);
}

function rotateItem(item) {
  const rotationClasses = ['rotate0', 'rotate90', 'rotate180', 'rotate270'];
  const currentClass = item.classList.contains('rotate270') ? 'rotate270' : rotationClasses.find(cls => item.classList.contains(cls));
  const nextClass = rotationClasses[(rotationClasses.indexOf(currentClass) + 1) % rotationClasses.length];
  item.classList.replace(currentClass, nextClass);
}

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

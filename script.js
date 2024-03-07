document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const modal = document.getElementById("congratsModal");
  const span = document.getElementsByClassName("close-button")[0];

  span.onclick = function() { modal.style.display = "none"; };
  window.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; } };

  const rotations = {};

  document.querySelectorAll('.grid-item').forEach((item, index) => {
    // Initial random rotation
    const randomRotations = Math.floor(Math.random() * 4);
    rotations[index] = randomRotations * 90;  // Store in degrees
    item.style.transform = `rotate(${rotations[index]}deg)`;

    item.addEventListener('click', () => {
      rotations[index] += 90;  // Continue adding 90 degrees on each click
      item.style.transform = `rotate(${rotations[index]}deg)`;

      if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
      }

      checkPuzzleCompletion();
    });
  });

  function checkPuzzleCompletion() {
    const isSolved = Object.values(rotations).every(deg => deg % 360 === 0);
    if (isSolved) {
      document.getElementById('tab2').classList.remove('locked');
      modal.style.display = "block";
    }
  }

  // Directly call the function to display the first puzzle content
  openTab(null, 'puzzle1');
});

// Adjust openTab function to handle a potential null event argument
function openTab(evt, tabName) {
  document.querySelectorAll('.tab-content').forEach(tabContent => tabContent.style.display = 'none');
  document.querySelectorAll('.tab-button').forEach(tabButton => tabButton.classList.remove('active'));

  document.getElementById(tabName).style.display = 'block';
  if (evt) evt.currentTarget.classList.add('active');
  else document.querySelector(`.tab-button[onclick="openTab(event, '${tabName}')"]`).classList.add('active');
}

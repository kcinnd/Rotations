document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const modal = document.getElementById("congratsModal");
  const span = document.getElementsByClassName("close-button")[0];
  const gridItems = document.querySelectorAll('.grid-item');

  span.onclick = () => modal.style.display = "none";
  window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

  gridItems.forEach(item => {
    const states = ['rotate0', 'rotate90', 'rotate180', 'rotate270'];
    const randomIndex = Math.floor(Math.random() * 4); 
    item.classList.add(states[randomIndex]); // Apply initial rotation class

    item.addEventListener('click', () => {
      // Update rotation state on click
      states.forEach((state, index) => {
        if (item.classList.contains(state)) {
          item.classList.remove(state); // Remove current state class
          const nextIndex = (index + 1) % states.length; // Calculate next state index
          item.classList.add(states[nextIndex]); // Add next state class
        }
      });

      if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play();
      }

      // Check puzzle completion after each click
      if (checkPuzzleCompletion()) {
        document.getElementById('tab2').classList.remove('locked');
        modal.style.display = "block";
      }
    });
  });

  function checkPuzzleCompletion() {
    return Array.from(gridItems).every(item => item.classList.contains('rotate0'));
  }

  // Open Puzzle 1 tab
  openTab(null, 'puzzle1');
});

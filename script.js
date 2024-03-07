document.addEventListener('DOMContentLoaded', () => {
  const gridItems = document.querySelectorAll('.grid-item');

  // Assign a random class to each item representing its rotation state
  gridItems.forEach(item => {
    const rotationClasses = ['rotate0', 'rotate90', 'rotate180', 'rotate270'];
    const randomClass = rotationClasses[Math.floor(Math.random() * rotationClasses.length)];
    item.classList.add(randomClass);
  });

  // Rotate the item on click
  gridItems.forEach(item => {
    item.addEventListener('click', () => {
      rotateItem(item);
      // Check if the puzzle is solved
      if (isPuzzleSolved(gridItems)) {
        // Actions when the puzzle is solved
        console.log("Puzzle Solved!"); // Replace with your action
      }
    });
  });

  function rotateItem(item) {
    const rotationClasses = ['rotate0', 'rotate90', 'rotate180', 'rotate270'];
    const currentClass = item.classList.value.split(' ').find(cls => rotationClasses.includes(cls));
    const currentIndex = rotationClasses.indexOf(currentClass);
    const nextIndex = (currentIndex + 1) % rotationClasses.length;
    item.classList.replace(currentClass, rotationClasses[nextIndex]);
  }

  function isPuzzleSolved(items) {
    return Array.from(items).every(item => item.classList.contains('rotate0'));
  }
});

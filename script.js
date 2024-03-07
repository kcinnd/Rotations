document.addEventListener('DOMContentLoaded', () => {
  const clickSound = document.getElementById('clickSound');
  const modal = document.getElementById("congratsModal");
  const span = document.getElementsByClassName("close-button")[0];
  const gridItems = document.querySelectorAll('.grid-item');

  span.onclick = () => modal.style.display = "none";
  window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };

  gridItems.forEach(item => {
    const rotationClasses = ['rotate0', 'rotate90', 'rotate180', 'rotate270'];
    item.className = 'grid-item'; // Reset to ensure only one rotation class is present
    const randomClass = rotationClasses[Math.floor(Math.random() * rotationClasses.length)];
    item.classList.add(randomClass);

    item.addEventListener('click', () => {
      rotateItem(item, rotationClasses);
      if (isPuzzleSolved(gridItems, 'rotate0')) {
        document.getElementById('tab2').classList.remove('locked');
        modal.style.display = "block";
      }
    });
  });

  function rotateItem(item, rotationClasses) {
    const currentClassIndex = rotationClasses.findIndex(cls => item.classList.contains(cls));
    const nextClassIndex = (currentClassIndex + 1) % rotationClasses.length;
    item.classList.replace(rotationClasses[currentClassIndex], rotationClasses[nextClassIndex]);
  }

  function isPuzzleSolved(items, targetClass) {
    return Array.from(items).every(item => item.classList.contains(targetClass));
  }
});

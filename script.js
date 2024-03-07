const puzzleImages = [
    'https://i.imgur.com/RJQa6Ic.jpg',
    'https://i.imgur.com/8vzPfMB.jpg',
    'https://i.imgur.com/Y4UjuVP.jpg',
    'https://i.imgur.com/ZwyNUlo.jpg',
    'https://i.imgur.com/RWlfZGn.jpg',
    'https://i.imgur.com/UkdErW4.jpg',
    'https://i.imgur.com/1ACnY1l.jpg',
    'https://i.imgur.com/BkZsRWc.jpg',
    'https://i.imgur.com/TUa0Id5.jpg'
];

document.addEventListener('mousemove', parallax);

function parallax(e) {
  const speed = -0.05;
  const x = (window.innerWidth - e.pageX * speed) / 100;
  const y = (window.innerHeight - e.pageY * speed) / 100;

  document.body.style.backgroundPosition = `${x}px ${y}px`;
}

document.addEventListener('DOMContentLoaded', function () {
    openPuzzle('Puzzle3x3', document.getElementsByClassName('tablink')[0]);

    const puzzlePieces = document.querySelectorAll('.puzzle-piece');
    puzzlePieces.forEach((piece, index) => {
        if (index < puzzleImages.length) {
            piece.style.backgroundImage = `url('${puzzleImages[index]}')`;
        }
    });
    
    const clickSound = new Audio('sounds/click-buttons.mp3'); 
    function rotatePiece(piece) {
        let rotationDegree = piece.dataset.rotation ? parseInt(piece.dataset.rotation, 10) : 0;
        rotationDegree = (rotationDegree + 90) % 360;
        piece.style.transform = `rotate(${rotationDegree}deg)`;
        piece.dataset.rotation = rotationDegree;
        clickSound.play();
    
        // Check if the puzzle is completed after each rotation
        checkPuzzleCompletion();
    }

    // Attach click event listeners to each puzzle piece
    document.querySelectorAll('.puzzle-piece').forEach(piece => {
        piece.addEventListener('click', function () {
            rotatePiece(this);
        });
    });
});

let currentPuzzle = '';

function openPuzzle(puzzleId, element) {
    currentPuzzle = puzzleId;
    // Hide all tab content by default
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the "active" class from all tab links
    var tablinks = document.getElementsByClassName("tablink");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab content and add "active" class to the clicked tab link
    document.getElementById(puzzleId).style.display = "block";
    element.className += " active";
}

function checkPuzzleCompletion() {
    const pieces = document.querySelectorAll('.puzzle-piece');
    const isCompleted = Array.from(pieces).every(piece => {
        const rotationDegree = parseInt(piece.dataset.rotation, 10) % 360;
        return rotationDegree === 0;
    });

    if (isCompleted) {
        console.log('Puzzle Completed!'); // or any other completion indication

        // Logic to unlock the next puzzle based on the current one
        if (currentPuzzle === 'Puzzle3x3') {
            unlockNextPuzzle('Puzzle4x4');
        } else if (currentPuzzle === 'Puzzle4x4') {
            unlockNextPuzzle('Puzzle5x5');
        }
    }
}

function unlockNextPuzzle(nextPuzzleId) {
    const nextTabLink = document.querySelector(`.tablink[onclick*='${nextPuzzleId}']`);
    if (nextTabLink) {
        nextTabLink.classList.remove('locked');
        nextTabLink.disabled = false; // Remove the disabled attribute to enable the tab
    }
}

document.addEventListener('DOMContentLoaded', function () {
    openPuzzle('Puzzle3x3', document.getElementsByClassName('tablink')[0]);
    
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

function openPuzzle(puzzleId, element) {
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
        // Normalize the rotation degree to between 0 and 360
        const rotationDegree = parseInt(piece.dataset.rotation, 10) % 360;
        // Check if the piece is in its correct state (0 degrees rotation)
        return rotationDegree === 0;
    });

    if (isCompleted) {
        // Trigger any action to signify puzzle completion
        console.log('Puzzle Completed!'); // Replace this with any action you'd like to perform
        // For example, you could display a modal, alert, or transition to a 'puzzle completed' view
    }
}

document.addEventListener('DOMContentLoaded', function () {
    openPuzzle('Puzzle3x3', document.getElementsByClassName('tablink')[0]);
    
    const clickSound = new Audio('sounds/click-buttons.mp3'); 
    function rotatePiece(piece) {
        // Retrieve the current rotation from the piece's dataset
        let rotationDegree = piece.dataset.rotation ? parseInt(piece.dataset.rotation, 10) : 0;

        // Increase the rotation
        rotationDegree = (rotationDegree + 90) % 360;

        // Apply the rotation and update the dataset
        piece.style.transform = `rotate(${rotationDegree}deg)`;
        piece.dataset.rotation = rotationDegree;

        // Play the click sound
        clickSound.play();
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

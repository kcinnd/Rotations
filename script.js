document.addEventListener('DOMContentLoaded', function () {
    // Load the click sound
    const clickSound = new Audio('sounds/click-buttons.mp3'); 
    // Function to rotate a puzzle piece
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

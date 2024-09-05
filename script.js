function OnClick() {
    var menu = document.getElementById('menu');
    menu.classList.toggle('active');
}


document.getElementById('switchButtonLeft').addEventListener('click', function() {
    const leftBox = document.querySelector('.the-rest2 .left-box');
    const rightBox = document.querySelector('.the-rest2 .right-box');

    // Toggle visibility
    if (leftBox.style.display === 'none') {
        leftBox.style.display = 'block';
        rightBox.style.display = 'none';
    } else {
        leftBox.style.display = 'none';
        rightBox.style.display = 'block';
    }
});

document.getElementById('switchButtonRight').addEventListener('click', function() {
    const leftBox = document.querySelector('.the-rest2 .left-box');
    const rightBox = document.querySelector('.the-rest2 .right-box');

    // Toggle visibility
    if (rightBox.style.display === 'none') {
        rightBox.style.display = 'block';
        leftBox.style.display = 'none';
    } else {
        rightBox.style.display = 'none';
        leftBox.style.display = 'block';
    }
});


const lists = document.querySelectorAll('.sticker-container');
let selected = null; 

function setupDropListeners(box) {
    box.addEventListener("dragover", function(e) {
        e.preventDefault();
    });

    box.addEventListener("drop", function(e) {
        e.preventDefault();
        if (selected) {
            box.appendChild(selected); // Move the selected sticker to the drop box
            selected.classList.remove('dragging'); // Remove dragging animation
            selected.classList.add('splashing'); // Add the ripple animation

            // Remove splash class after animation completes (1s)
            setTimeout(() => {
                selected.classList.remove('splashing');
            }, 1000);

            selected = null; // Clear the selected variable
        }
    });
}

setupDropListeners(middleBox);
setupDropListeners(leftBox);
setupDropListeners(rightBox);

lists.forEach(list => {
    list.addEventListener("dragstart", function(e) {
        selected = e.target.closest('.sticker-container'); // Set the selected sticker

        // Reset the animation classes
        selected.classList.remove('splashing'); // In case it has ripple animation
        selected.classList.add('dragging'); // Add the heartbeat animation
    });

    // Make sure to clear the selected sticker on dragend
    list.addEventListener("dragend", function(e) {
        if (selected) {
            selected.classList.remove('dragging'); // Ensure dragging class is removed
        }
        selected = null; // Reset selected to avoid conflicts
    });
});
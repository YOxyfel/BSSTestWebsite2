function OnClick() {
    var menu = document.getElementById('menu');
    menu.classList.toggle('active');
}


document.addEventListener('DOMContentLoaded', function() {
    const leftBox = document.getElementById('leftBox');
    const rightBox = document.getElementById('rightBox');
    const middleBox = document.getElementById('middleBox');
    const checkbox = document.getElementById('toggleSelectionMode');
    const buttonLeft = document.querySelector('.button-left');
    const buttonRight = document.querySelector('.button-right');
    const stickers = document.querySelectorAll('.sticker-container');

    let selectedStickers = new Set();
    let activeStickers = new Set();
    let selected = null;

    // Switch between left and right box visibility using buttons
    document.getElementById('switchButtonLeft').addEventListener('click', function() {
        if (leftBox.style.display === 'none') {
            leftBox.style.display = 'block';
            rightBox.style.display = 'none';
        } else {
            leftBox.style.display = 'none';
            rightBox.style.display = 'block';
        }
    });

    document.getElementById('switchButtonRight').addEventListener('click', function() {
        if (rightBox.style.display === 'none') {
            rightBox.style.display = 'block';
            leftBox.style.display = 'none';
        } else {
            rightBox.style.display = 'none';
            leftBox.style.display = 'block';
        }
    });

    // Set up drop listeners for drag-and-drop functionality
    function setupDropListeners(box) {
        box.addEventListener('dragover', function(e) {
            e.preventDefault();
        });

        box.addEventListener('drop', function(e) {
            e.preventDefault();
            if (selected) {
                box.appendChild(selected);
                selected.classList.remove('dragging');
                selected.classList.add('splashing');
                setTimeout(() => {
                    selected.classList.remove('splashing');
                }, 1000);
                // After drop, set this sticker as active only if selection mode is off
                if (!checkbox.checked) {
                }
                selected = null;
            }
        });
    }

    setupDropListeners(middleBox);
    setupDropListeners(leftBox);
    setupDropListeners(rightBox);

    stickers.forEach(list => {
        list.addEventListener('dragstart', function(e) {
            selected = e.target.closest('.sticker-container');
            selected.classList.remove('splashing');
            selected.classList.add('dragging');
        });

        list.addEventListener('dragend', function() {
            if (selected) {
                selected.classList.remove('dragging');
            }
            selected = null;
        });
    });

    // Function to toggle selection of stickers (mark them without moving)
    function toggleStickerSelection(sticker) {
        if (selectedStickers.has(sticker)) {
            sticker.style.border = '1px solid white'; // Remove selection highlight
            selectedStickers.delete(sticker); // Remove from the selected set
        } else {
            sticker.style.border = '2px solid red'; // Highlight sticker as selected
            selectedStickers.add(sticker); // Add to the selected set
        }
        // Set active stickers to all selected ones
        setActiveStickers(Array.from(selectedStickers));
    }

    // Set active stickers (used to highlight all selected stickers when selection mode is on)
    function setActiveStickers(stickers) {
        // Remove active highlight from all previously selected stickers
        activeStickers.forEach(sticker => {
            sticker.style.border = '1px solid white';
        });
        activeStickers = new Set(stickers);

        // Add a blue border to highlight all currently active (selected) stickers
        activeStickers.forEach(sticker => {
            sticker.style.border = '2px solid blue'; // Blue border indicates active state
        });
    }

    // Disable dragging if selection mode is enabled
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            stickers.forEach(sticker => {
                sticker.setAttribute('draggable', 'false'); // Disable drag in selection mode
            });
        } else {
            stickers.forEach(sticker => {
                sticker.setAttribute('draggable', 'true'); // Enable drag outside selection mode
            });
            // Reset all active stickers when selection mode is turned off
            activeStickers.forEach(sticker => {
                sticker.style.border = '1px solid white';
            });
            selectedStickers.clear();
            activeStickers.clear();
        }
    });

    // Sticker click event for selection or default movement
    stickers.forEach(sticker => {
        sticker.addEventListener('click', function() {
            if (checkbox.checked && this.parentElement === middleBox) {
                // If selection mode is enabled, mark the sticker without moving it
                toggleStickerSelection(sticker);
            } else if (!checkbox.checked) {
                // Move the sticker to the middle box if selection mode is off
                middleBox.appendChild(sticker); // Set the moved sticker as the only active one
            }
        });
    });

    // Move active stickers to the left box
    buttonLeft.addEventListener('click', function() {
        if (checkbox.checked) {
            // Move all active stickers to the left box
            activeStickers.forEach(sticker => {
                if (sticker.parentElement === middleBox) {
                    leftBox.appendChild(sticker);
                } else if (sticker.parentElement === rightBox) {
                    middleBox.appendChild(sticker);
                }
                
            });
        }
    });

    // Move active stickers to the right box or middle box
    buttonRight.addEventListener('click', function() {
        if (checkbox.checked) {
            // Move all active stickers to the right box or middle box
            activeStickers.forEach(sticker => {
                if (sticker.parentElement === middleBox) {
                    rightBox.appendChild(sticker);
                } else if (sticker.parentElement === leftBox) {
                    middleBox.appendChild(sticker);
                }
            });
        }
    });

    // Clear selected stickers when new ones are moved
    selectedStickers.clear();
});

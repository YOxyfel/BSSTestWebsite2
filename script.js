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
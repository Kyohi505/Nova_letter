document.addEventListener('DOMContentLoaded', () => {
    const heartButton = document.querySelector('.heart');
    const modal = document.querySelector('#password-modal');
    const letter = document.getElementById('letter');
    const letterContent = document.getElementById('letter-content')
    const backButton = document.getElementById('back-button');

    let isDragging = false;
    let offset = { x: 0, y: 0 };
    let isEnlarged = false; // Flag to check if the letter is enlarged

    heartButton.addEventListener('click', () => {
        document.querySelector('.envelope-wrapper').classList.add('flap');
        setTimeout(() => {
            modal.classList.add('show');
        }, 1500);
    });

    letter.addEventListener('mousedown', (e) => {
        if (!isEnlarged) { // Only allow dragging if not enlarged
            isDragging = true;
            offset.x = e.clientX - letter.getBoundingClientRect().left;
            offset.y = e.clientY - letter.getBoundingClientRect().top;
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging && !isEnlarged) { // Only move if dragging and not enlarged
            letter.style.left = `${e.clientX - offset.x}px`;
            letter.style.top = `${e.clientY - offset.y}px`;
            letter.style.position = 'absolute';
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging && !isEnlarged) {
            isDragging = false;
            letter.classList.add('letter-enlarged');
            letter.style.position = 'fixed';
            letter.style.left = '50%';
            letter.style.top = '50%';
            letter.style.transform = 'translate(-50%, -50%)';
            letter.style.width = '11.5in'; // New width
            letter.style.height = '7in'; // New height
            backButton.style.display = 'block';
            letterContent.style.display = 'block';
            isEnlarged = true; // Set flag to true when enlarged
            showStickers(); // Show stickers when letter is enlarged
        }
    });

    backButton.addEventListener('click', () => {
        letter.classList.remove('letter-enlarged');
        letter.style.position = 'absolute';
        letter.style.left = '';
        letter.style.top = '';
        letter.style.transform = '';
        letter.style.width = ''; // Reset width to default
        letter.style.height = ''; // Reset height to default
        backButton.style.display = 'none';
        letterContent.style.display = 'none';
        document.querySelector('.envelope-wrapper').classList.remove('flap');
        hideStickers(); // Hide stickers when letter is not enlarged
        isEnlarged = false; // Reset flag when back button is clicked
    });

    function showStickers() {
        const stickers = document.querySelectorAll('.sticker');
        stickers.forEach(sticker => sticker.style.display = 'block');
    }

    function hideStickers() {
        const stickers = document.querySelectorAll('.sticker');
        stickers.forEach(sticker => sticker.style.display = 'none');
    }
});

function checkPassword() {
    const password = document.getElementById('password').value.trim();
    const resultDiv = document.getElementById('result');
    const correctPassword = 'Iloveu';
    const wrongImageUrl = 'mali.jpeg';
    const correctImageUrl = 'tama.jpeg';

    if (password === correctPassword) {
        resultDiv.innerHTML = `<img src="${correctImageUrl}" alt="Correct Password">`;
        setTimeout(() => {
            document.querySelector('#password-modal').classList.remove('show');
            document.querySelector('#letter').style.cursor = 'grab';
        }, 2000);
    } else {
        resultDiv.innerHTML = `<img src="${wrongImageUrl}" alt="Wrong Password">`;
        const wrongPasswordSound = document.getElementById('wrong-password-sound');
        wrongPasswordSound.play();
    }
}


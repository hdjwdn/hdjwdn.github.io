document.addEventListener("DOMContentLoaded", () => {
    // Typing effect
    const typingText = document.getElementById("typing-text");
    const text = typingText.innerText;
    typingText.innerText = '';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            typingText.innerText += text.charAt(index);
            index++;
            setTimeout(type, 100); // Adjust typing speed here
        }
    }
    
    type();

    //Menu
    var menuIcon = document.querySelector('.icon-menu i');
    var dropdownMenu = document.querySelector('.dropdown-menu');
    
    menuIcon.addEventListener('click', function () {
        if (dropdownMenu.classList.contains('hidden')) {
            dropdownMenu.classList.remove('hidden');
            dropdownMenu.classList.add('show');
        } else {
            dropdownMenu.classList.remove('show');
            dropdownMenu.classList.add('hidden');
        }
    });  
});


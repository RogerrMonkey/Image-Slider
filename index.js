let next = document.querySelector('.next');
let prev = document.querySelector('.prev');
let slider = document.querySelector('.Slider');
let slides = document.querySelectorAll('.slides');

next.addEventListener('click', function () {
    // Move the first slide to the end
    slider.append(slides[0]);
    slides = document.querySelectorAll('.slides'); // Update slides collection
});

prev.addEventListener('click', function () {
    // Move the last slide to the beginning
    slider.prepend(slides[slides.length - 1]);
    slides = document.querySelectorAll('.slides'); // Update slides collection
});

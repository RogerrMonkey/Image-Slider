document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const imageSlider = document.getElementById("image-slider")
    const sliderIndicators = document.getElementById("slider-indicators")
    const prevBtn = document.getElementById("prev-btn")
    const nextBtn = document.getElementById("next-btn")
    const autoPlayBtn = document.getElementById("auto-play")
    const resetBtn = document.getElementById("reset-slider")
    const imageTitle = document.getElementById("image-title")
    const imageDescription = document.getElementById("image-description")
    const slideCounter = document.getElementById("slide-counter")
  
    // Variables
    let currentIndex = 0
    let autoPlayInterval = null
    let isAutoPlaying = false
  
    // Get images from localStorage
    let images = JSON.parse(localStorage.getItem("sliderImages"))
    const usingCustomImages = localStorage.getItem("usingCustomImages") === "true"
  
    // If no images in localStorage, use default images
    if (!images || images.length === 0) {
      images = [
        {
          src: "https://raw.githubusercontent.com/RogerrMonkey/Image-Slider/refs/heads/main/resources/img1.webp",
          title: "Beautiful Nature",
          description: "A stunning landscape showcasing the beauty of nature.",
        },
        {
          src: "https://raw.githubusercontent.com/RogerrMonkey/Image-Slider/refs/heads/main/resources/img2.jpg",
          title: "Urban Landscape",
          description: "A vibrant cityscape with modern architecture.",
        },
        {
          src: "https://github.com/RogerrMonkey/Image-Slider/blob/main/resources/img3.jpg?raw=true",
          title: "Tropical Paradise",
          description: "A serene beach with crystal clear waters.",
        },
        {
          src: "https://github.com/RogerrMonkey/Image-Slider/blob/main/resources/img4.jpg?raw=true",
          title: "Majestic Mountains",
          description: "Towering mountains reaching for the sky.",
        },
        {
          src: "https://github.com/RogerrMonkey/Image-Slider/blob/main/resources/img5.jpg?raw=true",
          title: "Enchanted Forest",
          description: "A mystical forest filled with ancient trees.",
        },
      ]
      localStorage.setItem("sliderImages", JSON.stringify(images))
    }
  
    // Initialize slider
    function initSlider() {
      // Clear existing content
      imageSlider.innerHTML = ""
      sliderIndicators.innerHTML = ""
  
      // Create slides
      images.forEach((image, index) => {
        // Create slide
        const slide = document.createElement("img")
        slide.src = image.src
        slide.alt = image.title
        slide.classList.add("slide")
        if (index === currentIndex) {
          slide.classList.add("active")
        }
        imageSlider.appendChild(slide)
  
        // Create indicator
        const indicator = document.createElement("div")
        indicator.classList.add("indicator")
        if (index === currentIndex) {
          indicator.classList.add("active")
        }
        indicator.addEventListener("click", () => {
          goToSlide(index)
        })
        sliderIndicators.appendChild(indicator)
      })
  
      updateSlideInfo()
    }
  
    // Go to specific slide
    function goToSlide(index) {
      // Remove active class from current slide and indicator
      document.querySelectorAll(".slide").forEach((slide) => {
        slide.classList.remove("active")
      })
      document.querySelectorAll(".indicator").forEach((indicator) => {
        indicator.classList.remove("active")
      })
  
      // Update current index
      currentIndex = index
  
      // Add active class to new slide and indicator
      document.querySelectorAll(".slide")[currentIndex].classList.add("active")
      document.querySelectorAll(".indicator")[currentIndex].classList.add("active")
  
      updateSlideInfo()
    }
  
    // Go to next slide
    function nextSlide() {
      let newIndex = currentIndex + 1
      if (newIndex >= images.length) {
        newIndex = 0
      }
      goToSlide(newIndex)
    }
  
    // Go to previous slide
    function prevSlide() {
      let newIndex = currentIndex - 1
      if (newIndex < 0) {
        newIndex = images.length - 1
      }
      goToSlide(newIndex)
    }
  
    // Update slide information
    function updateSlideInfo() {
      const currentImage = images[currentIndex]
      imageTitle.textContent = currentImage.title
      imageDescription.textContent = currentImage.description
      slideCounter.textContent = `Slide ${currentIndex + 1} of ${images.length}`
    }
  
    // Toggle auto play
    function toggleAutoPlay() {
      if (isAutoPlaying) {
        clearInterval(autoPlayInterval)
        autoPlayBtn.innerHTML = '<i class="bi bi-play-fill"></i> Auto Play'
        isAutoPlaying = false
      } else {
        autoPlayInterval = setInterval(nextSlide, 3000)
        autoPlayBtn.innerHTML = '<i class="bi bi-pause-fill"></i> Pause'
        isAutoPlaying = true
      }
    }
  
    // Reset slider
    function resetSlider() {
      // Stop auto play if active
      if (isAutoPlaying) {
        toggleAutoPlay()
      }
  
      // Reset to first slide
      currentIndex = 0
      initSlider()
  
      // If using custom images, ask if user wants to go back to default
      if (usingCustomImages) {
        if (confirm("Do you want to reset to default images?")) {
          localStorage.setItem("usingCustomImages", "false")
          window.location.reload()
        }
      }
    }
  
    // Event listeners
    prevBtn.addEventListener("click", prevSlide)
    nextBtn.addEventListener("click", nextSlide)
    autoPlayBtn.addEventListener("click", toggleAutoPlay)
    resetBtn.addEventListener("click", resetSlider)
  
    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "ArrowRight") {
        nextSlide()
      } else if (e.key === " ") {
        // Space bar toggles auto play
        toggleAutoPlay()
      }
    })
  
    // Initialize slider
    initSlider()
  })  
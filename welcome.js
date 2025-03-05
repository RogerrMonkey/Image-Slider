document.addEventListener("DOMContentLoaded", () => {
    const uploadBtn = document.getElementById("upload-btn")
    const imageUpload = document.getElementById("image-upload")
  
    // Default images to use if no custom images are uploaded
    const defaultImages = [
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
  
    // Store default images in localStorage
    localStorage.setItem("sliderImages", JSON.stringify(defaultImages))
    localStorage.setItem("usingCustomImages", "false")
  
    // Handle image upload
    uploadBtn.addEventListener("click", () => {
      const files = imageUpload.files
  
      if (files.length === 0) {
        alert("Please select at least one image to upload.")
        return
      }
  
      if (files.length > 10) {
        alert("You can upload a maximum of 10 images.")
        return
      }
  
      const customImages = []
      let processedFiles = 0
  
      // Process each file
      Array.from(files).forEach((file, index) => {
        if (!file.type.match("image.*")) {
          alert(`File ${file.name} is not an image. Only images are allowed.`)
          return
        }
  
        const reader = new FileReader()
  
        reader.onload = (e) => {
          customImages.push({
            src: e.target.result,
            title: `Image ${index + 1}`,
            description: `Your custom image ${index + 1}`,
          })
  
          processedFiles++
  
          // When all files are processed, store them and redirect
          if (processedFiles === files.length) {
            localStorage.setItem("sliderImages", JSON.stringify(customImages))
            localStorage.setItem("usingCustomImages", "true")
            window.location.href = "slider.html"
          }
        }
  
        reader.readAsDataURL(file)
      })
    })
  })  
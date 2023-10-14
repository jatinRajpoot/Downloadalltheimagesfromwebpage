function downloadImagesLocally() {
  // Select all the image elements on the page
  var images = document.querySelectorAll('img');
  
  // Create a new JSZip instance
  var zip = new JSZip();
  
  // Counter to keep track of the number of downloaded images
  var imageCount = 0;

  // Function to download and add each image to the zip
  function addImageToZip(imageElement) {
    var imageUrl = imageElement.src;

    // Fetch the image data
    fetch(imageUrl)
      .then(function(response) {
        return response.blob();
      })
      .then(function(imageBlob) {
        // Add the image to the zip file with a unique name
        zip.file('image_' + imageCount + '.png', imageBlob);

        // Increment the image count
        imageCount++;

        // Check if all images have been added to the zip
        if (imageCount === images.length) {
          // Generate the zip file and trigger the download
          zip.generateAsync({ type: 'blob' })
            .then(function(content) {
              saveAs(content, 'images.zip');
            });
        }
      });
  }

  // Loop through the selected images and add them to the zip file
  images.forEach(function(image) {
    addImageToZip(image);
  });
}

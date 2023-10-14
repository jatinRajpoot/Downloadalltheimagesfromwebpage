// Load JSZip and FileSaver.js libraries
function loadScript(url, callback) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.onload = callback;
  document.head.appendChild(script);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.5.0/jszip.min.js', function() {
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js', function() {
    // Both libraries are now loaded
    downloadImagesLocally();
  });
});




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
        zip.file('image_' + imageCount + '.jpg', imageBlob);

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

const sharp = require("sharp");

// Function to compress image
async function compressImage(inputPath, outputPath, quality) {
  try {
    await sharp(inputPath)
      .resize(1000) // Set the desired width (maintains aspect ratio)
      .jpeg({ quality }) // Adjust the quality level as needed
      .toFile(outputPath);
    console.log("Image compressed successfully!");
  } catch (error) {
    console.error("Error compressing image:", error);
  }
}

// Usage example
const imageName = "backiee-89366.jpg";
const inputPath = "C:/Users/91635/Pictures/"+imageName;
const outputPath = "C:/Users/91635/Pictures/"+"compressed-"+imageName;
const quality = 80; // Adjust the quality level as needed

compressImage(inputPath, outputPath, quality);

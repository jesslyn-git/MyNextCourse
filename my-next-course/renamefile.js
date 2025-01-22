import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define your 20 course names (without special characters)
const courses = [
  "web-dev.jpg",
  "web-dev-1.jpg",
  "web-dev-2.jpg",
  "python-data-science.jpg",
  "python-ds-1.jpg",
  "python-ds-2.jpg",
  "ml.jpg",
  "ml-1.jpg",
  "ml-2.jpg",
  "graphic-design.jpg",
  "graphic-design-1.jpg",
  "javascript.jpg",
  "javascript-1.jpg",
  "react.jpg",
  "react-1.jpg",
  "react-2.jpg",
  "cybersecurity.jpg",
  "cybersecurity-1.jpg",
  "sql.jpg",
  "sql-1.jpg",
  "aws.jpg",
  "aws-1.jpg",
  "blockchain.jpg",
  "blockchain-1.jpg",
  "android.jpg",
  "android-1.jpg",
  "android-2.jpg",
  "ios.jpg",
  "ios-1.jpg",
  "ios-2.jpg",
  "digital-marketing.jpg",
  "digital-marketing-1.jpg",
  "ai.jpg",
  "ai-1.jpg",
  "ai-2.jpg",
  "unity.jpg",
  "unity-1.jpg",
  "devops.jpg",
  "devops-1.jpg",
  "vue.jpg",
  "vue-1.jpg",
  "vue-2.jpg",
  "ux-ui.jpg",
  "ux-ui-1.jpg",
  "big-data.jpg",
  "big-data-1.jpg",
  "networking.jpg",
  "networking-1.jpg",
];

// Define source folder (where images are stored)
const folderPath = path.join(__dirname, "public/images/courses");

// Read files in the folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  if (files.length < courses.length) {
    console.error(
      `Not enough images. Found ${files.length}, need ${courses.length}.`
    );
    return;
  }

  // Rename images sequentially
  files.forEach((file, index) => {
    if (index >= courses.length) return; // Ensure we rename only 20 images

    const ext = path.extname(file); // Get file extension (.jpg, .png, etc.)
    const oldPath = path.join(folderPath, file);
    const newPath = path.join(folderPath, `${courses[index]}${ext}`);

    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.error(`Error renaming ${file}:`, err);
      } else {
        console.log(`Renamed ${file} → ${courses[index]}${ext}`);
      }
    });
  });
});

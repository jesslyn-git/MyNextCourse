import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define your 20 course names (without special characters)
const courses = [
  "web-dev",
  "web-dev-1",
  "web-dev-2",
  "python-data-science",
  "python-ds-1",
  "python-ds-2",
  "ml",
  "ml-1",
  "ml-2",
  "graphic-design",
  "graphic-design-1",
  "javascript",
  "javascript-1",
  "react",
  "react-1",
  "react-2",
  "cybersecurity",
  "cybersecurity-1",
  "sql",
  "sql-1",
  "aws",
  "aws-1",
  "blockchain",
  "blockchain-1",
  "android",
  "android-1",
  "android-2",
  "ios",
  "ios-1",
  "ios-2",
  "digital-marketing",
  "digital-marketing-1",
  "ai",
  "ai-1",
  "ai-2",
  "unity",
  "unity-1",
  "devops",
  "devops-1",
  "vue",
  "vue-1",
  "vue-2",
  "ux-ui",
  "ux-ui-1",
  "big-data",
  "big-data-1",
  "networking",
  "networking-1",
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

    const ext = path.extname(file); // Get file extension (, .png, etc.)
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

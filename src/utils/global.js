//This file contains reusable helper functions that can be used across the entire application.
import { toast } from "react-toastify";// Import toast function from react-toastify for showing notifications
import { COLOR_MAP, DEFAULT_COLOR_TYPE } from "../constant";// Import color configuration from constant file
//  Function to download an image from a given URL
export const downloadImage = async (image) => {
  // if we don't have image url then return
  if (!image) return;// If no image URL is provided, exit function
  // Fetch the image from the URL
  const res = await fetch(image);
  // Convert response into a Blob (binary data)
  const blob = await res.blob();
  // Create a temporary URL for the blob
  const url = window.URL.createObjectURL(blob);
    // Create an anchor (<a>) element dynamically
  const a = document.createElement("a");
   // Set the href to the blob URL
  a.href = url;
   // Set file name for download
  a.download = "download.jpg"; // change file name if needed
 // Append anchor to body (required for some browsers)
  document.body.appendChild(a);
  a.click(); // Trigger click to start download
  a.remove();// Remove anchor element from DOM
  // Release memory by revoking the object URL
  window.URL.revokeObjectURL(url);
};
// Function to capitalize the first letter of a word
export const capitalizeWord = (str) => {
   // If string is empty or undefined, return nothing
  if (!str) return;
  // Convert first character to uppercase + rest of string
  return str.charAt(0).toUpperCase() + str.slice(1);
};
// Function to get CSS color classes based on type
export const getColorType = (type) => {
  // Return matching color from COLOR_MAP
  // If type not found, use default color
  return COLOR_MAP[type] || COLOR_MAP[DEFAULT_COLOR_TYPE];
};
// Function to copy content to clipboard
export const handleCopy = async (content) => {
  // If no content provided, exit function
  if (!content) return;
  try {
    // Use Clipboard API to copy text
    await window.navigator.clipboard.writeText(content);
     // Show success notification
    toast.success("Content copied");
  } catch (error) {
     // Log error if copy fails
    console.log(`Failed to copy. Error is ${error}`);
  }
};

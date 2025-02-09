import Tesseract from 'tesseract.js';

export async function performOCR(imageFile) {
  const { data } = await Tesseract.recognize(
    imageFile,
    'eng',
    { logger: m => console.log(m) }
  );
  // Basic extraction: you may need to parse the recognized text further.
  return data.text;
}

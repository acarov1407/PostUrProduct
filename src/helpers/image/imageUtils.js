import { nanoid } from "nanoid";

export async function getImageDimensions(file) {

  return new Promise(function (resolve, reject) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();

      img.onload = function () {
        const width = img.width;
        const height = img.height;

        resolve({ width, height });
      };

      img.onerror = reject;

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  })


}


export function convertImageName(imageName) {
  const format = imageName.split('.').slice(-1);
  const newName = nanoid() + '.' + format;
  return newName;
}
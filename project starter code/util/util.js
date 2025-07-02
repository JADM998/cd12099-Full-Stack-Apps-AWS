import fs from "fs";
import Jimp from "jimp";
import axios from "axios";


// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
 export async function filterImageFromURL(inputURL) {
  return new Promise(async (resolve, reject) => {
    try {
      /**
       * This line of code was obtained while searching on Udacity Knowledge Q & A while gettin the error: Could not find MIME for Buffer
       * at downloading the image of test from wikimedia.
       * 
       * Link of the specific question: https://knowledge.udacity.com/questions/1026717
       * 
       */
      const photoResponse = await axios.get(inputURL, {
        responseType: "arraybuffer"
      });
      
      if(photoResponse.status !== 200) reject({
        message: `Unable to download the photo from url ${inputURL}`,
        responseStatus: photoResponse.status,
        response: photoResponse.data
      })
      let photoBuffer;
      try{
        /**
         * I decided to conver the response.data to a Buffer object using binary to pass to a Jimp.reader.
         * I get the idea from this link: https://www.fabiofranchino.com/log/get-the-image-buffer-using-axios-and-nodejs/
         */
        photoBuffer = Buffer.from(photoResponse.data, "binary");
      }catch(error){
        reject({message: `Unable to process response from ${inputURL}`});
      }
        
      const photo = await Jimp.read(photoBuffer);
      const outpath =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(outpath, (img) => {
          resolve(outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
 export async function deleteLocalFiles(files) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}

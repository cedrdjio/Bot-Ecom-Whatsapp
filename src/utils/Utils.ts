import fs from 'fs';

export class Utils {
    convertImgTo64Bit(path:string){
        const imageBuffer = fs.readFileSync(path);
          const imageBase64 = imageBuffer.toString('base64'); 
          return imageBase64;
    }
}
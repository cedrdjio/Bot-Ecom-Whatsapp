import { Whatsapp } from '@wppconnect-team/wppconnect';
import fs from 'fs';


export class ProductController {

    constructor() { }

     createProduct(client: Whatsapp, product: any): Promise<any> {
        return new Promise((resolve, reject) => {
          const imageBuffer = fs.readFileSync(product.imagePath);
          const imageBase64 = imageBuffer.toString('base64');
          const image = `data:image/png;base64,${imageBase64}`;
      
          client.createProduct(
            product.name,
            image,
            product.description,
            product.price,
            false,
            product.url,
            product.retailerId,
            product.currency
          )
          .then((createdProduct: any) => {
            console.log('Produit créé avec succès:', createdProduct);
            resolve(createdProduct);
          })
          .catch((error: any) => {
            console.error('Erreur lors de la création du produit :', error);
            reject(error);
          });
        });
      }
}


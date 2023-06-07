import { ProductModel } from "../../models/ProductModel";
import { Utils } from "../../utils/Utils";
import { ProductService } from "../lib/ProductService";
import { Whatsapp } from '@wppconnect-team/wppconnect';

export class IProductService implements ProductService {
    constructor(){}

    create(product: ProductModel ,client:Whatsapp): void {
        client.createProduct(
          product.name,
          product.image,
          product.description,
          product.price,
          product.isHidden,
          product.url,
          product.retailerId,
          product.currency
        )
        .then((product: any) => {
          console.log('Produit créé avec succès:', product);
        })
        .catch((error: any) => {
          console.error('Erreur lors de la création du produit :', error);
        });
    }
  

}
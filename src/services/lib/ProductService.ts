import { ProductModel } from "../../models/ProductModel";
import { Whatsapp } from '@wppconnect-team/wppconnect';

export interface ProductService {
    create(product: ProductModel ,client:Whatsapp): void;
}
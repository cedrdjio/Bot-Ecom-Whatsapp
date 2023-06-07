export class ProductModel  {
    price: number;
    description: string;
    image: string;
    name: string;
    isHidden: boolean;
    url: string;
    retailerId: string;
    currency: string;

    constructor(
        price: number,
        description: string,
        image: string,
        name: string,
        isHidden: boolean,
        url: string,
        retailerId: string,
        currency: string) {
        this.price = price;
        this.description = description;
        this.image = image;
        this.name = name;
        this.isHidden = isHidden;
        this.url = url;
        this.retailerId = retailerId;
        this.currency = currency;
    }


}

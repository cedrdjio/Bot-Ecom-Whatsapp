import { create, Whatsapp, Message } from '@wppconnect-team/wppconnect';
import { SessionConfig } from './config/sessionConfig';
import { MessageController } from './controllers/messageController';
import { ProductService } from './services/lib/ProductService';
import { Utils } from './utils/Utils';
import { IProductService } from './services/core/IProductService';
import { IMessageHandlers } from './services/core/IMessageHandlers';

export class Main {
    constructor(private sessionConfig: SessionConfig,
        private utils: Utils,
        private productService: ProductService,
        private messageController: MessageController) {
        this.createClient();
    }

     createClient() {
        create(this.sessionConfig.getSessionParam())
            .then((client) => this.start(client))
            .catch((error) => console.log(error));
    }

     start(client: Whatsapp) {
        const imageBase64 = this.utils.convertImgTo64Bit('./src/assets/images/produit1.jpg');
        // Créer le produit
        this.productService.create({
            price: 79.0,
            description: `**Ecotaxe incluse** : 1.45 € TTC
        **Structure** : fer
        **Assise et dossier** : mousse polyuréthane 25 kg/m³
        **Recouvrement** : tissu 100% polyester
        **Pieds (à fixer)**: fer laqué noir`,
            image: `data:image/jpg;base64,${imageBase64}`,
            name: 'Chaise BIXBY',
            isHidden: false,
            url: 'https://wa.me/c/23762019768',
            retailerId: 'CH001',
            currency: 'XAF',
        }, client);

        // Événement de réception de message
        client.onMessage((message) => {
            console.log(message);
            this.messageController.handleMessage(client, message);
        });
    }
}
// Créez les instances des dépendances nécessaires
const sessionConfig = new SessionConfig();
const messageHandlers = new IMessageHandlers();
const utils = new Utils();
const productService = new IProductService();
const messageController = new MessageController(messageHandlers);

// Créez une instance de la classe Main en fournissant les dépendances
const app = new Main(sessionConfig, utils, productService, messageController);





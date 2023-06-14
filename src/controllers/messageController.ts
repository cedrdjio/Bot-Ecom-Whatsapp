import { Whatsapp, Message  } from '@wppconnect-team/wppconnect';
import { MessageHandlers } from '../services/lib/MessageHandlers';
import OlydisPayService from '../services/lib/OlydisPayService';

export class MessageController {

    private isFirstMessage: boolean = true;
    private readonly messageHandlers!: MessageHandlers;
    constructor(private payService: OlydisPayService) { }

    handleMessage(client: Whatsapp, message: Message) {
            const lowerCaseMessage = message.body.toLowerCase();
            if (lowerCaseMessage === 'bonjour') {
                this.sendWelcomeMessage(client, message);
            } else if (message.type=='order') {
                this.processCart(client, message);
            } else {
                this.sendErrorMessage(client, message);
            }
    }
    
    private sendWelcomeMessage(client: Whatsapp, message: Message) {
        const welcomeMessage ="Bienvenue ! Merci d'avoir choisi notre bot. 😊 \n\nQue puis-je faire pour vous ? \nSi vous souhaitez découvrir notre catalogue, cliquez sur le bouton ci-dessous. 👇\n Passer votre commande ici : https://wa.me/c/237620197689";
        client.sendText(message.from,welcomeMessage);
    }

    private async processCart(client: Whatsapp,message: Message) {
        const response = await this.payService.makePayment( {
            amount: 1000,
            reference: '123456',
            description: 'Règlement de la commande numéro 123456 d\'un montant de 1000 fcfa',
            siteUrl: 'https://api.whatsapp.com/send?phone=237620197689', // Remplacez XXXXXXXXX par le numéro de téléphone cible
        });
        const firstMessage ="Merci! pour votre commande. 😊 \n\n cliquez sur le bouton ci-dessous pour procede au paiement. 👇\n "+response;
        
        client.sendText(message.from,firstMessage);
    }

    private sendErrorMessage(client: Whatsapp,  message: Message) {
        const errorMessage = `Désolé, je n'ai pas compris votre demande. Veuillez réessayer.`;
        client.sendText(message.from,errorMessage);
    }
}

export default MessageController;
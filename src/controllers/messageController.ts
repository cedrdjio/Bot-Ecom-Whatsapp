import { Whatsapp, Message } from '@wppconnect-team/wppconnect';
import { MessageHandlers } from '../services/lib/MessageHandlers';
import { IMessageHandlers } from '../services/core/IMessageHandlers';

export class MessageController {

    constructor(private messageHandlers: IMessageHandlers) { }

    handleMessage(client: Whatsapp, message: Message) {
        if (message.body.toLowerCase() === 'bonjour') {
            this.messageHandlers.sendWelcomeMessage(client, message.from);
        } else if (message.body.toLowerCase() === 'produits') {
            this.messageHandlers.sendProductList(client, message.from);
        } else if (message.body.startsWith('choisir ')) {
            const productId = message.body.substring(8);
            this.messageHandlers.processProductSelection(client, message.from, productId);
        } else if (message.body.toLowerCase() === 'paiement') {
            this.messageHandlers.requestPaymentInformation(client, message.from);
        } else if (message.body.toLowerCase() === 'facture') {
            this.messageHandlers.sendInvoice(client, message.from);
        } else {
            this.messageHandlers.sendErrorMessage(client, message.from);
        }
    }
}

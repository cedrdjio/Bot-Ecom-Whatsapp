import { Whatsapp } from '@wppconnect-team/wppconnect';

export interface MessageHandlers {
  sendWelcomeMessage(client: Whatsapp, recipient: string): void;
  sendProductList(client: Whatsapp, recipient: string): void;
  processProductSelection(client: Whatsapp, recipient: string, productId: string): void;
  requestPaymentInformation(client: Whatsapp, recipient: string): void;
  sendInvoice(client: Whatsapp, recipient: string): void;
  sendErrorMessage(client: Whatsapp, recipient: string): void;
  }

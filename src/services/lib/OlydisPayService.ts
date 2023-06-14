import { OrderData } from "../../models/OrderData";
import { TokenResponse } from "../../models/TokenResponse";

export interface OlydisPayService {
    getToken(): Promise<TokenResponse> ;
    saveOrderData(token: string, orderData: OrderData): Promise<string>;
    makePayment(orderData:OrderData):Promise<string>;
}
export default OlydisPayService;

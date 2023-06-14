import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import dotenv from 'dotenv';
import OlydisPayService from '../lib/OlydisPayService';
import { TokenResponse } from '../../models/TokenResponse';
import { OrderData } from '../../models/OrderData';
import { IncomingMessage } from 'http';

class IOlydisPayService implements OlydisPayService {

    private readonly baseUrl: string;

    constructor() {
        dotenv.config();
        this.baseUrl = 'http://app.dev.olydis.io/opssahara';
    }
    
    public async  getToken(): Promise<TokenResponse> {
        const url = `${this.baseUrl}/gateway/api/token`;
      
        const data = JSON.stringify({
            "apiUser": "b7cdab3b-fcef-4e98-95f3-e7ba0c2ddd59",
            "apiKey": "84099963-2fac-4582-b76f-3c878c2337ed"
          });
          
        const config: AxiosRequestConfig = {
          method: 'post',
          maxBodyLength: Infinity,
          url: url,
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };
      
        try {
          const response = await axios.request(config);
          return response.data as TokenResponse;
        } catch (error) {
          console.error('Error fetching token:', error);
          throw new Error(String(error));
        }
      }
    
    public async saveOrderData(token: string, orderData: OrderData): Promise<string> {
        const url = `${this.baseUrl}/urequest/gateway/api/saveOrderData`;

        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        };

        try {
            const response: AxiosResponse = await axios.post(url, orderData, config);
            return response.data;
        } catch (error) {
            console.error('Error saving order data:', error);
            throw new Error('An error occurred while saving the order data.');
        }
    }
    public async makePayment(orderData: OrderData): Promise<string> {
        try {
            const token: string = (await this.getToken()).accessToken;
            console.log('Token:', token);
            const response: string = await this.saveOrderData(token, orderData);
            console.log('Response:', response);
            return response;
        } catch (error) {
            console.error('Error:', error);
            throw new Error(String(error));
        }
    }


}

export default IOlydisPayService;

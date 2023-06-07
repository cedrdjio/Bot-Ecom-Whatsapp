import { CreateOptions} from '@wppconnect-team/wppconnect';
import fs from 'fs';


export class SessionConfig {

    constructor() { }

     getSessionParam():CreateOptions{
        return {
            session: 'my-session',
            catchQR: (base64Qrimg: any, asciiQR: any, attempts: any, urlCode: any) => {
                console.log('Number of attempts to read the qrcode: ', attempts);
                console.log('Terminal qrcode: ', asciiQR);
                console.log('base64 image string qrcode: ', base64Qrimg);
                console.log('urlCode (data-ref): ', urlCode);
            },
            statusFind: (statusSession: any, session: any) => {
                console.log('Status Session: ', statusSession);
                console.log('Session name: ', session);
            },
            onLoadingScreen: (percent: any, message: any) => {
                console.log('LOADING_SCREEN', percent, message);
            },
            useChrome: true,
            logQR: true
        }
    }
}

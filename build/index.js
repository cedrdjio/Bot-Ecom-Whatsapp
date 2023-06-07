"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var wppconnect_1 = require("@wppconnect-team/wppconnect");
var fs_1 = __importDefault(require("fs"));
var sessionCfg = {
    session: 'my-session',
    catchQR: function (base64Qrimg, asciiQR, attempts, urlCode) {
        console.log('Number of attempts to read the qrcode: ', attempts);
        console.log('Terminal qrcode: ', asciiQR);
        console.log('base64 image string qrcode: ', base64Qrimg);
        console.log('urlCode (data-ref): ', urlCode);
    },
    statusFind: function (statusSession, session) {
        console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
        //Create session wss return "serverClose" case server for close
        console.log('Session name: ', session);
    },
    onLoadingScreen: function (percent, message) {
        console.log('LOADING_SCREEN', percent, message);
    },
    useChrome: true,
    logQR: true
};
// Création de la session et connexion à WhatsApp
(0, wppconnect_1.create)(sessionCfg)
    .then(function (client) { return start(client); })
    .catch(function (error) { return console.log(error); });
// Fonction principale pour gérer les événements WhatsApp
function start(client) {
    // Définir les détails du produit
    var price = 79.00;
    var description = "**Ecotaxe incluse** : 1.45 \u20AC TTC\n    **Structure** : fer\n    **Assise et dossier** : mousse polyur\u00E9thane 25 kg/m\u00B3\n    **Recouvrement** : tissu 100% polyester\n    **Pieds (\u00E0 fixer)**: fer laqu\u00E9 noir";
    var image = 'https://cocktail-scandinave.fr/wp-content/uploads/2023/04/NIWECH3-amb.jpg';
    var name = 'Chaise BIXBY';
    var isHidden = false;
    var url = "https://wa.me/c/23762019768";
    var retailerId = 'CH001';
    var currency = 'XAF';
    // Créer le produit
    client.createProduct(name, image, description, price, isHidden, url, retailerId, currency)
        .then(function (product) {
        console.log('Produit créé avec succès:', product);
    })
        .catch(function (error) {
        console.error('Erreur lors de la création du produit :', error);
    });
    // Événement de réception de message
    client.onMessage(function (message) {
        console.log(message);
        handleMessage(client, message);
    });
}
// Gestion des différents types de messages
function handleMessage(client, message) {
    if (message.body.toLowerCase() === 'bonjour') {
        sendWelcomeMessage(client, message.from);
    }
    else if (message.body.toLowerCase() === 'produits') {
        sendProductList(client, message.from);
    }
    else if (message.body.startsWith('choisir ')) {
        var productId = message.body.substring(8);
        processProductSelection(client, message.from, productId);
    }
    else if (message.body.toLowerCase() === 'paiement') {
        requestPaymentInformation(client, message.from);
    }
    else if (message.body.toLowerCase() === 'facture') {
        sendInvoice(client, message.from);
    }
    else {
        sendErrorMessage(client, message.from);
    }
}
// Envoyer un message de bienvenue
function sendWelcomeMessage(client, recipient) {
    return __awaiter(this, void 0, void 0, function () {
        var welcomeMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    welcomeMessage = 'Bienvenue sur notre boutique en ligne !';
                    client.sendText(recipient, welcomeMessage);
                    return [4 /*yield*/, client
                            .sendImageAsStickerGif('237676107393@c.us', './src/assets/images/37270-robot-says-hi.gif')
                            .then(function (result) {
                            console.log('Result: ', result); //return object success
                        })
                            .catch(function (erro) {
                            console.error('Error when sending: ', erro); //return object error
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
// Envoyer la liste des produits
function sendProductList(client, recipient) {
    var productList = 'Voici notre liste de produits :\n\n1. Produit 1\n2. Produit 2\n3. Produit 3\n';
    client.sendText(recipient, productList);
}
// Traiter la sélection du produit
function processProductSelection(client, recipient, productId) {
    // Effectuer les actions appropriées en fonction de l'ID du produit sélectionné
    // Par exemple, enregistrer le produit sélectionné dans une variable ou une base de données
    var confirmationMessage = "Vous avez s\u00E9lectionn\u00E9 le produit ".concat(productId, ". Veuillez fournir vos informations de paiement en tapant \"paiement\".");
    client.sendText(recipient, confirmationMessage);
}
// Demander les informations de paiement
function requestPaymentInformation(client, recipient) {
    var paymentMessage = 'Veuillez fournir les informations de paiement (par exemple : nom, adresse, méthode de paiement) :';
    client.sendText(recipient, paymentMessage);
}
// Envoyer la facture
function sendInvoice(client, recipient) {
    // Générer la facture en fonction des informations de paiement et des produits sélectionnés
    var invoice = 'Voici votre facture :\n\nProduit : Produit 1\nPrix : 10€\n\nTotal : 10€';
    // Envoyer la facture sous forme de fichier
    var invoiceFileName = 'facture.txt';
    fs_1.default.writeFileSync(invoiceFileName, invoice);
    client.sendFile(recipient, invoiceFileName, 'Facture');
    fs_1.default.unlinkSync(invoiceFileName); // Supprimer le fichier après l'envoi
}
// Envoyer un message d'erreur en cas de commande invalide
function sendErrorMessage(client, recipient) {
    var errorMessage = 'Désolé, nous n\'avons pas compris votre demande. Veuillez réessayer ou contacter notre service client.';
    client.sendText(recipient, errorMessage);
}

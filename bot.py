import requests
import json

def send_whatsapp_message(phone_number, message):
    # Paramètres d'authentification
    api_key = "VOTRE_CLE_API"
    api_secret = "VOTRE_SECRET_API"
    
    # URL de l'API WppConnect pour l'envoi de message
    url = "https://wppconnect.io/api/v1/message/send"
    
    # Création du payload de la requête
    payload = {
        "phone": phone_number,
        "message": message
    }
    
    # Ajout des paramètres d'authentification au header de la requête
    headers = {
        "Content-Type": "application/json",
        "x-api-key": api_key,
        "x-api-secret": api_secret
    }
    
    # Envoi de la requête POST à l'API
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    
    # Vérification du statut de la réponse
    if response.status_code == 200:
        print("Message WhatsApp envoyé avec succès.")
    else:
        print("Échec de l'envoi du message WhatsApp. Code d'erreur :", response.status_code)

# Exemple d'utilisation
phone_number = "+237651732195"
message = "Bonjour ! C'est un message envoyé depuis l'API WppConnect."
send_whatsapp_message(phone_number, message)

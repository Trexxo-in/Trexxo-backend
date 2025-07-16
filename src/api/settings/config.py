import firebase_admin
from firebase_admin import credentials, db
from firebase_admin import storage
from datetime import datetime
import uuid


cred = credentials.Certificate('../token/firebase_token.json')

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://trexxo-4fb77-default-rtdb.firebaseio.com',
    'storageBucket': 'trexxo-4fb77.firebasestorage.app'
})


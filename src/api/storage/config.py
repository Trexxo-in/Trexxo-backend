import firebase_admin
from firebase_admin import credentials, db
from firebase_admin import storage
from datetime import datetime
import uuid
from settings.config import *



print("Firebase Admin SDK initialized! Ready to upload. ✨")

def upload_image_admin_sdk(buffer:bytes, destination_blob_name: str='trexxo-driver',content_type:str='image/png',ext:str='png'):
    """
    Uploads a file to Firebase Storage using the Firebase Admin SDK.

    Args:
        local_file_path: The full path to the image file on your local system.
        destination_blob_name: The desired path and filename for the image in Firebase Storage
                                (e.g., 'user_photos/profile_pic.jpg').
    """
    try:
        bucket = storage.bucket() # Get the default storage bucket for your Firebase project

        # Create a "blob" (which is what a file is called in Cloud Storage) reference
        # with the desired path and name inside your bucket.
        blob = bucket.blob(f"{destination_blob_name}/{datetime.now()}.{ext}")
        
        token = uuid.uuid4()

        # Upload the file from your local path to the blob
        blob.upload_from_string(buffer, content_type=content_type)
        blob.metadata = {"firebaseStorageDownloadTokens": str(token)}
        blob.patch()

        print(f"🎉 Success! File is uploaded to '{destination_blob_name}' in Firebase Storage.")
        download_url = f"https://firebasestorage.googleapis.com/v0/b/{bucket.name}/o/{blob.name.replace('/', '%2F')}?alt=media&token={token}"

        print("Download URL:", download_url)
        return download_url

    except Exception as e:
        print(f"❌ Oh no! An error occurred during upload: {e}")
        return None




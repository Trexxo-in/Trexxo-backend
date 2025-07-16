from datetime import datetime
from enum import Enum
import os
import time
from uuid import uuid4
from fastapi import Body, FastAPI, File,Request, UploadFile
from fastapi.responses import JSONResponse
import magic
from starlette.formparsers import MultiPartParser
from storage.config import upload_image_admin_sdk
from model.schema import Driver, DriverDocumentsUpdate
from model.db import driverRef
# from schema import Driver
app=FastAPI()
# @app.middleware()
# def route():
UPLOAD_DIR = "trexxo-driver"
MultiPartParser.max_part_size= 5 * 1024 * 1024

class ItemType(str, Enum):
        electronics = "electronics"
        clothing = "clothing"
        books = "books"


@app.get('/')
def health():
    """
    
    Check health of api

    """
    return {"status":200 }


@app.post('/v1/driver/create/{driver_id}')
async def create_driver(driver_id:str,driver: Driver):
    """
     Create a driver entry in Firebase using provided driver_id and driver data
    """
    
    driverRef.child(driver_id).set(driver.model_dump(mode="json"))
    return {
      "id":driver_id,
       "driver":driver.model_dump(mode="json")  
    }

@app.patch('/driver/upload/{driver_id}')
async def upload_docs(
    driver_id: str,
    docs_type:DriverDocumentsUpdate,
    file: UploadFile
):
    """
    Upload document file and update driver data
    """
    content =await file.read()
    if file._in_memory:
         mime_type = magic.from_buffer(content, mime=True) 
         ext=mime_type.split('/')[1]
         link=upload_image_admin_sdk(content,UPLOAD_DIR,mime_type,ext)

         driverRef.child(driver_id).update(
              {
                   f"{docs_type.value}":link,
                   "updated_at": datetime.utcnow().isoformat()
              }
         )
         return JSONResponse(
              status_code=200,
              content={
                   "status_code":200,
                   "message":f"{docs_type.value} is uploaded successfully"
              }
         )
         
    else:
         return JSONResponse(
              status_code=404,
              content={
                   "status_code":404,
                   "message":f"{docs_type.value} is required Maximum 5 Mb"
              }
         )

@app.get("/items/")
async def get_items(item_type: ItemType):
    return {"item_type": item_type}
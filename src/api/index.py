from fastapi import FastAPI,Request
from typing import Optional
app=FastAPI()
# @app.middleware()
# def route():


@app.get('/')
def init():
    return {"status":200 }



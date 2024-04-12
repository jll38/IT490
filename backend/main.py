import uvicorn
import ssl
import os
ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain('./cert.pem', keyfile='./key.pem')

if __name__ == '__main__':
    if os.getenv('ENVIRONMENT') == 'production':
        uvicorn.run("app.app:app", host="0.0.0.0", port=8000, reload=True,
                    ssl_keyfile='./key.pem', ssl_certfile='./cert.pem')
    else:
        uvicorn.run("app.app:app", host="0.0.0.0", port=8000, reload=True,)

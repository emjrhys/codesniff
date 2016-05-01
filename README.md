# codesniff


### Client

To start the dev server run this command while in the client folder:

```
gulp dev
```

This will start the webpack dev server on http://localhost:8080/webpack-dev-server/index.html


### Server

To start the back end Django server run this command while in the codesniff folder:

```
python manage.py runserver
```
#### API Endpoints
See documentation at: http://localhost:8000/docs/

#### Authentication
- To get the user's token, post to http://localhost/api-token-auth/. Post the username and password of the user. 
- To include the token in a request, include it in the request header. The header is "Authorization" and the value is "Token {put token here}"



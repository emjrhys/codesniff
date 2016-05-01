# codesniff


### Client

To start the dev server run this command while in the client folder:

```
gulp dev
```

This will start the webpack dev server on http://localhost:8080/webpack-dev-server/index.html


### API
####Authentication
- To get the user's token, post to http://127.0.0.1:8000/api-token-auth/. Post the username and password of the user. 
- To include the token in a request, include it in the request header. The header is "Authorization" and the value is "Token {put token here}"

####Endpoints
The base url is:
`http://127.0.0.1:8000/app/` 

Endpoints | Actions | Notes 
--- | --- | --- 
users | GET | Gets list of all users. <br> #####Query parameters: <br>
username: the username of the user you want returned<br> `Ex: http://127.0.0.1:8000/app/users?username=Hanna`
 | POST | Create a new user. Post the username, email, and password.
users/:id | GET | Get details of specified user. 
 | POST | Partially update a user. 
 | PUT | Replace entire user with supplied user. 
 | DELETE | Delete specified user 
users/me | GET | Gets current logged-in user's id, username, email, and list of submitted code snippets.
codes | GET | Gets list of all code snippets. <br> #####Query parameters: <br>title: the title of the code snippet <br> 
language: the language of the code snippet (Java, C, etc) <br> 
username: the username of the creator of the code snippet <br>
date_added: the date added of the code snippet
 | POST | Create a new code snippet. Post the title, content, language, creator, and difficulty.
codes/:id | GET | Get details of specified code snippet. 
 | POST | Partially update a code snippet. 
 | PUT | Replace entire code snippet with supplied code snippet.
 | DELETE | Delete specified code snippet.
codesmells | GET | Gets list of all code smells. <br> Query parameters: code, username, line, smell <br> Note: The parameter "code" is a code snippet's id. 
 | POST | Create a new code snippet. Post the title, content, language, creator, and difficulty.
codes/:id | GET | Get details of specified code snippet. 
 | POST | Partially update a code snippet. 
 | PUT | Replace entire code snippet with supplied code snippet.
 | DELETE | Delete specified code snippet.

Note: For the user fields in the models, username can be used in GET request queries but user id needs to be used in POST requests. For the code fields in the models, code id needs to be used in both GET request queries and POST requests


- http://127.0.0.1:8000/app/codesmells/ returns a list of all codesmells 
- http://127.0.0.1:8000/app/codesmells/{id} returns the specific codesmell with id {id} 
- http://127.0.0.1:8000/app/scores/ returns all a list of all scores
- http://127.0.0.1:8000/app/scores/{id} returns the specific score with id {id}
- http://127.0.0.1:8000/app/submit/ to submit a new code snippet with a list of codesmells together. See example post request body: 
```
{
    "creator" : 1,
	"code" : {
		"title" : "Third Code Snippet!",
		"content" : "print \"Hello Friends\" \n sum = 3+4",
		"language" : "Python"
	},
	"smells" : [{"line": 1, "smell": "Vague string"}, {"line": 2, "smell": "Bad variable name"}]
}
```
- http://127.0.0.1:8000/app/checksmells/ to submit a list of code snippets and check it against the original uploader's code snippets to calculate a score for the user. See example post request body. The value for "code" is the code snippet's ID. 
```
{
    "user" : 1,
	"code" : 1,
	"smells" : [{"line": 1, "smell": "Vague string"}, {"line": 2, "smell": "Bad variable name"}]
}
```

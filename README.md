# codesniff


### Client

To start the dev server run this command while in the client folder:

```
gulp dev
```

This will start the webpack dev server on http://localhost:8080/webpack-dev-server/index.html


URls (No Token)
- http://127.0.0.1:8000/app/users/ returns a list of all users (should probably get rid of this later)
- http://127.0.0.1:8000/app/share/code/{id} to share a specific code snippet with id {id} regardless of the user

URLs (Required token filters all data for that specific user)
- http://127.0.0.1:8000/app/users/{id} returns user with id {id} (Will return 'Not found' if provide token of another user)
- http://127.0.0.1:8000/app/codes/ returns a list of all code snippets submitted by the user 
- http://127.0.0.1:8000/app/codes/{id} returns a single code snippet with id {id}
- http://127.0.0.1:8000/app/code/{code_id}/codesmells/ returns all codesmells submitted by the user for the code snippet with id {code_id} 
- http://127.0.0.1:8000/app/codesmells/{id} returns the specific codesmell with {id} (Will return 'Not found' if provide token of user who did not submit that codesmell)
- http://127.0.0.1:8000/app/code/{code_id}/scores/ returns all scores for code snippet with id {code_id} for the user
- http://127.0.0.1:8000/app/scores{id} returns the specific score with id {id}(Will return 'Not found' if provide token of user who did not receive that score)
- http://127.0.0.1:8000/app/submit/ to submit a new code snippet with a list of codesmells together
- http://127.0.0.1:8000/app/checksmells/ to submit a list of code snippets and check it against the original uploader's code snippets to calculate a score for the user
- http://127.0.0.1:8000/app/share/code/{id} to share a specific code snippet 
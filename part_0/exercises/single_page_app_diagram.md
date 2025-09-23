
sequenceDiagram
  participant browser
  participant server

  browser ->> server: GET 
https://studies.cs.helsinki.fi/exampleapp/spa
  activate server
  server ->> browser: HTML document
  deactivate server

  browser ->> server: GET 
https://studies.cs.helsinki.fi/exampleapp/main.css
  server activated
  server ->> browser: CSS file
  server deactivated

  browser ->> server: GET 
https://studies.cs.helsinki.fi/exampleapp/spa.js
  server activated
  server ->> browser: JS file
  server deactivated

   browser ->> server: GET 
https://studies.cs.helsinki.fi/exampleapp/data.json
server activated
  server ->> browser: content [ {
        "content": "radda radda",
        "date": "2025-09-22T23:45:47.243Z"
    },...]
  server deactivated

  Note right of browser: The browser executes the callback function that renders the notes

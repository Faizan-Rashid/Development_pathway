``` mermaid
sequenceDiagram
  participant browser
  participant server

  browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
  activate server
  server ->> browser: html document
  deactivate server

  Note right of browser: the browser sends the data in the payload/body of request object and server recieves it. server creates and if no error has location set to '/exampleapp/notes
' meaning it want the browser to redirect to https://studies.cs.helsinki.fi/exampleapp/notes

  browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/notes
  activate server
  server ->> browser: HTML document
  deactivate server

  browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  server ->> browser: CSS file
  deactivate server

  browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
  activate server
  server ->> browser: JS file
  deactivate server

  Note right of browser: the browser executes the javascript sent by the server.

  browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server ->> browser: data in JSON i.e  [{
        "content": "after_burner",
        "date": "2025-09-23T09:28:11.565Z"
    }, ...]
  deactivate server

  Note right if browser: the browser then executes remaining JS that dynamically renders li elements with data in them 

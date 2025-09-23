sequenceDiagram
  participant browser
  participant server

  browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
  activate server
  server ->> browser: HTML document (302 redirect with Location header)
  deactivate server

  Note right of browser: Browser sends data in request body (payload).
  Note right of server: Server responds with Location: /exampleapp/notes.
  Note right of browser: Browser follows the redirect to /exampleapp/notes.

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

  Note right of browser: Browser executes the JavaScript sent by the server.

  browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server ->> browser: JSON data e.g. [{ "content": "after_burner", "date": "2025-09-23T09:28:11.565Z" }, ...]
  deactivate server

  Note right of browser: Browser executes remaining JS to dynamically render <li> elements with the data.


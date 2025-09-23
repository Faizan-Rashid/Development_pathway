sequenceDiagram
  participant browser
  participant server

  browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
  activate server
  server ->> browser: JSON data
  deactivate server

  Note right of browser: the server does not redirect and browser renders the data send to the server on the UI

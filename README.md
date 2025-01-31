# SimpleChat-Server

This simple web application chat build with expressjs.
This application related to the [Pokedex-API](https://github.com/masnat/pokedex-api.git) repository to get random pokemon when user send message. No websocket implemented

## Configuration

- Create the `.env` file that contain:
  ```sh
      user="postgres"
      password=""
      host="localhost"
      database="expnext_chat"
      port=5432
  ```

## Instalation

```bash
#install the requirement modules
npm install express cors body-parser dotenv pg axios
```

## Usage

```bash
# run the server
node server.js
```

### Running Rest-API

- get all chats [GET] `http://localhost:5000/api/chats`
- send chat [POST] `http://localhost:5000/api/chats`
  ```js
      {
          senderName: 'senderName',
          receiverName: 'receiverName',
          message: message
      }
  ```

# `novachess` 0.0.0 WebSocket protocol
This document outlines the `novachess` WebSocket protocol for chess games.

## Purpose
`novachess` uses WebSockets to facilitate bidirectional communication between the high-performance Rust backend and the easy-to-program TSX frontend during chess games.

## Location
The WebSocket portal for games is located at `<location of backend server>/game`.

## General Packet Details
Each package sent in either direction follows the following format:

```
{
  "id": <packet ID>,
  "cmd": <command>,
  "data": {
    ... // command data
  }
}
```

Each packet is sent with a unique ID (0-based), and the command signifies the type of packet it is. Additional data is provided after the ID and command as needed.
Each packet sent by either side should be acknoledged by the recieving side with the `acknowledge` cmd. 
This `acknowledge` command needs an extra value in the `data` section, `aid`, to identify the message acknowledged.
`acknowledge` commands do not need to be acknowledged.
As an example:

Packet sent by server:
```json
{
  "id": 0,
  "cmd": "keep-alive",
  "data": {}
}
```

Packet sent in response by client:
```json
{
  "id": 1,
  "cmd": "acknowledge",
  "data": {
    "aid": 0
  }
}
```
## Good practices
- If the server requests to change a variable/cookie, change it BEFORE acknowledging the request.

## Client-to-server commands
### `logon_account`
This command is the first command that should be sent from the client right after establishing connection with the WebSocket, if the user is logged in.

The packet takes the form of:
```
{
  "id": <id>,
  "cmd": "logon_account",
  "data": {
    "uid": <user ID>
  }
}
```

### `logon_anon`
This command is the first command that should be sent from the client right after establishing connection with the WebSocket if the user is anonymous.

Format:
```
{
  "id": <id>,
  "cmd": "logon_anon",
  "data": {}
}
```

### `request_game_vs_user`
This command tells the backend that the user wishes to request a game against a random person.

Data sent:
- `ratingrange: object` The rating range that the user wants to play with
  - `low: number` Lowest acceptable Elo
  - `high: number` Highest acceptable Elo
- `timecontrol: object` Time control
  - `start: number` Start value (seconds)
  - `increment: number` Increment (seconds)
  - `delay: number` Delay (seconds)

For example, if a user wishes to play a 1 | 1 blitz game with another user who is rated 1500-2000 Elo in blitz, this packet would be sent:
```json
{
  "id": 2,
  "cmd": "request_game_vs_user",
  "data": {
    "ratingrange": {
      "low": 1500,
      "high": 2000
    },
    "timecontrol": {
      "start": 60, // 1 minute -> 60 seconds
      "increment": 1,
      "delay": 0
    }
  }
}
```

## Server-to-client commands
### `server_err`
This command is sent by the server if it errors. It passes a `msg`, or a message to display to the user, and a `debug_msg`, or a message to print to the 
console.

Format:
```
{
  "id": <id>,
  "cmd": "err",
  "data": {
    "msg": <msg>,
    "debug_msg": <debug_msg>
  }
}
```

### `assign_temp_id`
This command is sent by the server after a `logon_anon` request. It passes a `temp_id`, or a temporary UID to store as a browser cookie which should be deleted after the game ends.

Format:
```
{
  "id": <id>,
  "cmd": "assign_temp_id",
  "data": {
    "temp_id": <temporary User ID>
  }
}  
```

### `game_found`
This command is sent by the server upon finding a suitable game that the user requested.

Format:
```
{
  "id": <id>,
  "cmd": "game_found",
  "data": {
    "opponent": { // user data for quick loading
      "username": <opponent username>,
      "rating": <opponent rating> 
    },
    "elo_change": {
      "win" : <change in Elo if the user wins>,
      "draw": <change in Elo if the user draws>,
      "lose": <change in Elo if the user loses>
    },
    "play": <color to play; 1 for white and 0 for black>,
    "game_id": <game ID, used for keeping track of the game>
  }
}
```

### `opponent_moves`

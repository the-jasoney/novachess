// Protocol Implementation for Novachess in Typescript

export enum Result {
  Continue = 0,
  Checkmate = 1,
  Stalemate = 2,
  Repetition = 3,
  InsufficientMaterial = 4,
  FiftyMoveRule = 5
};

export type Move = {
  from: number,
  to: number,
  captures: boolean,
  castles: boolean,
  result: Result,
};

export enum Color {
  White = 1,
  Black = 0,
};

/** 
 * Packet which signifies to the server that the user wishes to request a game against another user. 
 * Direction: client->server
 */
export type RequestGameVsUserPacket = {
  id: bigint,
  cmd: 'request_game_vs_user',
  data: {
    /// Acceptable Elo rating range 
    ratingrange: {
      /// Lowest acceptable Elo
      low: number,

      /// Highest acceptable Elo
      high: number,
    },

    /// Time control
    timecontrol: {
      /// Time starting value in seconds (e.g. the X value in X|Y)
      start: bigint,

      /// Time increment in seconds (e.g. the Y value in X|Y)
      increment: bigint,

      /// The delay that each player gets before the timer starts on their side
      delay: bigint,
    },
  },
};

/** 
 * Packet which signifies to the recipient that a packet has been recieved
 * Direction: client<->server
 */
export type AcknowledgePacket = {
  id: bigint,
  cmd: 'acknowledge',
  data: {
    /// the ID of the packet acknowledged
    pid: bigint
  }
};

/**
 * Packet which tells the server that the user has opened the game menu with an account
 * Direction: client->server 
 */
export type LogonAccountPacket = {
  id: bigint,
  cmd: 'logon_account',
  data: {
    /// User ID to log in with
    uid: string
  }
};

/** 
 * Packet which tells the server that the user intends to access the game menu without an account.
 * If this anonymous user starts a game, the server should use the `AssignTempID` packet to
 * assign a temporary UID to the anonymous user.
 * Direcion: client->server
 */
export type LogonAnonymousPacket = {
  id: bigint,
  cmd: 'logon_anon',
  data: {}
};

/**
 * Packet which tells the client that a temporary user ID has been assigned for the duration of the
 * game.
 * This is sent by the server when an anonymous user starts a game.
 * Direction server->client
 */
export type AssignTempID = {
  id: bigint,
  cmd: 'assign_temp_id',
  data: {
    /// Temporary User ID that is assigned to an anonymous user during the duration of a game
    temp_id: string  
  },
}

/**
  *  A packet which signifies to the client that an error has occured within the server.
  *  Direction: server->client
  */ 
export type ServerErrPacket = {
  id: bigint,
  cmd: 'server_err',
  data: {
    /// message to display to the user
    msg: string,

    /// message to display to devs
    debug_msg: string,
  },
};

/** 
 *  Signifies to the client that a suitable game has been found.
 *  Direction: server->client
 */
export type GameFoundPacket = {
  id: bigint,
  cmd: 'game_found',
  data: {
    /// Opponent data
    opponent: {
      /// Opponent username (for quick reference)
      username: string,

      /// Opponent rating (also for quick reference)
      rating: number,

      /// Opponent User ID
      id: string,
    },

    /// Change in Elo after the game
    elo_change: {
      /// Change in Elo if the user wins
      win: number,

      /// Change in Elo if the user draws
      draw: number,

      /// Change in Elo if the user loses
      loss: number,
    },

    /// What side the user needs to play
    play: Color,
    
    /// The game ID as stored in the DB
    game_id: string,
  },
};

/** 
 *  Signifies to the client that it is the user's turn to make a move, giving the user all moves available. 
 *  Direction: server->client
 */
export type UserMakeMovePacket = {
  id: bigint,
  cmd: 'user_make_move',
  data: {
    available_moves: Move[],
  }
};

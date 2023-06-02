// Protocol Implementation for Novachess in Typescript

/**
 *  The possible results of a move.
 *  Encoded as number
 */
export enum MoveResult {
  /// No effect. Game continues
  Continue = 0,

  /// Game ends by checkmate
  Checkmate = 1,

  /// Game ends with stalemate
  Stalemate = 2,

  /// Game ends by 3-fold repetition
  Repetition = 3,

  /// Game ends with insufficient material
  InsufficientMaterial = 4,

  /// Game ends in a draw by the 50-move rule
  FiftyMoveRule = 5
};

/// Describes a castle if any
export enum Castling {
  /// Not a castling move
  None = 0,

  /// O-O
  Kingside = 1,

  /// O-O-O
  Queenside = 2
}

/** 
 *  Defines a chess vove.
 */
export type Move = {
  /// The from square (rank * 8 + file)
  from: number,

  /// The to square (rank * 8 + file)
  to: number,

  /// The capture square (rank * 8 + file), if the piece captures, else null
  captures: number | null,

  /// Castling? queenside or kingside
  castles: Castling,

  /// The result of a move
  result: MoveResult,
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
 *  Sent every 5 seconds. Signals to the client that the server intends to keep the connection intact. If the client doesn't respond within 5 more seconds, it is assumed that the connection has been terminated.
 *  Direction: server->client
 */
export type KeepAlivePacket = {
  id: bigint,
  cmd: 'keep_alive',
  data: {
    /// Information about games
    games: {
      /// Game ID
      gameid: string,

      /// Which side user plays
      userplays: Color,

      /// Which side to play
      toplay: Color,

      opponent: {
        id: string,
        username: string,
        rating: number
      }

      /// Time remaining on each side (seconds)
      clock: {
        white: number,
        black: number
      }
    }[]
  }
}

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
 * Packet which tells the server that the user has opened the game menu with an account, or has an active temporary User ID.
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
 *  Packet which tells the server that the user wishes to offer a draw
 *  Direction: client->server
 */
export type OfferDrawPacket = {
  id: bigint,
  cmd: 'offer_draw',
  data: {
    gameid: string
  }
};

/**
 *  Packet which tells the server that the user wishes to accept the opponent's draw request. The server will error if no draw request exists
 *  Direction: client->server
 */
export type AcceptDrawPacket = {
  id: bigint,
  cmd: 'accept_draw',
  data: {
    gameid: string
  }
};

/**
 *  Packet which tells the server that the user makes a move.
 *  Direction: client->server
 */
export type MovePacket = {
  id: bigint,
  cmd: 'make_move',
  data: {
    move: Move,
    gameid: string
  }
}

/**
 *  Packet which tells the server that the user wishes to decline the opponent's draw request. The server will error if no draw request exists
 *  Direction: client->server
 */
export type DeclineDrawPacket = {
  id: bigint,
  cmd: 'decline_draw',
  data: {
    gameid: string
  }
};

/**
 *  Packet which tells the server that the user wishes to resign.
 *  Direction: client->server
 */
export type ResignPacket = {
  id: bigint,
  cmd: 'resign',
  data: {
    gameid: string
  }
};

/**
 *  Packet which is used in place of `acknowledge` for logon packets. It sends data about games in progress, and such.
 *  Direction: server->client
 */
export type AcknowledgeLogonPacket = {
  id: bigint,
  cmd: 'acknowledge_logon',
  data: {
    games: {
      /// Game ID
      gameid: string,

      /// Which side user plays
      userplays: Color,

      /// Which side to play
      toplay: Color,

      opponent: {
        id: string,
        username: string,
        rating: number
      }

      /// Time remaining on each side (seconds)
      clock: {
        white: number,
        black: number
      }
    }[],
  },
};

/**
 * Packet which tells the client that a temporary user ID has been assigned for the duration of the
 * game.
 * This is sent by the server when an anonymous user starts a game.
 * Direction server->client
 */
export type AssignTempIDPacket = {
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
    gameid: string,
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
    /// A list of available moves
    available_moves: Move[],
    
    /// The Game ID
    gameid: string,

    /// Position as FEN substring
    position: string,
    
    /// Time remaining (seconds)
    timeremaining: number,
  }
};

/** 
 *  Signifies to the client that the opponent has made a move. This is usually followed up by a `UserMakeMovePacket`, if the game does not end after the opponent's move
 *  Direction: server->client
 */
export type OpponentMovePacket = {
  id: bigint,
  cmd: 'opponent_move',
  data: {
    /// The move that the opponent has made
    move: Move,

    /// The Game ID
    gameid: string,
    
    /// The result posistion as FEN substring
    position: string
  }
};

/**
 *  Signifies to the user that the opponent has resigned
 *  Direction: server->client
 */
export type OpponentResignsPacket = {
  id: bigint,
  cmd: 'opponent_resigns',
  data: {
    /// Game ID
    gameid: string,
  },
};

/**
 *  Signifies to the user that the opponent offers a draw
 *  Direction: server->client
 */
export type OpponentDrawRequestPacket = {
  id: bigint,
  cmd: 'opponent_draw_request',
  data: {
    /// Game ID
    gameid: string,
  }
};

/**
 *  Signifies to the user that the opponent has declined the draw request
 *  Direction: server->client
 */
export type OpponentDeclineDrawRequestPacket = {
  id: bigint,
  cmd: 'opponent_decline_draw_request',
  data: {
    /// Game ID
    gameid: string
  }
};

/**
 *  Signifies to the user that the opponent has accepted the draw request and the game ends
 *  Direction: server->client
 */
export type OpponentAcceptDrawRequestPacket = {
  id: bigint,
  cmd: 'opponent_accept_draw_request',
  data: {
    /// Game ID
    gameid: string
  }
};

/**
 *  Signifies to the reciever that the sender wishes to terminate the connection.
 *  Direction: server<->client
 */
export type TerminateConnectionPacket = {
  id: bigint,
  cmd: 'terminate_connection',
  data: {}
};


export type ClientSendPackets = RequestGameVsUserPacket  
                              | AcknowledgePacket
                              | LogonAccountPacket
                              | LogonAnonymousPacket
                              | OfferDrawPacket
                              | AcceptDrawPacket
                              | DeclineDrawPacket
                              | ResignPacket
                              | MovePacket
                              | TerminateConnectionPacket;

export type ClientRecievePackets = AcknowledgeLogonPacket
                                 | KeepAlivePacket
                                 | AssignTempIDPacket
                                 | ServerErrPacket
                                 | GameFoundPacket
                                 | AcknowledgePacket
                                 | UserMakeMovePacket
                                 | OpponentMovePacket
                                 | OpponentResignsPacket
                                 | OpponentDrawRequestPacket
                                 | OpponentDeclineDrawRequestPacket
                                 | OpponentAcceptDrawRequestPacket
                                 | TerminateConnectionPacket;

export type Packet = ClientSendPackets | ClientRecievePackets;

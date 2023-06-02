//!  -- A NOTE ON THESE STRUCTS COMPARED TO THE TS VERSIONS --
//!  These structs encode SOLELY the data portion. In order to
//!  encode/decode these into JSON, use the Serialize/Deserialize
//!  traits in impls.rs.

use crate::protocol::types::*;

pub struct RequestGameVsUserPacket {
    pub ratingrange: RatingRange,
    pub timecontrol: TimeControl,
}

pub struct KeepAlivePacket {
    pub games: Vec<Game>
}

pub struct AcknowledgePacket {
    pub pid: u64
}

pub struct LogonAccountPacket {
    pub uid: String
}

pub struct LogonAnonymousPacket {}

pub struct OfferDrawPacket {
    pub gameid: String
}

pub struct AcceptDrawPacket {
    pub gameid: String
}

pub struct MovePacket {
    pub r#move: Move,
    pub gameid: String
}

pub struct DeclineDrawPacket {
    pub gameid: String
}

pub struct ResignPacket {
    pub gameid: String
}

pub struct AcknowledgeLogonPacket {
    pub games: Vec<Game>
}

pub struct AssignTempIDPacket {
    pub temp_id: String
}

pub struct ServerErrPacket {
    pub msg: String,
    pub debug_msg: String
}

pub struct GameFoundPacket {
    pub opponent: QuickLoadUser,
    pub elo_change: EloChange,
    pub play: Color,
    pub gameid: String
}

pub struct UserMakeMovePacket {
    pub available_moves: Vec<Move>,
    pub gameid: String,
    pub position: String,
    pub timeremaining: f64
}

pub struct OpponentMovePacket {
    pub r#move: Move,
    pub gameid: String,
    pub position: String
}

pub struct OpponentResignsPacket {
    pub gameid: String
}

pub struct OpponentDrawRequestPacket {
    pub gameid: String
}

pub struct OpponentDeclineDrawRequestPacket {
    pub gameid: String
}

pub struct OpponentAcceptDrawRequestPacket {
    pub gameid: String
}

pub struct TerminateConnectionPacket {}

pub enum ServerSendPackets {
    AcknowledgeLogonPacket(AcknowledgeLogonPacket),
    AssignTempIDPacket(AssignTempIDPacket),
    ServerErrPacket(ServerErrPacket),
    GameFoundPacket(GameFoundPacket),
    AcknowledgePacket(AcknowledgePacket),
    UserMakeMovePacket(UserMakeMovePacket),
    OpponentMovePacket(OpponentMovePacket),
    OpponentResignsPacket(OpponentResignsPacket),
    OpponentDrawRequestPacket(OpponentDrawRequestPacket),
    OpponentDeclineDrawRequestPacket(OpponentDeclineDrawRequestPacket),
    OpponentAcceptDrawRequestPacket(OpponentAcceptDrawRequestPacket),
    TerminateConnectionPacket(TerminateConnectionPacket),
    KeepAlivePacket(KeepAlivePacket)
}

pub enum ServerRecievePackets {
    RequestGameVsUserPacket(RequestGameVsUserPacket),
    AcknowledgePacket(AcknowledgePacket),
    LogonAccountPacket(LogonAccountPacket),
    LogonAnonymousPacket(LogonAnonymousPacket),
    OfferDrawPacket(OfferDrawPacket),
    AcceptDrawPacket(AcceptDrawPacket),
    DeclineDrawPacket(DeclineDrawPacket),
    ResignPacket(ResignPacket),
    MovePacket(MovePacket),
    TerminateConnectionPacket(TerminateConnectionPacket),
}

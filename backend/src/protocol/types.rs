pub enum MoveResult {
    Continue = 0,
    Checkmate = 1,
    Stalemate = 2,
    Repitition = 3,
    InsufficientMaterial = 4,
    FiftyMoveRule = 5,
}

pub enum Castling {
    None = 0,
    Kingside = 1,
    Queenside = 2
}

pub struct Move {
    pub from: u8,
    pub to: u8,
    pub captures: Option<u8>,
    pub castling: Castling,
    pub result: MoveResult
}

pub enum Color {
    White = 1,
    Black = 0
}

pub struct RatingRange {
    pub low: u16,
    pub high: u16,
}

pub struct TimeControl {
    pub start: u32,
    pub increment: u32,
    pub delay: u32
}

pub struct Clock {
    pub white: f64,
    pub black: f64,
}

pub struct Game {
    pub gameid: String,
    pub userplays: Color,
    pub toplay: Color,
    pub opponent: QuickLoadUser,
    pub clock: Clock
}

pub struct QuickLoadUser {
    pub id: String,
    pub username: String,
    pub rating: u16
}

pub struct EloChange {
    pub win: u16,
    pub lose: u16,
    pub draw: u16
}

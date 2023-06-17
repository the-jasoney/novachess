pub struct BitBoard {
    // color bitboards
    pub n_white: u64,
    pub n_black: u64,

    // piece bitboards
    pub n_pawn: u64,
    pub n_bishop: u64,
    pub n_knight: u64,
    pub n_rook: u64,
    pub n_queen: u64,
    pub n_king: u64,

    // special bitboards
    pub n_moved: u64,
    pub n_en_passant_target: u64,
}


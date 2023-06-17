pub trait BitManipulatable {
    /// Get the bits as an array of size `BIT_SIZE`
    fn get_bits(&self) -> Vec<bool>;

    /// Get a specific bit
    fn get_bit(&self, bit: usize) -> bool;

    /// Set a specific bit
    fn set_bit(&mut self, bit: u8);

    /// Clear a specific bit
    fn clear_bit(&mut self, bit: u8);
}

impl BitManipulatable for u64 {
    fn get_bits(&self) -> Vec<bool> {
        let mut res: Vec<bool> = vec![];

        for i in 0..64 {
            res.push(((1 << i) & *self) > 0);
        }

        res
    }

    fn get_bit(&self, bit: usize) -> bool {
        (self & (1 << bit)) > 0
    }

    fn set_bit(&mut self, bit: u8) {
        *self |= 1 << bit;
    }

    fn clear_bit(&mut self, bit: u8) {
        *self &= !((1 << bit) as u64)
    }
}


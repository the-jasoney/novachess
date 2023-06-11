pub trait BitManipulatable {
    /// The size in bits
    const BIT_SIZE: usize;
    
    /// Get the bits as an array of size `BIT_SIZE`
    fn get_bits(&self) -> [bool; Self::BIT_SIZE] {
        let mut bits = [false; Self::BIT_SIZE];
    
        for i in 0..Self::BIT_SIZE {
            bits[i] = self.get_bit(i);
        }
    
        bits
    }
    
    /// Get a specific bit
    fn get_bit(&self, bit: usize) -> bool {
        // A bit mask that grabs the bit in question. Examples (u8):
        // bit = 0
        // 0b 0000 0001
        // bit = 2
        // 0b 0000 0100
        let mask = 1 << bit;
        
        // Bit in its original position. Examples (u8):
        // bit = 5, number = 0b 1010 0101
        // 0b 0010 0000
        let bit = self & mask;

        bit > 0 // if bit > 0, bit is on, else it is not
    }

    fn set_bit(&mut self, bit: u8) {
        let mask = !(1 << bit); // select everything but the 
    }

    fn clear_bit(bit: u8);
}



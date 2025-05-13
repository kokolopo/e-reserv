import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

// Fungsi untuk membuat hash password
const hashPassword = async (password) => {
  try {
    // Tentukan jumlah salt rounds (misalnya 12 rounds)
    const saltRounds = 8;

    // Generate salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Buat hash dari password dengan salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    console.error("Error saat melakukan hashing:", error);
    throw error;
  }
};

const comparePassword = async (inputPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error saat melakukan pengecekan password:", error);
    throw error;
  }
};

export { hashPassword, comparePassword };

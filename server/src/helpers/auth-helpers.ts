import bcrypt from "bcrypt";
import {
  generateRandomAvatar,
  generateRandomString,
  generateRandomUsername,
} from "./gen-helpers";

export const verifyPassword = async (password: string, hash: string) => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};

export const hashPassword = async (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string) => {
  // Password must be at least 8 characters, contain at least one number, one uppercase letter, and one special character
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  return passwordRegex.test(password);
};

export const prepareUser = async (
  email: string,
  password: string
): Promise<{ hashedPassword: string; name: string; avatarUrl: string }> => {
  const hashedPassword = await hashPassword(password);
  const name = generateRandomUsername();
  const avatarUrl = generateRandomAvatar();

  return {
    hashedPassword,
    name,
    avatarUrl,
  };
};

import type { CryptFlow } from "@types";
import * as bcrypt from 'bcryptjs';

export const generate_hash: CryptFlow['generate'] = async ({ value, salt }) => {
  const hash = await bcrypt.hash(value, salt);

  return {
    message: 'Geramos sua hash para verificação.',
    success: true,
    data: hash,
  };
};

export const gen_random_rounds: CryptFlow['genRandomRounds'] = () => {
  const min = Number(process.env.MIN_RANDOM) || 0;
  const max = Number(process.env.MAX_RANDOM) || 10;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
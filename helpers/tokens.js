import { TOKEN_ALPHABET, TOKEN_LENGTH } from "../settings/index.js";

export const createToken = () => {
  let token = '';
  for ( let i = 0; i < TOKEN_LENGTH; i++ ) {
    token += TOKEN_ALPHABET.charAt(Math.floor(Math.random() * TOKEN_ALPHABET.length));
  }
  return token;
}
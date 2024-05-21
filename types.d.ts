declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DATABASE_URL: string;
    DATABASE_URL_LOCAL: string;
    NODE_ENV: string;
    bcrypt_salt_rounds: string;
  }
}

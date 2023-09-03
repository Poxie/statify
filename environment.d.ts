declare global {
    namespace NodeJS {
      interface ProcessEnv {
        CLIENT_SECRET: string;
        CLIENT_ID: string;
        TOKEN_URL: string;
        SPOTIFY_API_URL: string;
        BACKEND_API_URL: string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}
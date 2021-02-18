declare namespace NodeJS {
    interface Process {
      /** running on server */
      isServer: boolean
    }
    interface ProcessEnv {
      /** node environment */
      DATABASE_SECRET: string
    }
  }
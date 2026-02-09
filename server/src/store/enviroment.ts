import dotenv from 'dotenv'
import { exit } from 'node:process';
dotenv.config()

export class EnvVars {
    static #instance: EnvVars;
    readonly PORT
    readonly DATABASE_URL
    readonly POSTGRES_USER
    readonly POSTGRES_DB
    readonly POSTGRES_PORT
    readonly POSTGRES_PASSWORD
    readonly NODE_ENV
    readonly JWT_SECRET
    readonly SUPABASE_URL
    readonly SUPABASE_ANON_KEY
    readonly SUPABASE_BUCKET_USERS

    private constructor() {
        try {
            this.PORT = process.env.PORT || (() => { throw new Error("PORT no definido") })();
            this.DATABASE_URL = process.env.DATABASE_URL || (() => { throw new Error("DATABASE_URL no definida") })();
            this.POSTGRES_USER = process.env.POSTGRES_USER || (() => { throw new Error("POSTGRES_USER no definido") })();
            this.POSTGRES_DB = process.env.POSTGRES_DB || (() => { throw new Error("POSTGRES_DB no definido") })();
            this.POSTGRES_PORT = process.env.POSTGRES_PORT || (() => { throw new Error("POSTGRES_PORT no definido") })();
            this.POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || (() => { throw new Error("POSTGRES_PASSWORD no definido") })();
            this.NODE_ENV = process.env.NODE_ENV || (() => { throw new Error("NODE_ENV no definido") })();
            this.JWT_SECRET = process.env.JWT_SECRET || (() => { throw new Error("JWT_SECRET no definido") })();
            this.SUPABASE_URL = process.env.SUPABASE_URL || (() => { throw new Error("SUPABASE_URL no definido") })();
            this.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || (() => { throw new Error("SUPABASE_ANON_KEY no definido") })();
            this.SUPABASE_BUCKET_USERS = process.env.SUPABASE_BUCKET_USERS || (() => { throw new Error("SUPABASE_BUCKET_USERS no definido") })();

        } catch (error: any) {
            console.error("La variable de entorno no está definida: " + error.message)
            exit(1)
        }
    }

    public static get instance(): EnvVars {
        if (!EnvVars.#instance) {
            EnvVars.#instance = new EnvVars()
        }

        return EnvVars.#instance;
    }
}

// export const env = EnvVars.instance


import { ConfigSource } from 'technician';

/**
 * A Technician ConfigSource for accessing environment variables.
 * Keys: Variable names
 * Type: string
 */
export class EnvConfigSource extends ConfigSource<string> {

    /** 
     * Reads the contents of an environment variable.
     * @see {@link ConfigSource#read}
     */
    public readSync(key: string): string | undefined {
        return process.env[key];
    }

    /**
     * Reads the contents of the entire environment.
     * @see {@link ConfigSource#readAll}
     */
    public readAllSync(): {[key: string]: string  | undefined} {
        const result: {[key: string]: string  | undefined} = {};
        for(const envVar of this.listSync()) {
            result[envVar] = this.readSync(envVar);
        }
        return result;
    }

    /**
     * Lists all environment variables.
     * @see {@link ConfigSource#readAll}
     */
    public listSync(): string[] {
        return Object.keys(process.env);
    }

}

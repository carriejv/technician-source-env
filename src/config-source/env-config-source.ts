import { ConfigSource, ConfigSourceSync } from 'technician';

/**
 * A Technician ConfigSource for accessing environment variables.
 * The EnvConfigSource uses variable names as keys and returns their values.
 */
export class EnvConfigSource implements ConfigSource, ConfigSourceSync {

    /** 
     * Reads the contents of an environment variable.
     * @see {@link ConfigSource#read}
     */
    public async read(key: string): Promise<Buffer | undefined> {
        const envVar = process.env[key];
        return envVar ? Buffer.from(envVar) : undefined;
    }

    /**
     * Reads the contents of the entire environment.
     * @see {@link ConfigSource#readAll}
     */
    public async readAll(): Promise<{[key: string]: Buffer  | undefined}> {
        const result: {[key: string]: Buffer  | undefined} = {};
        for(const envVar of this.listSync()) {
            result[envVar] = this.readSync(envVar);
        }
        return result;
    }

    /**
     * Lists the files visible to the EnvConfigSource.
     * If `recurse` is set to true, the file path relative to the `rootPath` is used as the key.
     * Keys for all visible files are included, even if they are not necessarily readable.
     * @see {@link ConfigSource#readAll}
     * @throws Will throw errors from node `fs` if `throwFSErrors` is set.
     */
    public async list(): Promise<string[]> {
        return Object.keys(process.env);
    }

    /** 
     * Reads the contents of an environment variable.
     * @see {@link ConfigSource#read}
     */
    public readSync(key: string): Buffer | undefined {
        const envVar = process.env[key];
        return envVar ? Buffer.from(envVar) : undefined;
    }

    /**
     * Reads the contents of the entire environment.
     * @see {@link ConfigSource#readAll}
     */
    public readAllSync(): {[key: string]: Buffer  | undefined} {
        const result: {[key: string]: Buffer  | undefined} = {};
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

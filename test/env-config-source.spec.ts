import { expect } from 'chai';
import { Technician } from 'technician';
import { EnvConfigSource } from '../src';

const TEST_VAR = 'ENV_CONFIG_SOURCE_TEST';
const TEST_VAL = 'This is an environment variable.'

describe('EnvConfigSource', () => {

    before('Mock an environment variable', () => {
        process.env[TEST_VAR] = TEST_VAL; 
    });

    describe('& Integration', () => {

        it('should be readable via Technician as a ConfigSource.', async () => {
            // Build and configure Technician
            const tech = new Technician(new EnvConfigSource());

            // Attempt a read through Technician
            const result = await tech.read(TEST_VAR);

            // Assertions
            expect(result).to.deep.equal(TEST_VAL);
        });

    });

    describe ('> Unit', () => {

        it('should build.', async () => {
            expect(new EnvConfigSource()).to.be.instanceOf(EnvConfigSource);
        });


        describe('#readSync', () => {

            it('should read an environment variable, returning its contents as a string.', () => {
                // Build an EnvConfigSource
                const ecs = new EnvConfigSource();

                // Read a var
                const result = ecs.readSync(TEST_VAR);

                // Assertions
                expect(result).to.deep.equal(TEST_VAL);
            });

            it('should return undefined if a variable does not exist.', () => {
                // Build an EnvConfigSource
                const ecs = new EnvConfigSource();

                // Read a var
                const result = ecs.readSync('HOPEFULLY_NOBODY_HAS_THIS_ACTUALLY_SET');

                // Assertions
                expect(result).to.equal(undefined);
            });

        });

        describe('#readAll', () => {

            it('should return all environment variables as a {key: string} object.', () => {
                // Build an EnvConfigSource
                const ecs = new EnvConfigSource();

                // Read a var
                const result = ecs.readAllSync();

                // Assertions
                expect(result[TEST_VAR]).to.deep.equal(TEST_VAL);
            });

        });

        describe('#listSync', () => {

            it('should list all environment variables.', () => {
                // Build an EnvConfigSource
                const ecs = new EnvConfigSource();

                // Read a var
                const result = ecs.listSync();

                // Assertions
                expect(result).to.contain(TEST_VAR);
            });

        });

    });

});
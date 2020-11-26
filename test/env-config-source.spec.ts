import { expect } from 'chai';
import { Technician, TechnicianSync } from 'technician';
import { EnvConfigSource } from '../src';

const TEST_VAR = 'ENV_CONFIG_SOURCE_TEST';
const TEST_VAL = 'This is an environment variable.'
const EXPECTED_CONTENTS = Buffer.from(TEST_VAL);

describe('EnvConfigSource', () => {

    before('Mock an environment variable', () => {
        process.env[TEST_VAR] = TEST_VAL; 
    });

    describe('& Integration', () => {

        it('should be readable via Technician as a ConfigSource.', async () => {
            // Build and configure Technician
            const tech = new Technician();
            tech.addSource(new EnvConfigSource());

            // Attempt a read through Technician
            const result = await tech.read(TEST_VAR);

            // Assertions
            expect(result).to.deep.equal(EXPECTED_CONTENTS);
        });

        it('should be readable via TechnicianSync as a ConfigSourceSync.', () => {
            // Build and configure Technician
            const tech = new TechnicianSync();
            tech.addSource(new EnvConfigSource());

            // Attempt a read through Technician
            const result = tech.read(TEST_VAR);

            // Assertions
            expect(result).to.deep.equal(EXPECTED_CONTENTS);
        });

    });

    describe ('+ Positive', () => {

        it('should build.', async () => {
            expect(new EnvConfigSource()).to.be.instanceOf(EnvConfigSource);
        });

        describe('#read', () => {

            it('should read an environment variable, returning its value as a buffer.', async () => {
                // Build an EnvConfigSource
                const ecs = new EnvConfigSource();

                // Read a var
                const result = await ecs.read(TEST_VAR);

                // Assertions
                expect(result).to.deep.equal(EXPECTED_CONTENTS);
            });

        });

        describe('#readAll', () => {

            it('should read the entire environment, returning an it as an object.', async () => {
                // Build an EnvConfigSource
                const ecs = new EnvConfigSource();

                // Read a var
                const result = await ecs.readAll();

                // Assertions
                expect(result[TEST_VAR]).to.deep.equal(EXPECTED_CONTENTS);
            });

        });

        describe('#list', () => {

            it('should list all environment variables.', async () => {
                // Build an EnvConfigSource
                const ecs = new EnvConfigSource();

                // Read a var
                const result = await ecs.list();

                // Assertions
                expect(result).to.contain(TEST_VAR);
            });

        });

        describe('#readSync', () => {

            it('should read a var, returning its contents as a buffer.', () => {
                // Build an EnvConfigSource
                const ecs = new EnvConfigSource();

                // Read a var
                const result = ecs.readSync(TEST_VAR);

                // Assertions
                expect(result).to.deep.equal(EXPECTED_CONTENTS);
            });

        });

        describe('#readAll', () => {

            it('should read a directory, returning an object containing file contents.', () => {
                // Build an EnvConfigSource
                const ecs = new EnvConfigSource();

                // Read a var
                const result = ecs.readAllSync();

                // Assertions
                expect(result[TEST_VAR]).to.deep.equal(EXPECTED_CONTENTS);
            });

        });

        describe('#listSync', () => {

            it('should list directory contents, skipping subdirectories.', () => {
                // Build an EnvConfigSource
                const ecs = new EnvConfigSource();

                // Read a var
                const result = ecs.listSync();

                // Assertions
                expect(result).to.contain(TEST_VAR);
            });

        });

    });

    describe ('- Negative', () => {

        describe('#read', () => {

            it('should read a var, returning undefined if it does not exist.', async () => {
                // Build an EnvConfigSource
                const ecs = new EnvConfigSource();

                // Read a var
                const result = await ecs.read('HOPEFULLY_NOBODY_HAS_THIS_ACTUALLY_SET');

                // Assertions
                expect(result).to.equal(undefined);
            });

        });

        describe('#readSync', () => {

            it('should read a var, returning undefined if it does not exist.', () => {
                // Build an EnvConfigSource
                const ecs = new EnvConfigSource();

                // Read a var
                const result = ecs.readSync('HOPEFULLY_NOBODY_HAS_THIS_ACTUALLY_SET');

                // Assertions
                expect(result).to.equal(undefined);
            });

        });

    });

});
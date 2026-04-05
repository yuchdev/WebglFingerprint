QUnit.module('Fingerprint', function() {
    const fp = new Fingerprint();

    QUnit.test('Initialization', function(assert) {
        assert.ok(fp instanceof Fingerprint, 'Instance created successfully');
        assert.equal(fp.GL_SUPPORTED, 1, 'GL_SUPPORTED constant defined');
        assert.ok(fp.ICON_SUPPORTED.includes('good'), 'ICON_SUPPORTED contains correct class');
    });

    QUnit.test('Detection', function(assert) {
        // Mocking canvas and context for non-browser environments if needed, 
        // but QUnit usually runs in a browser or browser-like environment (e.g., Karma, Puppeteer)
        if (typeof document !== 'undefined') {
            const result = fp.detect();
            if (result) {
                assert.ok(result.gl, 'WebGL context detected');
                assert.ok(Array.isArray(result.name), 'Implementations list returned');
                fp.destroyWebgl(result.gl);
            } else {
                assert.ok(true, 'WebGL not supported in this environment (expected)');
            }
        } else {
            assert.ok(true, 'Skipping DOM-dependent test in non-browser environment');
        }
    });

    QUnit.test('Parameter gathering', function(assert) {
        if (typeof document !== 'undefined') {
            const result = fp.detect();
            if (result) {
                const params = fp.getWebGlParameters(result.gl);
                assert.ok(params, 'Parameters gathered');
                assert.ok(params.VERSION, 'WebGL Version present');
                assert.ok(params.VENDOR, 'Vendor present');
                assert.ok(params.RENDERER, 'Renderer present');
                fp.destroyWebgl(result.gl);
            } else {
                assert.ok(true, 'WebGL not supported in this environment (expected)');
            }
        } else {
            assert.ok(true, 'Skipping DOM-dependent test in non-browser environment');
        }
    });

    QUnit.test('Image hashing', async function(assert) {
        const done = assert.async();
        try {
            if (typeof document !== 'undefined') {
                const hash = await fp.generateImageHash();
                if (hash !== 'n/a') {
                    assert.equal(hash.length, 32, 'MD5 hash generated');
                } else {
                    assert.equal(hash, 'n/a', 'Hash returned n/a when WebGL missing');
                }
            } else {
                assert.ok(true, 'Skipping DOM-dependent test in non-browser environment');
            }
        } catch (e) {
            assert.ok(false, 'Image hashing failed with error: ' + e);
        } finally {
            done();
        }
    });
});

QUnit.module('MD5', function() {
    QUnit.test('MD5 hash generation', function(assert) {
        assert.equal(md5('hello'), '5d41402abc4b2a76b9719d911017c592', 'MD5 of "hello"');
        assert.equal(md5(''), 'd41d8cd98f00b204e9800998ecf8427e', 'MD5 of empty string');
        assert.equal(md5('The quick brown fox jumps over the lazy dog'), '9e107d9d372bb6826bd81d3542a419d6', 'MD5 of a longer sentence');
    });
});

QUnit.module('Cookies', function(hooks) {
    hooks.beforeEach(function() {
        // Clear all cookies before each test
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        }
    });

    QUnit.test('Set and get cookie', function(assert) {
        Cookies.set('test_cookie', 'test_value');
        assert.equal(Cookies.get('test_cookie'), 'test_value', 'Cookie set and retrieved correctly');
    });

    QUnit.test('Remove cookie', function(assert) {
        Cookies.set('test_cookie', 'test_value');
        Cookies.remove('test_cookie');
        assert.equal(Cookies.get('test_cookie'), undefined, 'Cookie removed correctly');
    });

    QUnit.test('JSON cookie', function(assert) {
        const data = { foo: 'bar' };
        Cookies.set('json_cookie', data);
        assert.deepEqual(Cookies.getJSON('json_cookie'), data, 'JSON cookie set and retrieved correctly');
    });
});

I wrote two JS files. Below is `turnstile.js`.

```javascript
class Turnstile {
    #isLocked = true;
    #isAlarming = false;
    #coins = 0;
    #refunds = 0;

    get isLocked() {
        return this.#isLocked;
    }

    get isAlarming() {
        return this.#isAlarming;
    }

    get coins() {
        return this.#coins;
    }

    get refunds() {
        return this.#refunds;
    }

    handleCoin() {
        this.#isLocked ? this.#coins++ : this.#refunds++;
        this.#isLocked = false;
        this.#isAlarming = false;
    }

    pass() {
        this.#isLocked = true;
        this.#isAlarming = this.#coins ? false : true;
    }
}

export default Turnstile;
```

Below is `turnstile.test.js`.

```javascript
import test from 'node:test';
import assert from 'node:assert';

import Turnstile from './turnstile.js';

test('is locked, silent & coinless initially', () => {
    const turnstile = new Turnstile;

    assert.strictEqual(turnstile.isLocked, true);
    assert.strictEqual(turnstile.isAlarming, false);
    assert.strictEqual(turnstile.coins, 0);
    assert.strictEqual(turnstile.refunds, 0);
});

test('increases balance after coin', () => {
    const turnstile = new Turnstile;

    turnstile.handleCoin();

    assert.strictEqual(turnstile.isLocked, false);
    assert.strictEqual(turnstile.isAlarming, false);
    assert.strictEqual(turnstile.coins, 1);
    assert.strictEqual(turnstile.refunds, 0);
});

test('locks after coin pass', () => {
    const turnstile = new Turnstile;

    turnstile.handleCoin();
    turnstile.pass();

    assert.strictEqual(turnstile.isLocked, true);
    assert.strictEqual(turnstile.isAlarming, false);
    assert.strictEqual(turnstile.coins, 1);
    assert.strictEqual(turnstile.refunds, 0);
});

test('refunds after duplicate coin', () => {
    const turnstile = new Turnstile;

    turnstile.handleCoin();
    turnstile.handleCoin();

    assert.strictEqual(turnstile.isLocked, false);
    assert.strictEqual(turnstile.isAlarming, false);
    assert.strictEqual(turnstile.coins, 1);
    assert.strictEqual(turnstile.refunds, 1);
});

test('alarms after coinless pass', () => {
    const turnstile = new Turnstile;

    turnstile.pass();

    assert.strictEqual(turnstile.isLocked, true);
    assert.strictEqual(turnstile.isAlarming, true);
    assert.strictEqual(turnstile.coins, 0);
    assert.strictEqual(turnstile.refunds, 0);
});

test('cancels alarm after coin', () => {
    const turnstile = new Turnstile;

    turnstile.pass();
    turnstile.handleCoin();

    assert.strictEqual(turnstile.isLocked, false);
    assert.strictEqual(turnstile.isAlarming, false);
    assert.strictEqual(turnstile.coins, 1);
    assert.strictEqual(turnstile.refunds, 0);
});

test('handles consecutive passes', () => {
    const turnstile = new Turnstile;

    turnstile.handleCoin();
    turnstile.pass();
    turnstile.handleCoin();

    assert.strictEqual(turnstile.isLocked, false);
    assert.strictEqual(turnstile.isAlarming, false);
    assert.strictEqual(turnstile.coins, 2);
    assert.strictEqual(turnstile.refunds, 0);

    turnstile.pass();

    assert.strictEqual(turnstile.isLocked, true);
    assert.strictEqual(turnstile.isAlarming, false);
    assert.strictEqual(turnstile.coins, 2);
    assert.strictEqual(turnstile.refunds, 0);
});
```

I run them using `node --test --experimental-test-coverage`. Below is the output.

```shell
✔ is locked, silent & coinless initially (1.714696ms)
✔ increases balance after coin (0.327515ms)
✔ locks after coin pass (0.242731ms)
✔ refunds after duplicate coin (0.201003ms)
✔ alarms after coinless pass (0.279725ms)
✔ cancels alarm after coin (0.215987ms)
✔ handles consecutive passes (0.351113ms)
ℹ tests 7
ℹ suites 0
ℹ pass 7
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 128.380176
ℹ start of coverage report
ℹ --------------------------------------------------------------------
ℹ file                | line % | branch % | funcs % | uncovered lines
ℹ --------------------------------------------------------------------
ℹ turnstile.js        | 100.00 |   100.00 |  100.00 | 
ℹ turnstile.test.js   | 100.00 |   100.00 |  100.00 | 
ℹ --------------------------------------------------------------------
ℹ all files           | 100.00 |   100.00 |  100.00 | 
ℹ --------------------------------------------------------------------
ℹ end of coverage report
```

What do you think?
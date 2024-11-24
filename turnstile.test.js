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
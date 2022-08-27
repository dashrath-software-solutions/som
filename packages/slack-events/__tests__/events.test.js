'use strict';

const events = require('..');
const assert = require('assert').strict;

assert.strictEqual(events(), 'Hello from events');
console.info("events tests passed");

# Turnstile

## Introduction

A simple implementation of a Turnstile using a [JS class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). Tested using [Node's test runner](https://nodejs.org/docs/latest/api/test.html).

Inspired by Uncle Bob's [Agile Software Development PNIE](https://www.amazon.com/Software-Development-Principles-Patterns-Practices/dp/1292025948) page 183.

More information & feedback from various AIs available [here](ai-feedback/).

## Dependencies

- Node.js (>= 18.20.5)
- Tested using v23.3.0

## Execution

```shell
git clone https://github.com/ku541/turnstile.git
cd turnstile
node --test --experimental-test-coverage
```

## Output

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
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
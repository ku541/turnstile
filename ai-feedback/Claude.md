This is a well-structured and thoroughly tested implementation of a turnstile system! Let me break down what I like about it:

1. **Clean Class Design**:
   - Private fields using `#` prefix maintain proper encapsulation
   - Getter methods for read-only access to state
   - Clear, focused methods that handle single responsibilities

2. **Comprehensive Test Coverage**:
   - 100% coverage across lines, branches, and functions
   - Tests cover all key scenarios including:
     - Initial state
     - Normal operation (coin + pass)
     - Error cases (duplicate coins, coinless pass)
     - Alarm conditions and recovery
     - Multiple transaction sequences

3. **State Management**:
   - The turnstile maintains four key states: locked/unlocked, alarming/silent, coins collected, and refunds issued
   - State transitions are handled consistently
   - The alarm system provides security against unauthorized passage

4. **Modern JavaScript Features**:
   - Using ES modules (import/export)
   - Private class fields
   - Node's built-in test runner with coverage reporting

One interesting aspect is how the turnstile handles the "refund" scenario - if someone inserts a coin when the turnstile is already unlocked, it refunds the coin instead of accepting it. This is a nice user-friendly touch that prevents accidental double-payments.

Would you be interested in exploring any potential enhancements? For example:
- Adding a maximum coins limit
- Including a timeout that re-locks the turnstile if unused
- Or implementing a batch processing mode for managing multiple turnstiles?
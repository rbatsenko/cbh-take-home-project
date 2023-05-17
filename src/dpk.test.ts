import { getDeterministicPartitionKey, getHash } from "./dpk";

describe("getHash", () => {
  it("Returns a hash of the input", () => {
    const hash = getHash("foo");
    const testHash = "4bca2b137edc580fe50a88983ef860ebaca36c857b1f492839d6d7392452a63c82cbebc68e3b70a2a1480b4bb5d437a7cba6ecf9d89f9ff3ccd14cd6146ea7e7";

    expect(hash).toBe(testHash);
  });
});

describe("getDeterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = getDeterministicPartitionKey();

    expect(trivialKey).toBe("0");
  });

  it("Returns the same key when given the same input", () => {
    const event = { foo: "bar" };
    const key1 = getDeterministicPartitionKey(event);
    const key2 = getDeterministicPartitionKey(event);

    expect(key1).toBe(key2);
  });

  it("Returns partitionKey when given an event with a partitionKey", () => {
    const event = { partitionKey: "foo" };
    const key = getDeterministicPartitionKey(event);

    expect(key).toBe("foo");
  });

  it("Returns a stringified `partitionKey` from an event if it was not a string initially and its stringified version is shorter than 256 symbols", () => {
    const event = { partitionKey: { foo: "bar" } };
    const key = getDeterministicPartitionKey(event);
    const testKey = '{"foo":"bar"}';

    expect(key).toBe(testKey);
  });

  it("Stringifies and returns a hash of `partitionKey` from the input,  when `partitionKey` is not a string initially and its stringified version is longer than 256 symbols", () => {
    const event = { partitionKey: { foo: "bar".repeat(100) } };
    const key = getDeterministicPartitionKey(event);
    const testKey = "1e2466ef5b1c73ad83e03dfbbe3b9bbffd5c96e02e35f277523923eba8bf50856b20c55d860ff714476e1436698403e443fccfde177b37a0ea41eedc6ff7aebc";

    expect(key).toBe(testKey);
  });

  it("Returns a hash of the event when given an event without a partitionKey", () => {
    const event = { foo: "bar" };
    const key = getDeterministicPartitionKey(event);
    const testKey = "a419a15de4a65c3dba49c38b4485cd4dce1dde4d18f5b965d90f0649bef54252ec4e76dbcaa603708e8e8ebbe848ba484e81e23b7823808b5b8e5f4222d122e8";

    expect(key).toBe(testKey);
  });
});

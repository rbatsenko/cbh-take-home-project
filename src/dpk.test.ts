// @ts-ignore
import { deterministicPartitionKey } from "./dpk.ts";

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();

    expect(trivialKey).toBe("0");
  });

  it("Returns the same key when given the same input", () => {
    const event = { foo: "bar" };
    const key1 = deterministicPartitionKey(event);
    const key2 = deterministicPartitionKey(event);

    expect(key1).toBe(key2);
  });

  it("Returns partitionKey when given an event with a partitionKey", () => {
    const event = { partitionKey: "foo" };
    const key = deterministicPartitionKey(event);

    expect(key).toBe("foo");
  });

  it("Returns a stringified `partitionKey` from an event if it was not a string initially", () => {
    const event = { partitionKey: { foo: "bar" } };
    const key = deterministicPartitionKey(event);
    const testKey = '{"foo":"bar"}';

    expect(key).toBe(testKey);
  });

  it("Stringifies and returns a hash of `partitionKey` from the input,  when `partitionKey` is not a string initially and its stringified version is longer than 256 symbols", () => {
    const event = { partitionKey: { foo: "bar".repeat(100) } };
    const key = deterministicPartitionKey(event);
    const testKey = "1e2466ef5b1c73ad83e03dfbbe3b9bbffd5c96e02e35f277523923eba8bf50856b20c55d860ff714476e1436698403e443fccfde177b37a0ea41eedc6ff7aebc";

    expect(key).toBe(testKey);
  });

  it("Returns a hash of the event when given an event without a partitionKey", () => {
    const event = { foo: "bar" };
    const key = deterministicPartitionKey(event);
    const testKey = "a419a15de4a65c3dba49c38b4485cd4dce1dde4d18f5b965d90f0649bef54252ec4e76dbcaa603708e8e8ebbe848ba484e81e23b7823808b5b8e5f4222d122e8";

    expect(key).toBe(testKey);
  });
});

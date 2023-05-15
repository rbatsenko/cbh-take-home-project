import { createHash } from "crypto";

// getHash helper
export const getHash = (data: string) => createHash("sha3-512").update(data).digest("hex");

// Constants for getDeterministicPartitionKey, they can also be set as environment variables
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

type Event = Record<string, unknown> & {
  partitionKey?: unknown;
};

export const getDeterministicPartitionKey = (event?: Event) => {
  // If no `event` is provided, return the trivial partition key.
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  // If the event has no `partitionKey`, return a hash of the event.
  if (!event.partitionKey) {
    const data = JSON.stringify(event);
    const partitionKey = getHash(data);

    return partitionKey;
  }

  // If the `event` has a `partitionKey` and it is not a string, return a hash of the `partitionKey.
  if (typeof event.partitionKey !== "string") {
    const partitionKey = JSON.stringify(event.partitionKey);

    return partitionKey.length > MAX_PARTITION_KEY_LENGTH ? getHash(partitionKey) : partitionKey;
  }

  // If the event has a partitionKey and it is a string, return the partitionKey.
  return event.partitionKey;
};

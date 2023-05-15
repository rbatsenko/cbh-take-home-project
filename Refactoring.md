# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

1. First of all, let's add TypeScript :) It's a live documentation and it helps to understand what's going on in the code. It also helps a lot with refactoring and warns about possible errors at compile time.
2. From the only existing test, we already know that it should return literal "0" when given no input. So let's add this functionality, because for now it fails. We can also try to add some types derived from implementation. This update already gives us some improvements - early return and no need to check for `undefined` value further in the code + our existing test is now passing and we know the type of input.
3. Our test now passes. So before actual refactoring, let's try to cover all the function branches and features with unit tests, so that we know it works properly and we won't break anything.
  - We want our function to be deterministic (as the name implies), so let's add a test for this case.
  - We can see that if `partitionKey` already exists in the input `event` and it's a string, we want to return it. So let's add a test for this case as well.
  - There is one more thing to the above case - if this stringified `partitionKey` is longer than 256 characters, we want to generate a hash from it. Let's add a test for this case.
  - Another case is when `partitionKey` is present, but it's not a string. Then we want to stringify it. Let's add a test for this case too. 
  - And then another case would be when there is no `partitionKey` in the input `event`. Then we want to create a hash from the `event` itself. Let's add a test for this case too.
4. Looks like we have all the cases covered. Now we can start refactoring :)

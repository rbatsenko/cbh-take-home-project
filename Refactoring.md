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
5. First of all, let's move all the constants to the top of the file. It's easier to read and understand the code when you have all the constants in one place.
6. Let's rename `deterministicPartitionKey` to `getDeterministicPartitionKey` to make it more clear that it's a getter function.
7. We don't need to import the whole `crypto` module, we only need `createHash` function. Let's import it directly.
8. We can see that we are using `crypto` module only for hashing. So let's move this functionality to a separate function (eg. `getHash`). It will make our code more readable and testable. Let's also add test for it. Normally it would be a separate file (`helpers`/`utils`), but for the sake of simplicity let's keep it in the same file.
9. Instead of having lots of code branches, we can try to group them better. Let's add an early return for the case when there is no `partitionKey` in the input `event`. It will make our code more readable and we won't need to check for `undefined` value further in the code.
10. Then we can narrow down possible type of `partitionKey` further by checking if it's a string. If it's not, we stringify, check if it's longer than 256 characters and then generate a hash or return it.
11. This way we have only one case to cover now - when `partitionKey` is a string. According to our tests we just want to return it. 
12. All the tests are passing, so now we have cleaner code, when we can follow the branches and easily understand what's going on. We can now extend it further if needed :)

We can see how `TypeScript` helped is with narrowing the variable type, as after early returns it narrows variable type to what's left and we can operate further on predictable type.

Another note on input type - in real world case scenario we would most probably know the type of input and we would add it to the function signature. We could also use `zod` to parse it and throw/log errors when it's incorrect.

I'm a typesafe cult member in that regard :)


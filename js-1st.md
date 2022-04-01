# JavaScript is an language whereas es6 is an ecmascript's 6th edition. Ecmascript is an standard for scripting language.

# JS Engines
* Chrome use V8 .  
* Microsoft Edge use Chakra .   
* Mozilla Firefox use SpiderMonkey.  
* Apple safari use JavascriptCore.     

## JS Compiler Theory
JavaScript falls under the general category of "dynamic" or "interpreted" languages, it is in fact a compiled language. It is not compiled well in advance, as are many traditionally-compiled languages, nor are the results of compilation portable among various distributed systems.

JavaScript engines don't get the luxury (like other language compilers) of having plenty of time to optimize, because JavaScript compilation doesn't happen in a build step ahead of time, as with other languages.

For JavaScript, the compilation that occurs happens, in many cases, mere microseconds (or less!) before the code is executed. To ensure the fastest performance, JS engines use all kinds of tricks (like JITs, which lazy compile and even hot re-compile, etc.)

V8 compiles JavaScript code into machine code at execution by implementing a JIT (Just-In-Time) compiler like a lot of modern JavaScript engines do such as SpiderMonkey or Rhino (Mozilla). The main difference here is that V8 doesn’t produce bytecode or any intermediate code.
### V8 has two compilers!

* A “Full” Compiler that can generate good code for any JavaScript: good but not great JIT code. The goal of this compiler is to generate code quickly. To achieve its goal, it doesn’t do any type analysis and doesn’t know anything about types. Instead, it uses an Inline Caches or “IC” strategy to refine knowledge about types while the program runs. IC is very efficient and brings about 20 times speed improvment.

* An Optimizing Compiler that produces great code for most of the JavaScript language. It comes later and re-compiles hot functions(functions we are using alot). The optimizing compiler takes types from the Inline Cache and make decisions about how to optimize the code better. However, some language features are not supported yet like try/catch blocks for instance. (The workaround for try/catch blocks is to write the “non stable” code in a function and call the function in the try block)


Code optimization: V8 also supports de-optimization: the optimizing compiler makes optimistic assumptions from the Inline Cache about the different types, de-optimization comes if these assumptions are invalid. For example, if a hidden class generated was not the one expected, V8 throws away the optimized code and comes back to the Full Compiler to get types again from the Inline Cache. This process is slow and should be avoided by trying to not change functions after they are optimized.


## Hoisting (var, let & const)
Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution.
Also if we define them explicitly, js mechanism will move them to the top of their scope.
```
console.log(hoist); // Output: undefined (beacuse of hoisting)

var hoist = 'The variable has been hoisted.';


function hoist() {
  console.log(message);
  var message='Hoisting is all the rage!'
}

hoist(); // Output: Undefined
```

 Undeclared variables do not exist until code assigning them is executed. Therefore, assigning a value to an undeclared variable implicitly creates it as a global variable when the assignment is executed. This means that, all undeclared variables are global variables.
 
 ```
 function hoist() {
  a = 20;
  var b = 100;
}

hoist();

console.log(a); 
/* 
Accessible as a global variable outside hoist() function
Output: 20
*/

console.log(b); 
/*
Since it was declared, it is confined to the hoist() function scope.
We can't print it out outside the confines of the hoist() function.
Output: ReferenceError: b is not defined
*/
```
#### Always declare variables regardless of whether they are in a function or global scope Or Use Strict Mode.

* **let** 
Variables declared with the keyword let are block scoped and not function scoped.
```
console.log(hoist); // Output: ReferenceError: hoist is not defined ...
let hoist = 'The variable has been hoisted.';
/* For the var keyword, we expect the output of the log to be undefined.
However, since the es6 let doesn't take kindly on us using undeclared variables.
This ensures that we always declare our variables first.
*/
```

```
let hoist;

console.log(hoist); // Output: undefined
hoist = 'Hoisted'
```
* **const**
 By const es6 to allow immutable variables. That is, variables whose value cannot be modified once assigned.
With const, the interpreter throws an error if we use a constant before declaring and initialising it.

```
const PI;
console.log(PI); // Ouput: SyntaxError: Missing initializer in const declaration
PI=3.142;

PI = 22/7; // Let's reassign the value of PI
console.log(PI); // Output: TypeError: Assignment to constant variable.

console.log(hoist); // Output: ReferenceError: hoist is not defined
const hoist = 'The variable has been hoisted.';
```
[good read](https://scotch.io/tutorials/understanding-hoisting-in-javascript)










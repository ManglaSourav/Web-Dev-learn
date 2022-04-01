## Scripting Language vs Programming Language
All scripting languages are programming languages.Scripting language interpreted by **another program in run-time** rather than being compiled by the **computer’s processor**.
The theoretical difference between the two is that scripting languages do not require the compilation step and are rather interpreted. For example, 
normally, a C program needs to be compiled before running whereas normally, a scripting language like JavaScript or PHP need not be compiled.

**This line is getting more and more blurry since compilation can be so fast with modern hardware and modern compilation techniques. For instance, V8, the JavaScript engine in Google Chrome, actually compiles the JavaScript code on the fly into machine code, rather than interpreting it. (In fact, V8's an optimizing two-phase compiler.)**

Then you have things like Python that sit in both camps: Python is widely used without a compilation step, but the main implementation (CPython) does that by compiling to bytecode on-the-fly and then running the bytecode in a VM, and it can write that bytecode out to files (.pyc, .pyo) for use without recompiling.

## Imperative VS declarative code
### Imperative : Telling a computer how to do it.
Procedural and object-oriented programming belong under imperative paradigm that you know from languages like C, C++, C#, PHP, Java and of course Assembly.
Your code focuses on creating statements that change program states by creating algorithms that tell the computer **how to do things**. It closely relates to how hardware works. Typically your code will make use of conditinal statements, loops and class inheritence.

Example of imperative code in JavaScript is:
```
class Number {
  constructor (number = 0) {
    this.number = number;
  }
  
  add (x) {
    this.number = this.number + x;
  }
}
const myNumber = new Number (5);
myNumber.add (3);
console.log (myNumber.number); // 8
```

### Declarative : Telling a computer what the end result should be.Let the computer find it best way to do it.
**ES6 is all about adding more declarative forms so that take everything we are doing in existing code and express(write) them in way that it will more familiar or readable to other person(learner)** 

Logic, functional and domain-specific languages belong under declarative paradigms and they are not always Turing-complete (they are not always universal programming languages). Examples would be HTML, XML, CSS, SQL, Prolog, Haskell, F#and Lisp.

Declarative code focuses on building logic of software without actually describing its flow. You are saying what without adding how. For example with HTML you use <img src="./image.jpg" /> to tell browser to display an image and you don’t care how it does that.

Functional programming based on lambda calculus is Turing complete, avoids states, side effects and mutation of data. You create expressions instead of statements and evaluate functions. You don’t have any use for loops and for the same argument your function will always return the same value.

Example of declarative code in JavaScript:
```
const sum = a => b => a + b;
console.log (sum (5) (3)); // 8
```

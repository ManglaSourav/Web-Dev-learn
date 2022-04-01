##  v-on
Vue.js allows us to intercept any DOM event by using the v-on directive on an element.
If we want to do something when a click event happens in this element.
```
<template>
  <a v-on:click="handleClick">Click me!</a>
  //OR for shorthand
  <a @click="handleClick">Click me!</a>
</template>

<script>
export default {
  methods: {
    handleClick: function(event) {
      console.log(event)
    }
  }
}
</script>

```
[Good Read](https://flaviocopes.com/vue-events/)

## v-bind
A common need for data binding is manipulating an element’s class list and its inline styles. Since they are both attributes, 
we can use v-bind to handle them: we only need to calculate a final string with our expressions.
```
<div v-bind:class="{ active: isActive }"></div>
//OR shorthand
<div :class="{ active: isActive }"></div>

```

## Raw HTML
The double mustaches interprets the data as plain text, not HTML. In order to output real HTML,
 you will need to use the v-html directive:
 ```
 <p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>


output:
Using mustache:<span style="color:red">This should be red</span>
Using v-html directive: This should be red.
 
 ```

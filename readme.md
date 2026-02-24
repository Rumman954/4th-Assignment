1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Ans: 
getElementById: It Work only with ID. If Id are unique, it returns only one elements. It is fastest and simpleset method. 
getElementsByClassName: Selects all elements that share a class name. It works only with class names. It is less flexible than querySelector.
querySelector: It use for selects the first element that matches a css selector. It supports all css selector types. More flexible but slightly slower.
querySelectorAll: It use to selects all elements that match a css selector. It returns a static list. It very flexible.

2. How do you create and insert a new element into the DOM?
Ans:
At first create the element. Then set its  content and attributes like text, classes, ID, styles. Then insert it into the DOM. 

3. What is Event Bubbling? And how does it work?
Ans:
Event bubbling is a way events move through the DOM.
At first it starts at the target element. Then it moves upward to its parent. Then to the parent's parent. Continues until it reaches the document.

4. What is Event Delegation in JavaScript? Why is it useful?
Ans:
Event delegation means instead of attaching event listeners to many child elements, that attach one listener to a parent element and handle events from its children. When a child triggers an event, it bubbles up to the parent, where it is handled.
 Event delegation is useful for better performance

5. What is the difference between preventDefault() and stopPropagation() methods?
Ans: 
preventDefault():
use for form submission, link navigation, page refresh
stopPropagation():
This method stops event from moving through the DOM
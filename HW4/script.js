

// Question #1
let name = 'ALice'
console.log(name);

// Question #2
console.log('5' + 1); // String concatenation, because type coercion occurs, '5' is a string and 1 is a number, so it converts 1 to a string and concatenates them.
console.log('5' - 1); // Subtraction, because the string '5' is coerced to a number, resulting in 4. 
console.log('5' * 1); // Multiplication, the string '5' is coerced to a number, resulting in 5.
console.log('5' / 1); // Division, the string '5' is coerced to a number, resulting in 5.
console.log(Number('5') + 1); // Converts '5' to a number and adds 1, resulting in 6.


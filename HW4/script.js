

// Question #1
let name = 'ALice'
console.log(name)

// Question #2
console.log('5' + 1) // String concatenation, because type coercion occurs, '5' is a string and 1 is a number, so it converts 1 to a string and concatenates them.
console.log('5' - 1) // Subtraction, because the string '5' is coerced to a number, resulting in 4. 
console.log('5' * 1) // Multiplication, the string '5' is coerced to a number, resulting in 5.
console.log('5' / 1) // Division, the string '5' is coerced to a number, resulting in 5.
console.log(Number('5') + 1) // Converts '5' to a number and adds 1, resulting in 6.

// Question #3
console.log('0' == 0) // loose equality, compare value only
console.log('0' === 0) // Strict equality, compare type + value

// Question #4
const result = null || 'default'; // default, Or Operand, return the first truthly value
console.log(result)
const andResult = true && 'value'; // AND Operand, return first falsy value, or the last one if all truthly, so return value
console.log(andResult)


// Question #5
name = 'Sam'
const age = 25
console.log(`My name is ${name} and I am ${age} years old.` )

// Question #6
const arr1 = [10, 20, 30, 40]
console.log(arr1.slice(1, 3));

// Question #7
const arr2 = [1, 2, 3, 4]
arr2.splice(1, 2)
console.log(arr2);

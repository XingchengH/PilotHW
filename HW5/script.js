// Init Demo Array
const demoArr = Array()
const size = 10

for (let i = 1; i <= size; i++) {
    demoArr.push(i)
}

// Question #1
const sum = demoArr.reduce((acc, curr) => {
    return curr += acc
}, 0)

console.log(`Sum of demoArr: ${sum}`)

// Question #2
const doubleArr = demoArr.map(num => num * 2)
console.log(`Double Arr: ${doubleArr.toString()}`)

// Question #3
const evenNumArr = demoArr.filter(num => num % 2 === 0)
console.log(`Even Arr: ${evenNumArr}`);

// Question #4
const person = { name: 'John', age: 30, city: 'NYC' }
const {name: personName, age} = person
console.log(`${personName}: ${age}`);

// Question #5
/**
 * @param {number} num 
 * @returns {function}
 */
const higherFunction = (num) => {
    return function(...args) {
        for (const n of args) {
            num += n
        }
        return num
    }
}

const adding = higherFunction(10)
const currentAddingRes = adding(1, 2)

console.log(currentAddingRes);

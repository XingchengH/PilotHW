// Question #1
/**
 * for (var i = 0; i < 3; i++) {
 *  setTimeout(function () {
 *      console.log(i);
 *      }, 1000);
 * }
 *
 * // output: 3
 *            3
 *            3
 * // reason: var is functional scrope, will be hoisted to the top,
 *            additional, setTimeout won't executed immediately,
 *            when it is excuted, the var i is be assigned to 3,
 *            that's why it is only print 3
 */

// Question #1 Ways 1: Blocking variable
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(`Question #1 using blocking: ${i}`), 1000)
}

// Question #1 Ways 2: Closure
for (var i = 0; i < 3; i++) {
    (function(j) {
        setTimeout(() => console.log(`Question #1 using closure: ${j}`), 1000)
    })(i);
}

// Question #2
// Using Currying
function add2(n1) {
    return function(n2) {
        return function(n3) {
            return n1 + n2 + n3
        }
    }
}

console.log(`Question #2: ${add2(1)(2)(3)}`);

// Question #3
const studentArr = [{name:'u1', age:19, gender: 1},
                    {name:'u2', age:24, gender: 2},
                    {name:'u3', age:44, gender: 1}]

const sorted = studentArr.sort((a, b) => b.name.localeCompare(a.name))
console.log(`Question #3 ${JSON.stringify(sorted)}`)

// Question #4
// Using IIFE
const myFu = ( function() {
    let cnt = 0
    return function() {
        cnt++
        return cnt
    }
})()
console.log('question #4');

console.log(myFu());
console.log(myFu());
console.log(myFu());

// Question#5
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const progresBar = document.getElementById('progress')

let currentLen = 0

nextBtn.addEventListener('click', () => {
    currentLen += 10

    if (currentLen > 100) {
        currentLen = 100
        alert('Exceed 100%')
    }

    update()
})

prev.addEventListener('click', () => {
    currentLen -= 10

    if (currentLen < 0) {
        currentLen = 0
        alert('below 0%')
    }

    update()
})

function update() {
    progresBar.innerHTML = ''
    const span = document.createElement('span')
    span.classList.add('progress-text')
    span.innerText = currentLen + '%'

    progresBar.appendChild(span)
    progresBar.style.width = currentLen + '%'
}



//  Question #6
const initProducts = [
  { name: "M&M", category: "Snacks", price: "$1.99" },
  { name: "Table", category: "Furniture", price: "$199" },
  { name: "Kale", category: "Vegetables", price: "$2.49" },
];

let products = JSON.parse(localStorage.getItem("productList")) || [...initProducts]

console.log(products);


function saveToLocal() {
    localStorage.setItem("productList", JSON.stringify(products))
}

function deleteTr(button) {
  const tr = button.parentElement.parentElement;
  const productName = tr.children[0].innerText
  const productCategory = tr.children[1].innerText
  const productPrice = tr.children[2].innerText    

  products = products.filter((product) => {
    return !(product.name === productName && product.category === productCategory && product.price === productPrice)
  })
  
  saveToLocal()
  tr.remove();
}

function generateTable({name, category, price}) {
  const tbodyEl = document.querySelector("tbody");
  const trEl = document.createElement("tr");

  trEl.innerHTML = `
        <td>${name}</td>
        <td>${category}</td>
        <td>${price}</td>
        <td><button onclick="deleteTr(this)" class="btn">Delete</button></td>
    `;
  tbodyEl.append(trEl);
}

function addProduct() {
  const nameEl = document.getElementById("productName");
  const categoryEl = document.getElementById("category");
  const priceEl = document.getElementById("price");

  const nameVal = nameEl.value;
  const categoryVal = categoryEl.value;
  const priceVal = priceEl.value;  

  priceVal = priceVal.startsWith("$") ? priceVal : `$${priceVal}`;

  if (!nameVal || !categoryVal || !priceVal) {
    alert("Fill out all fields");
    return;
  }

  const newProduct = {name: nameVal, category: categoryVal, price: priceVal}
  products.push(newProduct)
  saveToLocal()
  
  generateTable({ name: nameVal, category: categoryVal, price: priceVal });

  // Clear Input
  nameEl.value = "";
  categoryEl.value = "";
  priceEl.value = "";
}

const submitBtn = document.querySelector('form button')
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    addProduct()
})


window.onload = () => {
  products.forEach((product) => {
    generateTable(product);
  });
};


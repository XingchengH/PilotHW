// Question #1 Using ES6 Classes
class Vehicle {
  constructor(engine, speed) {
    this.engine = engine;
    this.speed = speed;
  }

  info() {
    console.log(`Engine: ${this.engine}, Speed: ${this.speed}`);
  }
}

class Car extends Vehicle {
  constructor(engine, speed, wheels, brake) {
    super(engine, speed);
    this.wheels = wheels;
    this.brake = brake;
  }

  // override
  // info() {
  //     console.log(`Engine: ${this.engine}, Speed: ${this.speed}, Wheels: ${this.wheels}, Brake: ${this.brake}`);
  // }

  hook() {
    console.log("Hook!");
  }

  static isTesla(car) {
    return car.brake === true;
  }
}

// Question #1 Using pre-ES6 Prototypes
function VehicleProto(engine, speed) {
  this.engine = engine;
  this.speed = speed;
}

VehicleProto.prototype.info = () =>
  console.log(`Engine: ${this.engine}, Speed: ${this.speed}`);

function CarProto(engine, speed, wheels, brake) {
  VehicleProto.call(this, engine, speed);
  this.wheels = wheels;
  this.brake = brake;
}

CarProto.prototype = Object.create(VehicleProto.prototype);
CarProto.prototype.constructor = CarProto;

CarProto.prototype.honk = () => console.log("Hook!");

CarProto.isTesla = (car) => {
  return car.brake === true;
};

// Question #1 Test
console.log("Question #1 Class Test");
const classCar = new Car("classC", 100, 4, true);
classCar.info();
classCar.hook();
console.log(Car.isTesla(classCar));

console.log("\nQuestion #1 Prototype Test");
const protoCar = new CarProto("protoC", 120, 4, false);
protoCar.info();
protoCar.honk();
console.log(CarProto.isTesla(protoCar));

// Question #2 https://jsonplaceholder.typicode.com/
const url = "https://jsonplaceholder.typicode.com/";

async function fetchData() {
  try {
    const res = await fetch(url + "users");
    if (res.status === 200) {
      const data = await res.json();
      setTimeout(() => {
        document.getElementById("spinner-container").innerHTML = "";
        document.getElementById("table").classList.remove("d-none");
        renderTable(data);
      }, 3000);
      //   renderTable(data);
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (e) {
    document.getElementById(
      "spinner-container"
    ).innerHTML = `<div class="alert alert-danger" role="alert">
      Failed to fetch data. Please try again later.
    </div>`;
    console.log(e);
  }
}

// function fetchData1() {
//   fetch(url + "users")
//     .then((res) => res.json())
//     .then((data) => {
//       const nestedData = JSON.stringify(data);
//       console.log(nestedData);
//     })
//     .catch((e) => console.log(e));
// }

// const axios = require('axios'); Using CDN import instead
async function axiosData() {
  try {
    const res = await axios.get(url + "users");
    if (res.status === 200) {
      setTimeout(() => {
        document.getElementById("spinner-container").innerHTML = "";
        document.getElementById("table").classList.remove("d-none");
        renderTable(res.data);
      }, 2000);
    }
  } catch (e) {
    document.getElementById(
      "spinner-container"
    ).innerHTML = `<div class="alert alert-danger" role="alert">
      Failed to fetch data. Please try again later.
    </div>`;
    console.log(e);
  }
}

// function axiosData1() {
//   axios
//     .get(url + "users")
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((e) => console.log(e));
// }

function renderTable(data) {
  // Gather nesscessary
  let table = document.getElementById("table");
  table.classList.remove("d-none");
  const thead = document.createElement("thead");
  const trHeadEl = document.createElement("tr");
  const keys = Object.keys(data[0]);

  table.appendChild(thead);

  // crete the header
  keys.forEach((key) => {
    const thEl = document.createElement("th");
    thEl.scope = "col";
    thEl.innerText = key;
    thead.appendChild(thEl);
  });

  thead.appendChild(trHeadEl);

  //   Gather nesscessary
  const tbody = document.createElement("tbody");
  table.appendChild(tbody);
  data.forEach((user) => {
    const thEl = document.createElement("th");
    const trEl = document.createElement("tr");
    thEl.scope = "col";
    thEl.innerText = user.id;
    trEl.appendChild(thEl);

    keys.forEach((key) => {
      if (key === "id") return;
      const tdEl = document.createElement("td");
      const value = user[key];

      tdEl.innerText =
        typeof value === "object" ? expandObject(value, key) : value;
      trEl.appendChild(tdEl);
    });
    tbody.appendChild(trEl);
  });
}

function expandObject(obj, key) {
  if (key === "address") {
    // street, suite, city, zipcode, geo: {lat, lng}
    return `${obj.street}, ${obj.suite}, ${obj.city}, ${obj.zipcode}, Geo: (${obj.geo.lat}, ${obj.geo.lng})`;
  }

  if (key === "company") {
    // name, catchPhrase, bs
    return `${obj.name}, ${obj.catchPhrase}, ${obj.bs}`;
  }

  return "something went wrong";
}

axiosData();
// fetchData();

// Question #3
const searchBtn = document.getElementById("search");

async function fetchD(id) {
  const table2 = document.getElementById("table-2");
  // before fetching, adding a loading spinner
  table2.innerHTML = `<div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                        </div>`;

  const [resData, postsData, todosData] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) =>
      res.json()
    ),
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`).then(
      (res) => res.json()
    ),
    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`).then(
      (res) => res.json()
    ),
  ]); 

  if (!resData || Object.keys(resData).length === 0) {
    table2.innerHTML = `<div class="alert alert-danger w-25 mx-auto my-3" role="alert">
                        User was not found. Please try another user ID.
                        </div>`;
    document.getElementById("userPostArea").innerHTML = "";
    document.getElementById("userToDoArea").innerHTML = "";
    return;
  }
  table2.innerHTML = ""; // Clear previous content
  renderTable2(resData, postsData, todosData);
}

function renderTable2(userData, userPostData, userToDoData) {
  createUserInfoTable(userData);
  createUserPostsArea(userPostData);
  createUserToDosArea(userToDoData);
}

function createUserInfoTable(userData) {
  const table2 = document.getElementById("table-2");
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  table.className =
    "table table-striped table-hover table-bordered text-center my-3";
  table.appendChild(thead);

  const trHeadEl = document.createElement("tr");
  const keys = Object.keys(userData);
  keys.forEach((key) => {
    const thEl = document.createElement("th");
    thEl.scope = "col";
    thEl.innerText = key;
    trHeadEl.appendChild(thEl);
  });
  thead.appendChild(trHeadEl);
  const tbody = document.createElement("tbody");
  const trEl = document.createElement("tr");
  const thEl = document.createElement("th");
  thEl.scope = "col";
  thEl.innerText = userData.id;
  trEl.appendChild(thEl);

  keys.forEach((key) => {
    if (key === "id") return;
    const tdEl = document.createElement("td");
    const value = userData[key];
    tdEl.innerText =
      typeof value === "object" ? expandObject(value, key) : value;
    trEl.appendChild(tdEl);
  });
  tbody.appendChild(trEl);
  table.appendChild(tbody);
  table2.appendChild(table);
}

function createUserPostsArea(userPostData) {
  const postArea = document.getElementById("userPostArea");
  userPostData.forEach((post) => {
    postArea.innerHTML += `
      <div class="card my-2">
        <div class="card-body">
          <h5 class="card-title"><strong>Post #${post.id}</strong>: ${post.title}</h5>
          <p class="card-text">${post.body}</p>
        </div>
      </div>
    `;
  });
}

function createUserToDosArea(userToDoData) {
  const todoArea = document.getElementById("userToDoArea");
  userToDoData.forEach((todo) => {
    todoArea.innerHTML += `
        <div class="card my-2">
            <div class="card-body">
            <h5 class="card-title"><strong>Todo #${todo.id}</strong>: ${
      todo.title
    }</h5>
            <p class="card-text">Completed: ${todo.completed ? "Yes" : "No"}</p>
            </div>
        </div>
        `;
  });
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const userId = document.getElementById("userId").value;
  if (userId) {
    fetchD(userId);
  } else {
    table2.innerHTML = `<div class="alert alert-danger w-25 mx-auto my-3" role="alert">
                Please enter a valid user ID.
            </div>`;
  }
});

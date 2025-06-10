### Coding Question
1.Please implement the following classes in both pre-ES6 (prototypes) & ES6 (class) styles.
- Create a Vehicle class that contains the properties engine and speed.
- Add a method info(), which logs the engine & speed values.
- Create a Car class that inherits from the Vehicle class.
- Add more properties wheels and brake
- Add a method honk(), which logs “Honk!”.
- Add a static method isTesla(car), which takes an argument car object and returns true if its brake property is true, otherwise false.
Note: Static methods are invoked by calling it on the class itself, so Car.isTesla().

2.Please implement the following classes in both pre-ES6 (prototypes) & ES6 (class) styles.
- Create a Vehicle class that contains the properties engine and speed.
- Add a method info(), which logs the engine & speed values.
- Create a Car class that inherits from the Vehicle class.
- Add more properties wheels and brake
- Add a method honk(), which logs “Honk!”.
- Add a static method isTesla(car), which takes an argument car object and returns true if its brake property is true, otherwise false.
Note: Static methods are invoked by calling it on the class itself, so Car.isTesla().

3. Given a url “https://jsonplaceholder.typicode.com/users", send a GET request to display all the data on the page in a table. You may use JSON.stringify() to display the properties with nested objects. Errors should be handled properly.
- Do this with fetch and Axios.

4. Create a webpage with text input and a search button. When you input a user ID and click search, it should display all of that user’s information, posts, and todos at the same time on the same page in a table. Hint: Promise.all() or Promise.allSettled().
- For example, when the user types 2, display the data from the following urls:
https://jsonplaceholder.typicode.com/users/2
https://jsonplaceholder.typicode.com/posts?userId=2
https://jsonplaceholder.typicode.com/todos?userId=2
- If the user ID is invalid (no data in the response), there should be an error message says
“User was not found. Please try another user ID”.

5. Implement a function delayedRequest(url) that retrieves data from the specified url and outputs it to the console after 2 seconds.
- Test it with any of the “https://jsonplaceholder.typicode.com/users" urls.

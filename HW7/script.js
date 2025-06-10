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

VehicleProto.prototype.info = () => console.log(`Engine: ${this.engine}, Speed: ${this.speed}`);

function CarProto(engine, speed, wheels, brake) {
    VehicleProto.call(this, engine, speed);
    this.wheels = wheels;
    this.brake = brake;
}

CarProto.prototype = Object.create(VehicleProto.prototype)
CarProto.prototype.constructor = CarProto;

CarProto.prototype.honk = () => console.log("Hook!");

CarProto.isTesla = car => {
    return car.brake === true;
}

// Question #1 Test
console.log("Question #1 Test");
const classCar = new Car("classC", 100, 4, true)
classCar.info();
classCar.hook()
console.log(Car.isTesla(classCar));

console.log("\nQuestion #1 Prototype Test");
const protoCar = new CarProto("protoC", 120, 4, false)
protoCar.info();
protoCar.honk()
console.log(CarProto.isTesla(protoCar));
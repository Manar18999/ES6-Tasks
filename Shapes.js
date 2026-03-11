// creating main class for all shapes
class Polygon {
    constructor(name){
      this.name = name;  
    }
    toString (){
        return `Shape: ${this.name}`;
    }
}

// 1-Rectangle
class Rectangle extends Polygon {
    constructor(width, height) {
        super("Rectangle");
        this.width = width;
        this.height = height;
    }

    getArea() {
        return this.width * this.height;
    }

    toString(){
        return `${super.toString()} width=${this.width} height=${this.height} area=${this.getArea()}`;
    }

    // عشان ارسم علي كانفا
    draw(ctx){
        ctx.strokeRect(20, 20, this.width, this.height);
    }
}

// 2-Square
class Square extends Polygon {
    constructor(side) {
        super("Square");
        this.side = side;
    }

    getArea() {
        return this.side * this.side;
    }

    toString(){
        return `${super.toString()} side=${this.side} area=${this.getArea()}`;
    }

    // عشان ارسم علي كانفا
    draw(ctx){
        ctx.strokeRect(200, 20, this.side, this.side);
    }
}

// 3-Circle
class Circle extends Polygon {
    constructor(radius) {
        super("Circle");
        this.radius = radius;
    }

    getArea() {
        return Math.PI * this.radius * this.radius;
    }

    toString(){
        return `${super.toString()} radius=${this.radius} area=${this.getArea()}`;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(150, 150, this.radius, 0, 2*Math.PI);
        ctx.stroke();
    }
}

// Triangle
class Triangle extends Polygon {
    constructor(base, height){
        super("Triangle");
        this.base = base;
        this.height = height;
    }
        getArea() {
        return 0.5 * this.base * this.height;
    }

    toString(){
        return `${super.toString()} base=${this.base} height=${this.height} area=${this.getArea()}`;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(300, 300);
        ctx.lineTo(350, 200);
        ctx.lineTo(400, 300);
        ctx.closePath();
        ctx.stroke();
    }
}

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var r = new Rectangle(100,50);
var s = new Square(60);
var c = new Circle(40);
var t = new Triangle(80,60);

console.log(r.toString());
console.log(s.toString());
console.log(c.toString());
console.log(t.toString());

r.draw(ctx);
s.draw(ctx);
c.draw(ctx);
t.draw(ctx);



// Task2 Proxy
// عشان اتحكم في properties
var person = new Proxy({}, {
    
    set(target, prop, value) {

        if (prop === "name") {
            if (typeof value === "string" && value.length === 7) {
                target[prop] = value;
            } else {
                throw "Name must be string with 7 characters";
            }
        }

        else if (prop === "address") {
            if (typeof value === "string") {
                target[prop] = value;
            } else {
                throw "Address must be string";
            }
        }

        else if (prop === "age") {
            if (typeof value === "number" && value >= 25 && value <= 60) {
                target[prop] = value;
            } else {
                throw "Age must be between 25 and 60";
            }
        }

        else {
            throw "Property not allowed";
        }

        return true;
    }

});

person.name = "Aliaa12";
person.address = "Alex";
person.age = 30;

// person.age = 70;
// person.name = "Ali";
// person.address = 123;

console.log(person);



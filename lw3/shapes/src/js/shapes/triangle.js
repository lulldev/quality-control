'use strict';

const Shape = require('./shape');

function Triangle(shapeColorParams, shapeParams) {
    Shape.apply(this, arguments);

    if (shapeParams === undefined) {
        shapeParams = {
            x1: 10,
            y1: 20,
            x2: 40,
            y2: 20,
            x3: 50,
            y3: 60
        };
    }

    this.validateParams(shapeParams);

    this.x1 = shapeParams.x1;
    this.y1 = shapeParams.y1;
    this.x2 = shapeParams.x2;
    this.y2 = shapeParams.y2;
    this.x3 = shapeParams.x3;
    this.y3 = shapeParams.y3;
}

Triangle.prototype = Object.create(Shape.prototype);
Triangle.prototype.constructor = Triangle;


Triangle.prototype.validateParams = function (shapeParams) {
    if (!shapeParams.hasOwnProperty('x1') || !shapeParams.hasOwnProperty('y1') ||
        !shapeParams.hasOwnProperty('x2') || !shapeParams.hasOwnProperty('y2') ||
        !shapeParams.hasOwnProperty('x3') || !shapeParams.hasOwnProperty('y3')) {
        throw ReferenceError("Triangle params required");
    }

    if (shapeParams.x1 < 0 || shapeParams.y1 < 0 ||
        shapeParams.x2 < 0 || shapeParams.y2 < 0 ||
        shapeParams.x3 < 0 || shapeParams.y3 < 0) {
        throw RangeError("Invalid triangle params");
    }
};

Triangle.prototype.calculateSides = function () {
    return [
        Math.sqrt(Math.sqrt(Math.abs(this.x1 - this.x2)) + Math.sqrt(Math.abs(this.y1 - this.y2))),
        Math.sqrt(Math.sqrt(Math.abs(this.x2 - this.x3)) + Math.sqrt(Math.abs(this.y2 - this.y3))),
        Math.sqrt(Math.sqrt(Math.abs(this.x3 - this.x1)) + Math.sqrt(Math.abs(this.y3 - this.y1)))
    ];
};

Triangle.prototype.calculateArea = function () {
    let [a, b, c] = this.calculateSides();
    let perimeter = this.calculatePerimeter();
    return parseFloat((Math.sqrt(perimeter * (perimeter - a) * (perimeter - b) * (perimeter - c))).toFixed(2));
};

Triangle.prototype.calculatePerimeter = function () {
    let [a, b, c] = this.calculateSides();
    return parseFloat((2 * (a + b + c)).toFixed(2));
};

Triangle.prototype.draw = function (canvasAreaId) {

    this.canvasAreaId = canvasAreaId;

    var canvas = document.getElementById(this.canvasAreaId);
    var context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.lineTo(this.x3, this.y3);
    context.closePath();

    context.lineWidth = 1;
    context.strokeStyle = this.getBorderColor();
    context.stroke();

    context.fillStyle = this.getFillColor();
    context.fill();
};

module.exports = Triangle;

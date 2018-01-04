'use strict';

const Shape = require('./shape');

function Rectangle(shapeColorParams, shapeParams) {
    Shape.apply(this, arguments);

    if (shapeParams === undefined) {
        shapeParams = {
            x1: 10,
            y1: 20,
            x2: 40,
            y2: 20
        };
    }

    this.validateParams(shapeParams);

    this.x1 = shapeParams.x1;
    this.y1 = shapeParams.y1;
    this.x2 = shapeParams.x2;
    this.y2 = shapeParams.y2;
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;


Rectangle.prototype.validateParams = function (shapeParams) {
    if (!shapeParams.hasOwnProperty('x1') || !shapeParams.hasOwnProperty('y1') ||
        !shapeParams.hasOwnProperty('x2') || !shapeParams.hasOwnProperty('y2')) {
        throw ReferenceError("Rectangle params required");
    }
    if (shapeParams.x1 < 0 || shapeParams.y1 < 0 ||
        shapeParams.x2 < 0 || shapeParams.y2 < 0) {
        throw RangeError("Invalid rectangle params");
    }
};

Rectangle.prototype.calculateSides = function () {
    return [Math.abs(this.x2 - this.x1), Math.abs(this.y2 - this.y1)];
};

Rectangle.prototype.calculateArea = function () {
    let [a, b] = this.calculateSides();
    return parseFloat((a * b).toFixed(2));
};

Rectangle.prototype.calculatePerimeter = function () {
    let [a, b] = this.calculateSides();
    return parseFloat((2 * (a + b)).toFixed(2));
};

Rectangle.prototype.draw = function (canvasAreaId) {

    this.canvasAreaId = canvasAreaId;

    var canvas = document.getElementById(this.canvasAreaId);
    var context = canvas.getContext('2d');

    let [a, b] = this.calculateSides();

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.fillStyle = this.getFillColor();
    context.lineWidth = 0.5;
    context.strokeStyle = this.getBorderColor();

    context.fillRect(this.x1, this.y1, a, b);
    context.strokeRect(this.x1, this.y1, a, b);
};

module.exports = Rectangle;

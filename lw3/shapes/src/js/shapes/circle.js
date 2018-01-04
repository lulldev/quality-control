'use strict';

const Shape = require('./shape');

function Circle(shapeColorParams, shapeParams) {
    Shape.apply(this, arguments);

    if (shapeParams === undefined) {
        shapeParams = {
            radius: 50,
            centerX: 200,
            centerY: 200
        };
    }

    this.validateParams(shapeParams);

    this.radius = shapeParams.radius;
    this.centerX = shapeParams.centerX;
    this.centerY = shapeParams.centerY;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.validateParams = function (shapeParams) {
    if (!shapeParams.hasOwnProperty('radius') || !shapeParams.hasOwnProperty('centerX') ||
        !shapeParams.hasOwnProperty('centerY')) {
        throw ReferenceError("Circle params required");
    }

    if (shapeParams.radius < 0 || shapeParams.centerX < 0 || shapeParams.centerY < 0) {
        throw RangeError("Invalid circle params");
    }
};

Circle.prototype.calculateArea = function () {
    return parseFloat(Math.pow(Math.PI * this.radius, 2).toFixed(2));
};

Circle.prototype.calculatePerimeter = function () {
    return parseFloat((2 * Math.PI * this.radius).toFixed(2));
};

Circle.prototype.draw = function (canvasAreaId) {
    this.canvasAreaId = canvasAreaId;

    var canvas = document.getElementById(this.canvasAreaId);
    var context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = this.getFillColor();
    context.fill();
    context.lineWidth = 0.5;
    context.strokeStyle = this.getBorderColor();
    context.stroke();
};

module.exports = Circle;

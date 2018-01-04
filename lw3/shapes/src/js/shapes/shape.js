'use strict';

function Shape(shapeColorParams) {
    if (shapeColorParams === undefined) {
        shapeColorParams = {
            fillColorValue: '#fff',
            borderColorValue: '#000'
        };
    }

    this.validateColorParams(shapeColorParams);
    this.setFillColor(shapeColorParams.fillColorValue);
    this.setBorderColor(shapeColorParams.borderColorValue);
}

Shape.prototype.validateColorParams = function (shapeColorParams) {
    if (!shapeColorParams.hasOwnProperty('fillColorValue') || !shapeColorParams.hasOwnProperty('borderColorValue')) {
        throw ReferenceError('Shape colors params required');
    }

    if (!this.validateColor(shapeColorParams.fillColorValue) || !this.validateColor(shapeColorParams.borderColorValue)) {
        throw RangeError('Invalid shape colors');
    }
};

Shape.prototype.validateColor = function (expectedHexColor) {
    let regex = new RegExp('^(#)((?:[A-Fa-f0-9]{3}){1,2})$');
    return regex.test(expectedHexColor);
};

Shape.prototype.setFillColor = function (fillColorValue) {
    this.fillColor = fillColorValue;
};

Shape.prototype.getFillColor = function () {
    return this.fillColor;
};

Shape.prototype.setBorderColor = function (borderColorValue) {
    this.borderColor = borderColorValue;
};

Shape.prototype.getBorderColor = function () {
    return this.borderColor;
};

module.exports = Shape;

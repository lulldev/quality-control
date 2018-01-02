'use strict';

function CShape(shapeColorParams) {
    if (shapeColorParams === undefined)
    {
        shapeColorParams = {
            fillColorValue: "#fff",
            borderColorValue: "#000"
        };
    }

    this.validateColorParams(shapeColorParams);
    this.setFillColor(shapeColorParams.fillColorValue);
    this.setBorderColor(shapeColorParams.borderColorValue);
}

CShape.prototype.validateColorParams = function(shapeColorParams) {
    if (!shapeColorParams.hasOwnProperty('fillColorValue') || !shapeColorParams.hasOwnProperty('borderColorValue'))
    {
        throw ReferenceError("Shape colors params required");
    }

    if (!this.validateColor(shapeColorParams.fillColorValue) || !this.validateColor(shapeColorParams.borderColorValue))
    {
        throw RangeError("Invalid shape colors");
    }
};

CShape.prototype.validateColor = function(expectedHexColor) {
    let regex = new RegExp('^(#)((?:[A-Fa-f0-9]{3}){1,2})$');
    return regex.test(expectedHexColor);
};

CShape.prototype.setFillColor = function(fillColorValue) {
    fillColorValue != undefined ?
        this.fillColor = fillColorValue : this.fillColor = '#fff';
};

CShape.prototype.getFillColor = function() {
    return this.fillColor;
};

CShape.prototype.setBorderColor = function(borderColorValue) {
    borderColorValue != undefined ?
        this.borderColor = borderColorValue : this.borderColor = '#000';
};

CShape.prototype.getBorderColor = function() {
    return this.borderColor;
};

module.exports = CShape;

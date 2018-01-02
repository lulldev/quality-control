'use strict';

function ShapeProgram(canvasAreaId)
{
    canvasAreaId === undefined ?
        this.canvasAreaId = "canvas-area" : this.canvasAreaId = canvasArea;

    this.LoadScript('js/shapes/shape.js');
    this.LoadScript('js/shapes/circle.js');
    this.LoadScript('js/shapes/rectangle.js');
    this.LoadScript('js/shapes/shape.js');
    this.LoadScript('js/shapes/triangle.js');

    this.LoadScript('js/program/events.js');
}

/*
 Loader solution by joshuamabina
 http://stackoverflow.com/questions/950087/how-do-i-include-a-javascript-file-in-another-javascript-file
 */
ShapeProgram.prototype.LoadScript = function (url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
};

ShapeProgram.prototype.GetFormCollection =  function ()
{
    return {
        colorForm: document.getElementsByClassName('color-form')[0],
        circleForm: document.getElementsByClassName('circle-form')[0],
        rectangleForm: document.getElementsByClassName('rectangle-form')[0],
        triangleForm: document.getElementsByClassName('triangle-form')[0],
        actionControl: document.getElementsByClassName('action-control-btns')[0]
    };
};

ShapeProgram.prototype.ResetForm = function ()
{
    let controlForms = this.GetFormCollection();
    for (let formName in controlForms)
    {
        controlForms[formName].style.display = "none";
    }
};

ShapeProgram.prototype.UpdateAreaAndPerimeter = function (area, perimeter)
{
    document.getElementsByClassName('shape-area')[0].innerHTML = area;
    document.getElementsByClassName('shape-perimeter')[0].innerHTML = perimeter;
};

ShapeProgram.prototype.DisplayShape = function (shapeObj, shapeColorParams, shapeParams)
{
    let shape;

    try
    {
        shape = new shapeObj(shapeColorParams, shapeParams);
    }
    catch (e)
    {
        alert(e.message);
        return;
    }

    shape.draw(this.canvasAreaId);
    this.UpdateAreaAndPerimeter(shape.calculateArea(), shape.calculatePerimeter());
};






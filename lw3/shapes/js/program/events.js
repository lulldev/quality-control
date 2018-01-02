/**
 * Select shape type and show shape params form
 */
document.getElementsByClassName('shape-type')[0].addEventListener("change", function () {
    let shapeControlForms = shapeProgram.GetFormCollection();

    let selectedType = this.value.toString();

    switch (selectedType) {
        case "circle":
            shapeProgram.ResetForm();
            shapeControlForms.circleForm.style.display = "block";
            break;
        case "rectangle":
            shapeProgram.ResetForm();
            shapeControlForms.rectangleForm.style.display = "block";
            break;
        case "triangle":
            shapeProgram.ResetForm();
            shapeControlForms.triangleForm.style.display = "block";
            break;
    }

    shapeControlForms.colorForm.style.display = "block";
    shapeControlForms.actionControl.style.display = "block";

});

/**
 * Hide all control forms
 */
document.getElementsByClassName('reset-configurator')[0].addEventListener("click", function ()
{
    shapeProgram.ResetForm();
});

/**
 * Draw action
 */
document.getElementsByClassName('draw-shape')[0].addEventListener("click", function ()
{
    let selectedType = document.getElementsByClassName('shape-type')[0].value.toString();
    let shapeColorParams = {
        fillColorValue: document.getElementsByClassName('fill-color')[0].value.toString(),
        borderColorValue: document.getElementsByClassName('border-color')[0].value.toString()
    };
    let shapeParams = {};

        switch (selectedType) {
        case "circle":
            shapeParams = {
                radius: parseFloat(document.getElementsByClassName('radius')[0].value.toString()),
                centerX: parseFloat(document.getElementsByClassName('circle-x-coord')[0].value.toString()),
                centerY: parseFloat(document.getElementsByClassName('circle-y-coord')[0].value.toString())
            };
            shapeProgram.DisplayShape(CCircle, shapeColorParams, shapeParams);

            break;
        case "rectangle":
            shapeParams = {
                x1: parseFloat(document.getElementsByClassName('rectangle-x1-coord')[0].value.toString()),
                y1: parseFloat(document.getElementsByClassName('rectangle-y1-coord')[0].value.toString()),
                x2: parseFloat(document.getElementsByClassName('rectangle-x2-coord')[0].value.toString()),
                y2: parseFloat(document.getElementsByClassName('rectangle-y2-coord')[0].value.toString())
            };
            shapeProgram.DisplayShape(CRectangle, shapeColorParams, shapeParams);

            break;
        case "triangle":
            shapeParams = {
                x1: parseFloat(document.getElementsByClassName('triangle-x1-coord')[0].value.toString()),
                y1: parseFloat(document.getElementsByClassName('triangle-y1-coord')[0].value.toString()),
                x2: parseFloat(document.getElementsByClassName('triangle-x2-coord')[0].value.toString()),
                y2: parseFloat(document.getElementsByClassName('triangle-y2-coord')[0].value.toString()),
                x3: parseFloat(document.getElementsByClassName('triangle-x3-coord')[0].value.toString()),
                y3: parseFloat(document.getElementsByClassName('triangle-y3-coord')[0].value.toString())
            };
            shapeProgram.DisplayShape(CTriangle, shapeColorParams, shapeParams);

            break;
    }
});
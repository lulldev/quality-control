'use strict'

const CCircle = require('./circle');
const CRectangle = require('./rectangle');
const CTriangle = require('./triangle');

describe("CCircle testing", function () {

    describe("Init circle", function () {

        it("Init with wrong values", function () {

            expect(
                function () {
                    new CCircle({
                        wrongparam: '#ddd',
                        borderColorValue: '#ddd'
                    });
                }
            ).to.throw(ReferenceError, 'Shape colors params required');

            expect(
                function () {
                    new CCircle({
                        fillColorValue: 'ddd',
                        borderColorValue: '#ddd'
                    });
                }
            ).to.throw(RangeError, 'Invalid shape colors');

            expect(
                function () {
                    new CCircle({
                        fillColorValue: '#ddd',
                        borderColorValue: '#ddd'
                    });
                }
            ).to.not.throw();

            expect(
                function () {
                    new CCircle(
                        { fillColorValue: '#ddd', borderColorValue: '#ddd' },
                        { radius: -10, centerX: 20, centerY: 200 }
                    );
                }
            ).to.throw(RangeError);

        });

        it("Init with default values", function () {

            var circle = new CCircle();

            assert.equal(circle.radius, 50);
            assert.equal(circle.centerX, 200);
            assert.equal(circle.centerY, 200);
            assert.equal(circle.fillColor, '#fff');
            assert.equal(circle.borderColor, '#000');
        });

        it("Init with optional values", function () {

            var circle = new CCircle(
                { fillColorValue: '#ccc', borderColorValue: '#000' },
                { radius: 10, centerX: 20, centerY: 200 }
            );

            assert.equal(circle.radius, 10);
            assert.equal(circle.centerX, 20);
            assert.equal(circle.centerY, 200);
            assert.equal(circle.fillColor, '#ccc');
            assert.equal(circle.borderColor, '#000');
        });

    });

    describe("Calculations", function () {

        var circle = new CCircle(
            { fillColorValue: '#ccc', borderColorValue: '#000' },
            { radius: 10, centerX: 20, centerY: 200 }
        );

        it("Calculate perimeter", function () {
            assert.typeOf(circle.calculatePerimeter(), 'number');
            assert.equal(circle.calculatePerimeter(), 62.83);
        });

        it("Calculate area", function () {
            assert.typeOf(circle.calculateArea(), 'number');
            assert.equal(circle.calculateArea(), 986.96)
        });
    });

});

////////////////////////////////////////////////////////////////////////////


describe("CRectangle testing", function () {

    describe("Init rectangle", function () {

        it("Init with wrong values", function () {

            expect(
                function () {
                    new CRectangle({
                        wrongparam: '#ddd',
                        borderColorValue: '#ddd'
                    });
                }
            ).to.throw(ReferenceError, 'Shape colors params required');

            expect(
                function () {
                    new CRectangle({
                        fillColorValue: 'ddd',
                        borderColorValue: '#ddd'
                    });
                }
            ).to.throw(RangeError, 'Invalid shape colors');

            expect(
                function () {
                    new CRectangle({
                        fillColorValue: '#ddd',
                        borderColorValue: '#ddd'
                    });
                }
            ).to.not.throw();

            expect(
                function () {
                    new CRectangle(
                        { fillColorValue: '#ddd', borderColorValue: '#ddd' },
                        { x1: -10, y1: 20, x2: 200, y2: -1 }
                    );
                }
            ).to.throw(RangeError, "Invalid rectangle params");

        });

        it("Init with default values", function () {

            var rectangle = new CRectangle();
            assert.equal(rectangle.x1, 10);
            assert.equal(rectangle.y2, 20);
            assert.equal(rectangle.x2, 40);
            assert.equal(rectangle.y2, 20);
            assert.equal(rectangle.fillColor, '#fff');
            assert.equal(rectangle.borderColor, '#000');
        });

        it("Init with optional values", function () {

            var rectangle = new CRectangle(
                { fillColorValue: '#ccc', borderColorValue: '#000' },
                { x1: 100, y1: 200, x2: 300, y2: 200 }
            );
            assert.equal(rectangle.x1, 100);
            assert.equal(rectangle.y2, 200);
            assert.equal(rectangle.x2, 300);
            assert.equal(rectangle.y2, 200);
            assert.equal(rectangle.fillColor, '#ccc');
            assert.equal(rectangle.borderColor, '#000');
        });

    });

    describe("Calculations", function () {

        var rectangle = new CRectangle(
            { fillColorValue: '#ccc', borderColorValue: '#000' },
            { x1: 10, y1: 20, x2: 50, y2: 30 }
        );

        it("Calculate sides", function () {
            assert.typeOf(rectangle.calculateSides(), 'array');
            assert.equal(rectangle.calculateSides().join(), '40,10');
        });

        it("Calculate perimeter", function () {
            assert.typeOf(rectangle.calculatePerimeter(), 'number');
            assert.equal(rectangle.calculatePerimeter(), 100);
        });

        it("Calculate area", function () {
            assert.typeOf(rectangle.calculateArea(), 'number');
            assert.equal(rectangle.calculateArea(), 400)
        });
    });

});

describe("CTriangle testing", function () {

    describe("Init triangle", function () {

        it("Init with wrong values", function () {

            expect(
                function () {
                    new CTriangle({
                        wrongparam: '#ddd',
                        borderColorValue: '#ddd'
                    });
                }
            ).to.throw(ReferenceError, 'Shape colors params required');

            expect(
                function () {
                    new CTriangle({
                        fillColorValue: 'ddd',
                        borderColorValue: '#ddd'
                    });
                }
            ).to.throw(RangeError, 'Invalid shape colors');

            expect(
                function () {
                    new CTriangle({
                        fillColorValue: '#ddd',
                        borderColorValue: '#ddd'
                    });
                }
            ).to.not.throw();

            expect(
                function () {
                    new CTriangle(
                        { fillColorValue: '#ddd', borderColorValue: '#ddd' },
                        { x1: -10, y1: 20, x2: 200, y2: -1, x3: 20, y3: 100 }
                    );
                }
            ).to.throw(RangeError, "Invalid triangle params");

        });

        it("Init with default values", function () {

            var triangle = new CTriangle();
            assert.equal(triangle.x1, 10);
            assert.equal(triangle.y2, 20);
            assert.equal(triangle.x2, 40);
            assert.equal(triangle.y2, 20);
            assert.equal(triangle.x3, 50);
            assert.equal(triangle.y3, 60);
            assert.equal(triangle.fillColor, '#fff');
            assert.equal(triangle.borderColor, '#000');
        });

        it("Init with optional values", function () {

            var triangle = new CTriangle(
                { fillColorValue: '#ccc', borderColorValue: '#000' },
                { x1: 100, y1: 200, x2: 300, y2: 200, x3: 400, y3: 500 }
            );

            assert.equal(triangle.x1, 100);
            assert.equal(triangle.y1, 200);
            assert.equal(triangle.x2, 300);
            assert.equal(triangle.y2, 200);
            assert.equal(triangle.x3, 400);
            assert.equal(triangle.y3, 500);
            assert.equal(triangle.fillColor, '#ccc');
            assert.equal(triangle.borderColor, '#000');
        });

    });

    describe("Calculations", function () {

        var triangle = new CTriangle('#ccc', '#000', 10, 20, 50, 30, 50, 60);

        it("Calculate sides", function () {
            assert.typeOf(triangle.calculateSides(), 'array');
            assert.equal(triangle.calculateSides().join(), '3.080070288241023,2.340347319320716,3.5565588200778455');
        });

        it("Calculate perimeter", function () {
            assert.typeOf(triangle.calculatePerimeter(), 'number');
            assert.equal(triangle.calculatePerimeter(), 17.95);
        });

        it("Calculate area", function () {
            assert.typeOf(triangle.calculateArea(), 'number');
            assert.equal(triangle.calculateArea(), 244.89)
        });
    });

});

'use strict'

const Circle = require('./circle');
const Rectangle = require('./rectangle');
const Triangle = require('./triangle');

describe('Circle testing', () => {

    describe('Init circle', () => {

        it('Init with wrong values', () => {

            expect(() => {
                new Circle({
                    wrongparam: '#ddd',
                    borderColorValue: '#ddd'
                });
            }
            ).to.throw(ReferenceError, 'Shape colors params required');

            expect(() => {
                new Circle({
                    fillColorValue: 'ddd',
                    borderColorValue: '#ddd'
                });
            }
            ).to.throw(RangeError, 'Invalid shape colors');

            expect(() => {
                new Circle({
                    fillColorValue: '#ddd',
                    borderColorValue: '#ddd'
                });
            }
            ).to.not.throw();

            expect(() => {
                new Circle({
                    fillColorValue: '#ddd',
                    borderColorValue: '#ddd'
                }, { centerX: 20, centerY: 200});
            }
            ).to.throw(ReferenceError, 'Circle params required');

            expect(() => {
                new Circle({
                    fillColorValue: '#ddd',
                    borderColorValue: '#ddd'
                }, {
                        radius: -10,
                        centerX: 20,
                        centerY: 200
                    });
            }
            ).to.throw(RangeError);
        });

        it('Init with default values', () => {

            const circle = new Circle();

            assert.equal(circle.radius, 50);
            assert.equal(circle.centerX, 200);
            assert.equal(circle.centerY, 200);
            assert.equal(circle.getFillColor(), '#fff');
            assert.equal(circle.getBorderColor(), '#000');
        });

        it('Init with optional values', () => {

            const circle = new Circle({
                fillColorValue: '#ccc',
                borderColorValue: '#000'
            }, {
                    radius: 10,
                    centerX: 20,
                    centerY: 200
                });

            assert.equal(circle.radius, 10);
            assert.equal(circle.centerX, 20);
            assert.equal(circle.centerY, 200);
            assert.equal(circle.fillColor, '#ccc');
            assert.equal(circle.borderColor, '#000');
        });

    });

    describe('Calculations', () => {

        const circle = new Circle({
            fillColorValue: '#ccc',
            borderColorValue: '#000'
        }, {
                radius: 10,
                centerX: 20,
                centerY: 200
            });

        it('Calculate perimeter', () => {
            assert.typeOf(circle.calculatePerimeter(), 'number');
            assert.equal(circle.calculatePerimeter(), 62.83);
        });

        it('Calculate area', () => {
            assert.typeOf(circle.calculateArea(), 'number');
            assert.equal(circle.calculateArea(), 986.96)
        });
    });


});


describe('Rectangle testing', () => {

    describe('Init Rectangle', () => {

        it('Init with wrong values', () => {

            expect(() => {
                new Rectangle({
                    wrongparam: '#ddd',
                    borderColorValue: '#ddd'
                });
            }
            ).to.throw(ReferenceError, 'Shape colors params required');

            expect(() => {
                new Rectangle({
                    fillColorValue: 'ddd',
                    borderColorValue: '#ddd'
                });
            }
            ).to.throw(RangeError, 'Invalid shape colors');

            expect(() => {
                new Rectangle({
                    fillColorValue: '#ddd',
                    borderColorValue: '#ddd'
                });
            }
            ).to.not.throw();

            expect(() => {
                new Rectangle({
                    fillColorValue: '#ddd',
                    borderColorValue: '#ddd'
                }, {y1: 20, x2: 200, y2: -1 });
            }
            ).to.throw(ReferenceError, 'Rectangle params required');

            expect(() => {
                new Rectangle({
                    fillColorValue: '#ddd',
                    borderColorValue: '#ddd'
                }, { x1: -10, y1: 20, x2: 50, y2: 30 });
            }
            ).to.throw(RangeError, 'Invalid rectangle params');
        });

        it('Init with default values', () => {

            const rectangle = new Rectangle();
            assert.equal(rectangle.x1, 10);
            assert.equal(rectangle.y2, 20);
            assert.equal(rectangle.x2, 40);
            assert.equal(rectangle.y2, 20);
            assert.equal(rectangle.getFillColor(), '#fff');
            assert.equal(rectangle.getBorderColor(), '#000');
        });

        it('Init with optional values', () => {

            const rectangle = new Rectangle(
                { fillColorValue: '#ccc', borderColorValue: '#000' },
                { x1: 100, y1: 200, x2: 300, y2: 200 }
            );
            assert.equal(rectangle.x1, 100);
            assert.equal(rectangle.y2, 200);
            assert.equal(rectangle.x2, 300);
            assert.equal(rectangle.y2, 200);
            assert.equal(rectangle.getFillColor(), '#ccc');
            assert.equal(rectangle.getBorderColor(), '#000');
        });

    });

    describe('Calculations', function () {

        const rectangle = new Rectangle(
            { fillColorValue: '#ccc', borderColorValue: '#000' },
            { x1: 10, y1: 20, x2: 50, y2: 30 }
        );

        it('Calculate sides', function () {
            assert.typeOf(rectangle.calculateSides(), 'array');
            assert.equal(rectangle.calculateSides().join(), '40,10');
        });

        it('Calculate perimeter', function () {
            assert.typeOf(rectangle.calculatePerimeter(), 'number');
            assert.equal(rectangle.calculatePerimeter(), 100);
        });

        it('Calculate area', function () {
            assert.typeOf(rectangle.calculateArea(), 'number');
            assert.equal(rectangle.calculateArea(), 400)
        });
    });
});

describe('Triangle testing', () => {

    describe('Init triangle', () => {

        it('Init with wrong values', () => {

            expect(() => {
                new Triangle({
                    wrongparam: '#ddd',
                    borderColorValue: '#ddd'
                });
            }
            ).to.throw(ReferenceError, 'Shape colors params required');

            expect(() => {
                new Triangle({
                    fillColorValue: 'ddd',
                    borderColorValue: '#ddd'
                });
            }
            ).to.throw(RangeError, 'Invalid shape colors');

            expect(() => {
                new Triangle({
                    fillColorValue: '#ddd',
                    borderColorValue: '#ddd'
                });
            }
            ).to.not.throw();

            expect(() => {
                new Triangle({
                    fillColorValue: '#ddd',
                    borderColorValue: '#ddd'
                }, {y1: 20, x2: 200, y2: -1, x3: 20, y3: 100 });
            }
            ).to.throw(ReferenceError, 'Triangle params required');

            expect(() => {
                new Triangle({
                    fillColorValue: '#ddd',
                    borderColorValue: '#ddd'
                }, { x1: -10, y1: 20, x2: 200, y2: -1, x3: 20, y3: 100 });
            }
            ).to.throw(RangeError, 'Invalid triangle params');
        });

        it('Init with default values', () => {
           const triangle = new Triangle();
            assert.equal(triangle.x1, 10);
            assert.equal(triangle.y2, 20);
            assert.equal(triangle.x2, 40);
            assert.equal(triangle.y2, 20);
            assert.equal(triangle.x3, 50);
            assert.equal(triangle.y3, 60);
            assert.equal(triangle.getFillColor(), '#fff');
            assert.equal(triangle.getBorderColor(), '#000');
        });

        it('Init with optional values', () => {

            const triangle = new Triangle(
                { fillColorValue: '#ccc', borderColorValue: '#000' },
                { x1: 100, y1: 200, x2: 300, y2: 200, x3: 400, y3: 500 }
            );

            assert.equal(triangle.x1, 100);
            assert.equal(triangle.y1, 200);
            assert.equal(triangle.x2, 300);
            assert.equal(triangle.y2, 200);
            assert.equal(triangle.x3, 400);
            assert.equal(triangle.y3, 500);
            assert.equal(triangle.getFillColor(), '#ccc');
            assert.equal(triangle.getBorderColor(), '#000');
        });

    });

    describe('Calculations', function () {

        const triangle = new Triangle({
            fillColorValue: '#ccc',
            borderColorValue: '#000'
        }, { x1: 10, y1: 20, x2: 50, y2: 30, x3: 50, y3: 60 });

        it('Calculate sides', function () {
            assert.typeOf(triangle.calculateSides(), 'array');
            assert.equal(triangle.calculateSides().join(), '3.080070288241023,2.340347319320716,3.5565588200778455');
        });

        it('Calculate perimeter', function () {
            assert.typeOf(triangle.calculatePerimeter(), 'number');
            assert.equal(triangle.calculatePerimeter(), 17.95);
        });

        it('Calculate area', function () {
            assert.typeOf(triangle.calculateArea(), 'number');
            assert.equal(triangle.calculateArea(), 244.89)
        });
    });

});

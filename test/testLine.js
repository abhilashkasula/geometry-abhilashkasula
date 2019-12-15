const { assert } = require("chai");
const Line = require("../src/line");
const Point = require("../src/point");

describe("Line", function() {
  describe("toString", function() {
    it("should give a string representation of line", function() {
      const line = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      assert.strictEqual(line.toString(), `[Line (1,2) to (4,5)]`);
    });
  });

  describe("isEqualTo", function() {
    it("should determine true for two line ends and instances are same", function() {
      const line = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      assert.isOk(line.isEqualTo(line));
    });
    it("should determine false for two line ends are not same but instances", function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 3, y: 5 });
      const line2 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      assert.isNotOk(line1.isEqualTo(line2));
    });
    it("should determine false for two line ends are same but not instances", function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 4, y: 5 });
      const line2 = { endA: { x: 1, y: 2 }, endB: { x: 4, y: 5 } };
      assert.isNotOk(line1.isEqualTo(line2));
    });
    it("should determine false for two line ends and instances are not same", function() {
      const line1 = new Line({ x: 1, y: 2 }, { x: 3, y: 5 });
      const line2 = { endA: { x: 1, y: 2 }, endB: { x: 4, y: 5 } };
      assert.isNotOk(line1.isEqualTo(line2));
    });
  });

  describe("length", function() {
    it("should give the length of the line for positive coordinates", function() {
      const line = new Line({ x: 3, y: 2 }, { x: 7, y: 8 });
      assert.approximately(line.length, 7.21, 0.3);
    });
    it("should give the zero for the line having same points", function() {
      const line = new Line({ x: 3, y: 2 }, { x: 3, y: 2 });
      assert.strictEqual(line.length, 0);
    });
  });

  describe("isParallelTo", function() {
    it("should determine true for lines parallel when coordinates are positive", function() {
      const line1 = new Line({ x: 0, y: 0 }, { x: 0, y: 4 });
      const line2 = new Line({ x: 4, y: 0 }, { x: 4, y: 4 });
      assert.isOk(line1.isParallelTo(line2));
    });
    it("should determine true for lines parallel when coordinates are negative", function() {
      const line1 = new Line({ x: 0, y: -2 }, { x: 0, y: 4 });
      const line2 = new Line({ x: 4, y: -2 }, { x: 4, y: 4 });
      assert.isOk(line1.isParallelTo(line2));
    });
    it("should determine false for lines not parallel when coordinates are positive.", function() {
      const line1 = new Line({ x: 0, y: 0 }, { x: 0, y: 4 });
      const line2 = new Line({ x: 1, y: 2 }, { x: 3, y: 3 });
      assert.isNotOk(line1.isParallelTo(line2));
    });
    it("should determine false for lines parallel when coordinates are negative", function() {
      const line1 = new Line({ x: 0, y: -2 }, { x: -1, y: 4 });
      const line2 = new Line({ x: 4, y: -2 }, { x: 4, y: 4 });
      assert.isNotOk(line1.isParallelTo(line2));
    });
    it("should determine false for lines having same coordinates.", function() {
      const line = new Line({ x: 0, y: -2 }, { x: -1, y: 4 });
      assert.isNotOk(line.isParallelTo(line));
    });
    it("should determine false for 2 different type of lines.", function() {
      const line1 = new Line({ x: 0, y: -2 }, { x: -1, y: 4 });
      const line2 = { endA: { x: 0, y: -2 }, endB: { x: -1, y: 4 } };
      assert.isNotOk(line1.isParallelTo(line2));
    });
  });

  describe("slope", function() {
    it("should give slope of a line for positive coordinates", function() {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 3 });
      assert.strictEqual(line.slope, 0.5);
    });
    it("should give slope of a line for negative coordinates", function() {
      const line = new Line({ x: -1, y: -2 }, { x: 3, y: 3 });
      assert.strictEqual(line.slope, 1.25);
    });
  });

  describe("findX", function() {
    it("should give x-coordinate of a point when y is given positive", function() {
      const line = new Line({ x: 5, y: 5 }, { x: 1, y: 2 });
      assert.approximately(line.findX(3), 2.3, 0.2);
    });
    it("should give x-coordinate of a point when y is given negative", function() {
      const line = new Line({ x: -5, y: -3 }, { x: -1, y: -4 });
      assert.approximately(line.findX(-3), -5, 0.2);
    });
    it("should give first end x when y-coordinates of given point and first end are equal", () => {
      const line = new Line({ x: 5, y: 2 }, { x: 1, y: 5 });
      assert.strictEqual(line.findX(2), 5);
    });
    it("should give second end x when y-coordinates of given point and second end are equal", () => {
      const line = new Line({ x: 5, y: 2 }, { x: 1, y: 5 });
      assert.strictEqual(line.findX(5), 1);
    });
    it("should give NaN for point y greater than line segment", () => {
      const line = new Line({ x: 5, y: 2 }, { x: 1, y: 5 });
      assert.isNaN(line.findX(6));
    });
    it("should give NaN for point y lesser than line segment", () => {
      const line = new Line({ x: 5, y: 2 }, { x: 1, y: 5 });
      assert.isNaN(line.findX(1));
    });
    it("should give end A x when the y-coordinates of both ends are equal", () => {
      const line = new Line({ x: 4, y: 2 }, { x: 6, y: 2 });
      assert.strictEqual(line.findX(2), 4);
    });
  });

  describe("findY", function() {
    it("should give y-coordinate of a point when x is given positive", function() {
      const line = new Line({ x: 5, y: 2 }, { x: 1, y: 5 });
      assert.strictEqual(line.findY(2), 4.25);
    });
    it("should give y-coordinate of a point when x is given negative", function() {
      const line = new Line({ x: -5, y: -3 }, { x: -1, y: -4 });
      assert.strictEqual(line.findY(-3), -3.5);
    });
    it("should give first end y when x-coordinates of given point and first end are equal", () => {
      const line = new Line({ x: 1, y: 1 }, { x: 3, y: 2 });
      assert.strictEqual(line.findY(1), 1);
    });
    it("should give second end y when y-coordinates of given point and second end are equal", () => {
      const line = new Line({ x: 1, y: 1 }, { x: 3, y: 2 });
      assert.strictEqual(line.findY(1), 1);
    });
    it("should give NaN for point x greater than line segment", () => {
      const line = new Line({ x: 2, y: 5 }, { x: 5, y: 1 });
      assert.isNaN(line.findY(6));
    });
    it("should give NaN for point x lesser than line segment", () => {
      const line = new Line({ x: 2, y: 5 }, { x: 5, y: 1 });
      assert.isNaN(line.findY(0));
    });
    it("should give end A y when the x-coordinates of both ends are equal", () => {
      const line = new Line({ x: 2, y: 4 }, { x: 2, y: 6 });
      assert.strictEqual(line.findY(2), 4);
    });
  });

  describe("split", function() {
    it("should give two lines that are split by midpoint for positive coordinates", function() {
      const line = new Line({ x: 4, y: 4 }, { x: 8, y: 8 });
      const line1 = new Line({ x: 4, y: 4 }, { x: 6, y: 6 });
      const line2 = new Line({ x: 6, y: 6 }, { x: 8, y: 8 });
      assert.deepStrictEqual(line.split(), [line1, line2]);
    });
    it("should give two lines that are split by midpoint for negative coordinates", function() {
      const line = new Line({ x: -4, y: -4 }, { x: 8, y: 8 });
      const line1 = new Line({ x: -4, y: -4 }, { x: 2, y: 2 });
      const line2 = new Line({ x: 2, y: 2 }, { x: 8, y: 8 });
      assert.deepStrictEqual(line.split(), [line1, line2]);
    });
    it("should give two lines that are split by midpoint for odd coordinates", function() {
      const line = new Line({ x: 3, y: 4 }, { x: 8, y: 8 });
      const line1 = new Line({ x: 3, y: 4 }, { x: 5.5, y: 6 });
      const line2 = new Line({ x: 5.5, y: 6 }, { x: 8, y: 8 });
      assert.deepStrictEqual(line.split(), [line1, line2]);
    });
  });

  describe("hasPoint", function() {
    it("should determine true for the point on the line segment", function() {
      const line = new Line({ x: 4, y: 4 }, { x: 8, y: 8 });
      const point = new Point(6, 6);
      assert.isOk(line.hasPoint(point));
    });
    it("should determine false for the point not on the line segment", function() {
      const line = new Line({ x: 4, y: 4 }, { x: 8, y: 8 });
      const point = new Point(4, 6);
      assert.isNotOk(line.hasPoint(point));
    });
    it("should determine false for the give point is not an instance of Point", function() {
      const line = new Line({ x: 4, y: 4 }, { x: 8, y: 8 });
      const point = { x: 4, y: 6 };
      assert.isNotOk(line.hasPoint(point));
    });
  });
});

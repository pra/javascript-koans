function Bad(arg) {
    this.arg = arg;
}




var globalThis = this;

describe("About prototype", function() {
    beforeEach(function() {
	this.newBad = new Bad("hello");
	this.funcBad = Bad("hello");
    });

    it("should show that new is different than function", function() {
	expect(this.newBad).not.toEqual(this.funcBad);
    });

    it("should polute the global namespace when "class" functions are invoked without", function() {
	expect(globalThis.arg).toBe("hello");
    });
});
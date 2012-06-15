function Muppet(age, hobby) {
  this.age = age;
  this.hobby = hobby; 
  
  this.answerNanny = function(){
	return "Everything's cool!";
  }
}

function SwedishChef(age, hobby, mood) {
  Muppet.call(this, age, hobby);
  this.mood = mood;
  
  this.cook = function() {
    return "Mmmm soup!";
  }
}

SwedishChef.prototype = new Muppet();

describe("About inheritance", function() {
  beforeEach(function(){
    this.muppet = new Muppet(2, "coding");
    this.swedishChef = new SwedishChef(2, "cooking", "chillin");
    this.swedishChef2 = new SwedishChef(4, "cooking", "chillin");
  });
  
  it("should be able to call a method on the derived object", function() {
    expect(this.swedishChef.cook()).toEqual("Mmmm soup!");
  });
  
  it("should be able to call a method on the base object", function() {
    expect(this.swedishChef.answerNanny()).toEqual("Everything's cool!");
  });
  
  it("should set constructor parameters on the base object", function() {
    expect(this.swedishChef.age).toEqual(2);
    expect(this.swedishChef.hobby).toEqual("cooking");
  });
  
  it("should set constructor parameters on the derived object", function() {
    expect(this.swedishChef.mood).toEqual("chillin");
  });

    it("should not be able to get inherited stuf from base object", function() {
	expect(this.muppet.mood).toBe(undefined);
    });

    it("prototype should not leek between object instances", function() {
	expect(this.swedishChef.age).toEqual(2);
        expect(this.swedishChef2.age).toEqual(4);
    });
});

// http://javascript.crockford.com/prototypal.html
Object.prototype.beget = function () {
  function F() {}
  F.prototype = this;
  return new F();
}

function Gonzo(age, hobby, trick) {
  Muppet.call(this, age, hobby);
  this.trick = trick;
  
  this.doTrick = function() {
    return this.trick;
  }
}

//no longer need to call the Muppet (base type) constructor
Gonzo.prototype = Muppet.prototype.beget();

describe("About Crockford's inheritance improvement", function() {
  beforeEach(function(){
  this.gonzo = new Gonzo(3, "daredevil performer", "eat a tire");
  });
  
  it("should be able to call a method on the derived object", function() {
    expect(this.gonzo.doTrick()).toEqual("eat a tire");
  });
  
  it("should be able to call a method on the base object", function() {
    expect(this.gonzo.answerNanny()).toEqual("Everything's cool!");
  });
  
  it("should set constructor parameters on the base object", function() {
    expect(this.gonzo.age).toEqual(3);
    expect(this.gonzo.hobby).toEqual("daredevil performer");
  });
  
  it("should set constructor parameters on the derived object", function() {
    expect(this.gonzo.trick).toEqual("eat a tire");
  });
});


function Bad(arg) {
    this.arg = arg;
}

var globalThis = this;

var  muppet = {
    age: 2,
    hobby: "coding", 
  
    answerNanny: function(){
	return "Everything's cool!";
  }
};

var swedishChef = Object.create(muppet); //mupet is prototype 
// extend mupper
swedishChef.hobby = "cooking";
swedishChef.mood = "chilling";
swedishChef.cook = function() {
    return "Mmmm soup!";
};

describe("About prototypical inheritance", function() {
    beforeEach(function() {
	this.newBad = new Bad("hello");
	this.funcBad = Bad("hello");
	this.muppet2 =  Object.create(muppet);
	this.swedishChef2 = Object.create(swedishChef);
	this.swedishChef3 = Object.create(swedishChef);
	this.swedishChef3.age = 4;
	this.swedishChef3.mood = "chillin";
    });

    it("should show that new is different than function", function() {
	expect(this.newBad).not.toEqual(this.funcBad);
    });

    it("should polute the global namespace when 'class' functions are invoked without", function() {
	expect(globalThis.arg).toBe("hello");
    });

    it("should be able to call a method on the derived object", function() {
	expect(this.swedishChef2.cook()).toEqual("Mmmm soup!");
    });
    
    it("should be able to call a method on the base object", function() {
	expect(this.swedishChef2.answerNanny()).toEqual("Everything's cool!");
    });
    
    it("should have the base object properties", function() {
	expect(this.swedishChef2.age).toEqual(2);
	expect(this.swedishChef2.hobby).toEqual("cooking");
    });
    
    it("should have the derived object properties", function() {
	expect(this.swedishChef2.mood).toEqual("chilling");
    });
    
    it("should not be able to get inherited stuf from base object", function() {
	expect(this.muppet2.mood).toBe(undefined);
    });
    
    it("should override set properties", function() {
        expect(this.swedishChef3.age).toEqual(4);
    });
    
});

function muppet_f(spec) {
    var that = {};
    
    that.getAge = function() {
	return spec.age;
    };
    
    that.getHobby = function() {
	return spec.hobby;
    };

    that.answerNanny = function() {
	return "Everything's cool!";
    }
    return that;
}

function swedishChef_f(spec) {
    var that = muppet_f(spec);

    that.getMood = function() {
	return spec.mood;
    };

    that.cook = function() {
	return "Mmmm soup!";
    };
    return that;
}

describe("About functional inheritance", function() {
    beforeEach(function() {
	this.muppet2 =  muppet_f({age:2, hobby: "coding"});
	this.swedishChef2 = swedishChef_f({age:2, hobby: "cooking", mood:"chilling"});
	this.swedishChef3 = swedishChef_f({age:4, hobby: "cooking", mood:"chillin"});
    });

    it("should be able to get properties", function() {
	expect(this.muppet2.getAge()).toEqual(2);
	expect(this.muppet2.getHobby()).toEqual("coding");
    });

    it("should be able to call a method on the derived object", function() {
	expect(this.swedishChef2.cook()).toEqual("Mmmm soup!");
    });
    
    it("should be able to call a method on the base object", function() {
	expect(this.swedishChef2.answerNanny()).toEqual("Everything's cool!");
    });
    
    it("should have the base object properties", function() {
	expect(this.swedishChef2.getAge()).toEqual(2);
	expect(this.swedishChef2.getHobby()).toEqual("cooking");
    });
    
    it("should have the derived object properties", function() {
	expect(this.swedishChef2.getMood()).toEqual("chilling");
    });

    it("should be able to inspect if a function exists", function() {
	expect(this.swedishChef2.getMood).not.toBe(undefined);
    });
    
    it("should not be able to get inherited stuf into base object", function() {
	expect(this.muppet2.getMood).toBe(undefined);
    });
    
    it("should override set properties", function() {
        expect(this.swedishChef3.getAge()).toEqual(4);
    });
});
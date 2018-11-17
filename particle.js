//requires: vector3.js color.js

//class
(function() {
    "use strict";
    
    //constructor
    const Particle = function(x = 0, y = 0, z = 0, r = 1) {
        this.position = new Vector3(x, y, z);
        this.color = new Color();
        this.radius = r;
    };
    
    const proto = Particle.prototype;
    
    proto.clone = function() {
        const copy = new Particle(this.position.x, this.position.y, this.position.z, this.radius);
        copy.color.set(this.color.r, this.color.g, this.color.b, this.color.a);
        
        return copy;
    };
    
    particlejs.Particle = Particle;
})();
//requires: vector3.js color.js

//class
(function() {
    "use strict";
    
    //constructor
    const Particle = function(x = 0, y = 0, z = 0, r = 1) {
        this.position = new Vector3(x, y, z);
        this.color = new Color();
        this.radius = r;
    }
    
    const proto = Particle.prototype;
    
    particlejs.Particle = Particle;
});
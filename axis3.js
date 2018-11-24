//requires: vector3.js

/* The Axis3 class stores three Vector3 values, one for each axis. 
 * These vectors are to always have a magnitude of 1 and are 
 * used in converting between different coordinate frames.
 */

//class
(function() {
    "use strict";
    
    //shortcuts
    const Vector3 = particlejs.Vector3;

    //constructor
    const Axis3 = function() {
        this.x = new Vector3(1, 0, 0);
        this.y = new Vector3(0, 1, 0);
        this.z = new Vector3(0, 0, 1);
    };
    
    const proto = Axis3.prototype;
    
    proto.rotate = function(tx, ty, tz) {
        this.z.rotate(tx, ty, tz);
        this.y.rotate(tx, ty, tz);
        this.x.rotate(tx, ty, tz);
        
        return this;
    };
    
    proto.reset = function(tx, ty, tz) {
        this.x.x = 1;
        this.x.y = 0;
        this.x.z = 0;
        
        this.y.x = 0;
        this.y.y = 1;
        this.y.z = 0;
        
        this.z.x = 0;
        this.z.y = 0;
        this.z.z = 1;
        
        return this;
    };
    
    particlejs.Axis3 = Axis3;
})();
//namespace
this.particlejs = this.particlejs || {};

//class
(function() {
    "use strict";

    //constructor
    const Vector3 = function(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    };
    
    const proto = Vector3.prototype;
    
    proto.rotateZ = function(t) {
        const cosT = Math.cos(t);
        const sinT = Math.sin(t);

        const x1 = this.x * cosT - this.y * sinT;
        const y1 = this.x * sinT + this.y * cosT;
        this.x = x1;
        this.y = y1;

        return this;
    };
    
    proto.rotateY = function(t) {
        const cosT = Math.cos(t);
        const sinT = Math.sin(t);

        const z1 = this.z * cosT - this.x * sinT;
        const x1 = this.z * sinT + this.x * cosT;
        this.z = z1;
        this.x = x1;

        return this;
    };
    
    proto.rotateX = function(t) {
        const cosT = Math.cos(t);
        const sinT = Math.sin(t);

        const y1 = this.y * cosT - this.z * sinT;
        const z1 = this.y * sinT + this.z * cosT;
        this.y = y1;
        this.z = z1;

        return this;
    };
    
    proto.rotate = function(tx, ty, tz) {
        if (tz) this.rotateZ(tz);
        if (ty) this.rotateY(ty);
        if (tx) this.rotateX(tx);
        
        return this;
    };
    
    proto.clone = function(target) {
        target = target || new ctor();
        target.pos = this.pos.slice();
        target.radius = this.radius;
        
        return target;
    };
    
    proto.add = function(otherV3) {
        this.x += otherV3.x;
        this.y += otherV3.y;
        this.z += otherV3.z;
        
        return this;
    };
    
    proto.scale = function(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        
        return this;
    };
    
    particlejs.Vector3 = Vector3;
});
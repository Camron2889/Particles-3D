//namespace
this.particlejs = this.particlejs || {};
particlejs._precomp = particlejs._precomp || {};

//class
(function() {
    "use strict";
    
    const Point = function(x = 0, y = 0, z = 0, r = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    const proto = Point.prototype;
    
    particlejs.Point = Point;
});
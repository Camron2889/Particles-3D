//namespace
this.particlejs = this.particlejs || {};

//class
(function() {
    "use strict";

    //constructor
    const Vector3 = function(x = 0, y = 0, z = 0) {
        this.pos = [x, y, z];
    };
    
    const proto = ctor.prototype;
    
    proto.rotateZ = function(t) {
      const pos = this.pos;
      const x1 = pos[0] * Math.cos(t) - pos[1] * Math.sin(t);
      const y1 = pos[0] * Math.sin(t) + pos[1] * Math.cos(t);
      pos[0] = x1;
      pos[1] = y1;
    };
    
    proto.rotateY = function(t) {
      const pos = this.pos;
      const z1 = pos[2] * Math.cos(t) - pos[0] * Math.sin(t);
      const x1 = pos[2] * Math.sin(t) + pos[0] * Math.cos(t);
      pos[2] = z1;
      pos[0] = x1;
    };
    
    proto.rotateX = function(t) {
      const pos = this.pos;
      const y1 = pos[1] * Math.cos(t) - pos[2] * Math.sin(t);
      const z1 = pos[1] * Math.sin(t) + pos[2] * Math.cos(t);
      pos[1] = y1;
      pos[2] = z1;
    };
    
    proto.rotate = function(tx, ty, tz) {
      if (tz) this.rotateZ(tz);
      if (ty) this.rotateY(ty);
      if (tx) this.rotateX(tx);
    };
    
    proto.clone = function(target) {
      target = target || new ctor();
      target.pos = this.pos.slice();
      target.radius = this.radius;
      return target;
    };
    
    proto.add = function(otherV3) {
      this.pos[0] += otherV3.pos[0];
      this.pos[1] += otherV3.pos[1];
      this.pos[2] += otherV3.pos[2];
      return this;
    };
    
    proto.scale = function(s) {
      this.pos[0] *= s;
      this.pos[1] *= s;
      this.pos[2] *= s;
      return this;
    };
    
    particlejs.Vector3 = Vector3;
});
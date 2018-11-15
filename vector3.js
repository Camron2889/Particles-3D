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
      const cosT = Math.cos(t);
      const sinT = Math.sin(t);
      const x1 = pos[0] * cosT - pos[1] * sinT;
      const y1 = pos[0] * sinT + pos[1] * cosT;
      pos[0] = x1;
      pos[1] = y1;
      return this;
    };
    
    proto.rotateY = function(t) {
      const pos = this.pos;
      const cosT = Math.cos(t);
      const sinT = Math.sin(t);
      const z1 = pos[2] * cosT - pos[0] * sinT;
      const x1 = pos[2] * sinT + pos[0] * cosT;
      pos[2] = z1;
      pos[0] = x1;
      return this;
    };
    
    proto.rotateX = function(t) {
      const pos = this.pos;
      const cosT = Math.cos(t);
      const sinT = Math.sin(t);
      const y1 = pos[1] * cosT - pos[2] * sinT;
      const z1 = pos[1] * sinT + pos[2] * cosT;
      pos[1] = y1;
      pos[2] = z1;
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
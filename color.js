//namespace
this.particlejs = this.particlejs || {};
particlejs._precomp = particlejs._precomp || {};

//class
(function() {
    "use strict";
    
    particlejs._precomp.hueScale = [60/360, 120/360, 180/360, 240/360, 300/360];
    
    //constructor
    const Color = function(r = 0, g = 0, b = 0, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    
    const proto = Color.prototype;
    
    proto.fromHsl = function(h, s, l) {
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(18 * h / 3 % 2 - 1));
        const m = l - c / 2;
        const _hScale = particlejs._precomp.hueScale;
        
        let r, g, b;
        
        if (h < _hScale[2]) {
          if (h < _hScale[0]) {
            r = c, g = x, b = 0;
          } else if (h < _hScale[1]) {
            r = x, g = c, b = 0;
          } else {
            r = 0, g = c, b = x;
          }
        } else {
          if (h < _hScale[3]) {
            r = 0, g = x, b = c;
          } else if (h < _hScale[4]) {
            r = x, g = 0, b = c;
          } else {
            r = c, g = 0, b = x;
          }
        }
        
        this.r = r + m;
        this.g = g + m;
        this.b = b + m;
        
        return this;
    };
    
    proto.getHsl = function(r, g, b) {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const range = max - min;
        
        let h;
        let s;
        const l = (max + min) / 2;
        
        if (delta === 0) {
            h = s = 0;
        } else {
            s = delta / (1 - Math.abs(2 * l - 1));
            h = 3/18;
            switch (max) {
                case r:
                    h *= ((g - b) / range) % 6;
                    break;
                case g:
                    h *= ((b - r) / range) + 2
                    break;
                case b:
                    h *= ((r - g) / range) + 4;
                    break;
          }
        }
        return {
            h: h,
            s: s,
            l: l
        };
    };
    
    particlejs.Color = Color;
});
//requires: particle.js

//class
(function() {
    "use strict";

    //constructor
    const ParticleArray = function() {
        this._data = [];
    };
    
    const proto = ParticleArray.prototype;
    
    Object.defineProperty(proto, "length", {
        get: function() {
            return this._data.length;
        }
    });
    
    proto.at = function(i) {
        return this._data[i];
    };
    
    proto.push = function(obj) {
        return this._data.push(obj);
    };
    
    proto.sortByPosition = function(coordinate = "z", direction = "increasing") {
        let compare;
        if (direction === "increasing") {
            compare = function(a, b) { return a <= b };
        } else if (direction === "decreasing") {
            compare = function(a, b) { return a >= b };
        }
            
        const quicksort = function(left, right) {
            if (left >= right) {
                return
            };
            
            const pivot = this._data[right].position[coordinate];
            
            let center = left;
            
            for (let i = left; i <= right; i++) {
                if (compare(this._data[i].position[coordinate], pivot)) {
                    //swap elements
                    const temp = this._data[center];
                    this._data[center] = this._data[i];
                    this._data[i] = temp;
                    
                    ++center;
                }
            }
            
            quicksort(left, center - 2);
            quicksort(center, right);
        }.bind(this);
        
        quicksort(0, this._data.length - 1);
    };
    
    particlejs.ParticleArray = ParticleArray;
})();
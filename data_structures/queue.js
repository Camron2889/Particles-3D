//namespace
this.particlejs = this.particlejs || {};

//class
(function() {
    "use strict";
    
    //constructor
    const Queue = function() {
        this.head = null;
        this.previous = null;
        this.next = null;
        this.length = 0;
    };
    
    const proto = Queue.prototype;
    
    proto.begin = function() {
        if (this.head) {
            this.previous = null;
            this.current = this.head;
            return this.head.value;
        }
        return null;
    };
    
    proto.next = function() {
        if (this.current && this.current.next) {
            this.previous = this.current;
            this.current = this.current.next;
            return this.current.value;
        }
        return null;
    };
    
    proto.end = function() {
        if (this.begin()) {
            while (this.next()) {};
            return this.current.value;
        }
        return null;
    };
    
    proto.enqueue = function(obj) {
        const node = {
            value: obj,
            next: this.head,
            previous: null
        };
        
        this.head = node;
        ++this.length;
    };
    
    proto.dequeue = function() {
        if (this.end()) {
            const node = this.current;
            if (this.previous) {
                this.previous.next = null;
            }
            --this.length;
            if (this.length === 0) {
                this.head = this.current = this.previous = null;
            }
            return node.value;
        }
        return null;
    };
    
    particlejs.Queue = Queue;
});
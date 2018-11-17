//namespace
this.particlejs = this.particlejs || {};

//class
(function() {
    "use strict";
    
    //constructor
    const Queue = function() {
        this.head = null;
        
        this.previousNode = null;
        this.currentNode = null;
        
        this.length = 0;
    };
    
    const proto = Queue.prototype;
    
    proto.begin = function() {
        if (this.head) {
            this.previousNode = null;
            this.currentNode = this.head;
            return this.head.value;
        }
        return null;
    };
    
    proto.next = function() {
        if (this.currentNode && this.currentNode.next) {
            this.previousNode = this.currentNode;
            this.currentNode = this.currentNode.next;
            return this.currentNode.value;
        }
        return null;
    };
    
    proto.end = function() {
        if (this.begin()) {
            while (this.next()) {}
            return this.currentNode.value;
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
            const node = this.currentNode;
            if (this.previousNode) {
                this.previousNode.next = null;
            }
            --this.length;
            if (this.length === 0) {
                this.head = this.currentNode = this.previousNode = null;
            }
            return node.value;
        }
        return null;
    };
    
    particlejs.Queue = Queue;
})();
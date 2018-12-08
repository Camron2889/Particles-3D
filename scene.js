//requires: easeljs.min.js resizesensor.min.js particlearray.js

//class
(function() {
    "use strict";
    
    //shortcuts
    const Vector3 = particlejs.Vector3;
    
    //constructor
    const Scene = function(parentElement = document.body, width = 640, height = 480) {
        this.parentElement = parentElement;
        this.width = width;
        this.height = height;
        this.aspectRatio = width / height;
        
        //setup canvas
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.parentElement.appendChild(this.canvas);
        this.parentElement.style.overflow = "hidden";
        this.canvas.setAttribute("style", "display: block; margin: auto; background-color: #000;");
        this.preserveAspectRatio = true;
        this.autoResize = true;
        
        //setup particles
        this.particles = new particlejs.ParticleArray();

        //setup easeljs
        createjs.Ticker.interval = 1000 / 60;
        this.stage = new createjs.Stage(this.canvas);
        
        //setup resizesensor
        this.resizeSensor = new ResizeSensor(parentElement, this.fitParentElement.bind(this));
        
        //perspective
        this.worldAxes = new particlejs.Axis3();
        this.camera = {
            position: new Vector3(0, 0, 600),
            fov: Math.PI / 3
        };
        this.perspectiveProjection = true;
    };
    
    const proto = Scene.prototype;
    
    proto.projectToScreen = function(particleArray) {
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;
        const halfFov = this.camera.fov / 2;
        const halfVerticalFov = halfFov / this.aspectRatio;
        
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles.at(i);
           
            const pos = particle.position;
            const vx = this.worldAxes.x.clone().scale(pos.x);
            const vy = this.worldAxes.y.clone().scale(pos.y);
            const vz = this.worldAxes.z.clone().scale(pos.z);
            
            const screenPos = particle.screenPosition;
            screenPos.set(0, 0, 0);
            screenPos.add(vx).add(vy).add(vz);
            
            screenPos.subtract(this.camera.position);
            
            if (this.perspectiveProjection) {
                screenPos.x = screenPos.x * halfWidth / (-screenPos.z * Math.tan(halfFov));
                screenPos.y = screenPos.y * halfHeight / (-screenPos.z * Math.tan(halfVerticalFov));
                particle.screenRadius = particle.radius * halfWidth / (-screenPos.z * Math.tan(halfFov));
            }
            
            screenPos.x += halfWidth;
            screenPos.y += halfHeight;
        }
    };
    
    proto.draw = function() {
        const ctx = this.canvas.getContext("2d");
        
        ctx.clearRect(0, 0, this.width, this.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles.at(i);
            const position = particle.screenPosition;
            if (position.z < 0) {
                ctx.beginPath();
                ctx.arc(position.x, position.y, particle.screenRadius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color.toHex();
                ctx.fill();
            }
        }
    };
    
    proto.stepPhysics = function() {
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles.at(i);
            
            particle.velocity.z -= this.worldGravity;
            particle.position.add(particle.velocity);
        }
    };
    
    proto.fitParentElement = function() {
        if (!this.autoResize) return;
        
        const canvas = this.canvas;
        const parentWidth = this.parentElement.clientWidth || this.parentElement.parentNode.clientWidth;
        const parentHeight = this.parentElement.clientHeight || this.parentElement.parentNode.clientHeight;
        const style = canvas.style;
        
        if (!this.preserveAspectRatio) {
            canvas.style.marginTop = "0";
            style.width = parentWidth + "px";
            style.height = parentHeight + "px";
        } else {
            if (this.aspectRatio < parentWidth / parentHeight) { 
                style.marginTop = "0";
                style.width = Math.floor(parentHeight * this.aspectRatio) + "px";
                style.height = parentHeight + "px";
            } else {
                style.marginTop = Math.floor((window.innerHeight - canvas.height) / 2) + "px";
                style.width = parentWidth + "px";
                style.height = Math.floor(parentWidth / this.aspectRatio) + "px";
            }
        }
    };
    
    particlejs.Scene = Scene;
})();
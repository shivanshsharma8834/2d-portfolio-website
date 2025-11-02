export default class Player { 

    constructor(matterObjects, world, x , y) {
        const {Composites, Body} = matterObjects;
        this.matterBody = Body; 

        const particleOptions = { 
            friction: 0.1,
            restitution: 0.3,
            density: 0.005
        };
        const constraintOptions = {
            stiffness: 0.15,
            render: { visible: false}
        }
        this.body = Composites.softBody(x, y, 5, 5, 0, 0, true, 8, particleOptions, constraintOptions);

        matterObjects.World.add(world, this.body);

        this.jumpForce = { x: 0, y: -0.15 }; 
        this.moveForce = 0.005;
    }

    getCenter() {
        // Return the position of the center particle (particle 12 in a 5x5 grid)
        return this.body.bodies[12].position;
    }

    update(input) {
        // Apply horizontal movement
        if (input.keys.includes('a') || input.keys.includes('ArrowLeft')) {
            this.body.bodies.forEach(particle => {
                this.matterBody.applyForce(particle, particle.position, {x: -this.moveForce, y: 0});
            });
        }
        if (input.keys.includes('d') || input.keys.includes('ArrowRight')) {
            this.body.bodies.forEach(particle => {
                this.matterBody.applyForce(particle, particle.position, {x: this.moveForce, y: 0});
            });
        }
        
        // Apply jump force
        if (input.keys.includes(' ') || input.keys.includes('ArrowUp')) {
             // Apply force to the bottom row of particles
             for (let i = 20; i < 25; i++) {
                this.matterBody.applyForce(this.body.bodies[i], this.body.bodies[i].position, this.jumpForce);
             }
             // Remove ' ' from keys so we don't jump continuously
             input.removeKey(' ');
             input.removeKey('ArrowUp');
        }
    }

    draw(ctx) {
        // 1. Draw the particles (circles)
        ctx.beginPath();
        ctx.fillStyle = '#ff6b00'; // Player color
        this.body.bodies.forEach(particle => {
            ctx.moveTo(particle.position.x, particle.position.y);
            ctx.arc(particle.position.x, particle.position.y, particle.circleRadius, 0, Math.PI * 2);
        });
        ctx.fill();

        // 2. Draw the constraints (lines)
        ctx.beginPath();
        ctx.strokeStyle = '#ff8c33'; // Lighter color for springs
        ctx.lineWidth = 2;
        this.body.constraints.forEach(constraint => {
            const posA = constraint.bodyA.position;
            const posB = constraint.bodyB.position;
            ctx.moveTo(posA.x, posA.y);
            ctx.lineTo(posB.x, posB.y);
        });
        ctx.stroke();
    }
}
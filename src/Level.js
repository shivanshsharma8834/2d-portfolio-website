// 'export' this class
export default class Level {
    constructor(matterObjects, world, screenWidth, screenHeight) {
        const { Bodies } = matterObjects;
        
        this.world = world; // Store the main world instance
        this.matterBodies = Bodies; // Store Bodies module for resizing
        this.platforms = [];
        this.relics = []; // Interactive items

        // Create a simple ground
        const ground = Bodies.rectangle(
            screenWidth / 2, screenHeight - 50, screenWidth, 100, 
            { isStatic: true, label: "ground" } 
        );
        this.platforms.push(ground);

        // Create a test platform
        const platform1 = Bodies.rectangle(
            screenWidth / 2 + 200, screenHeight - 250, 300, 30,
            { isStatic: true, label: "platform" }
        );
        this.platforms.push(platform1);

        // Add all level bodies to the world
        matterObjects.World.add(this.world, this.platforms);
    }

    draw(ctx) {
        ctx.fillStyle = '#445'; // Dark blue/grey platforms
        this.platforms.forEach(platform => {
            ctx.beginPath();
            if (platform.vertices) {
                ctx.moveTo(platform.vertices[0].x, platform.vertices[0].y);
                for (let j = 1; j < platform.vertices.length; j++) {
                    ctx.lineTo(platform.vertices[j].x, platform.vertices[j].y);
                }
                ctx.closePath();
                ctx.fill();
            }
        });
    }

    resize(matterObjects, width, height) {
        const { World } = matterObjects;
        
        // Remove old ground
        World.remove(this.world, this.platforms[0]); 
        
        // Create new ground
        const newGround = this.matterBodies.rectangle(width / 2, height - 50, width, 100, 
            { isStatic: true, label: "ground" }
        );
        
        // Replace it in our array and the world
        this.platforms[0] = newGround;
        World.add(this.world, newGround);
    }
}

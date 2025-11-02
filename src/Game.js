import InputHandler from './InputHandler.js';
import Player from './Player.js';
import Level from './Level.js';
import Camera from './Camera.js';

export default class Game{ 

    constructor(engine, world, runner, width, height, Matter) {
        this.engine = engine;
        this.world = world;
        this.runner = runner;
        this.width = width;
        this.height = height;
        this.isPaused = false;

        // This is a clean way to pass Matter's modules
        this.matterObjects = {
            Bodies: Matter.Bodies,
            Composites: Matter.Composites,
            World: Matter.World,
            Body: Matter.Body,
            Runner: Matter.Runner
        };

        // Create core components
        this.input = new InputHandler();
        
        // Create a new Player
        this.player = new Player(this.matterObjects, this.world, this.width / 2, this.height / 2);
        
        // Create a new Level
        this.level = new Level(this.matterObjects, this.world, this.width, this.height);

        // Create a new Camera
        this.camera = new Camera(this.player.getCenter(), this.width, this.height);
    }

    update() {
        if (this.isPaused) return;

        // Check input and apply forces to the player
        this.player.update(this.input);

        // Tell the camera to follow the player's center
        this.camera.follow(this.player.getCenter());
    }

    draw(ctx) {
        // --- CAMERA START ---
        ctx.save();
        ctx.translate(this.width / 2, this.height / 2);
        ctx.scale(this.camera.zoom, this.camera.zoom);
        ctx.translate(-this.camera.x, -this.camera.y);
        
        // --- DRAW GAME WORLD ---
        // (Draw parallax backgrounds here in Phase 3)

        // Draw all level platforms
        this.level.draw(ctx);

        // Draw the player
        this.player.draw(ctx);

        // --- CAMERA END ---
        ctx.restore();
    }
}
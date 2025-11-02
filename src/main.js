import Matter, { Runner } from 'matter-js';
import Game from './Game.js';

const { Engine, Render, World, Bodies } = Matter;

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let game; 
let engine;
let world;
let runner;

function init() {
    const engine = Engine.create();
    world = engine.world;
    engine.gravity.y = 1;

    runner = Matter.Runner.create();

    game = new Game();

    function gameLoop() {
        
        game.update();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        game.draw();
    
        window.requestAnimationFrame(gameLoop);
    }

    window.requestAnimationFrame(gameLoop);

    // Run Physics engine
    Runner.run(runner, engine);

    // Handle window resizing
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        game.resize(canvas.width, canvas.height);
    });

}

init();
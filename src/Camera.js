// 'export' this class
export default class Camera {
    constructor(targetPosition, screenWidth, screenHeight) {
        this.x = targetPosition.x;
        this.y = targetPosition.y;
        this.width = screenWidth;
        this.height = screenHeight;
        this.zoom = 1.0; 
        this.lerpFactor = 0.08; // Smooths the camera movement
    }

    follow(targetPosition) {
        // Target a position slightly above the player's center
        let targetX = targetPosition.x;
        let targetY = targetPosition.y - this.height / 4; 

        // Use linear interpolation (lerp) for smooth camera movement
        this.x += (targetX - this.x) * this.lerpFactor;
        this.y += (targetY - this.y) * this.lerpFactor;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
    }
}

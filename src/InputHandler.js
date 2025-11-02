// 'export' this class
export default class InputHandler {
    constructor() {
        this.keys = []; 

        window.addEventListener('keydown', (e) => {
            if (
                (e.key === 'a' || e.key === 'ArrowLeft' ||
                 e.key === 'd' || e.key === 'ArrowRight' ||
                 e.key === ' ' || e.key === 'ArrowUp') &&
                !this.keys.includes(e.key)
            ) {
                this.keys.push(e.key);
            }
        });

        window.addEventListener('keyup', (e) => {
            this.removeKey(e.key);
        });
    }

    removeKey(key) {
        const index = this.keys.indexOf(key);
        if (index > -1) {
            this.keys.splice(index, 1);
        }
    }
}

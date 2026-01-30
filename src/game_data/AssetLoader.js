export const IMAGES = [];

let imgCount = 0;
let loadedCount = 0;

let loadHandler;

export function preload(...args) {
    imgCount = args.length;

    for (const arg of args) {
        const img = new Image();
        img.src = arg.src;
        img.onload = () => { 
            loadedCount++;
        };
        img.onerror = () => {
        }

        IMAGES[arg.name] = img;
    }

    loadHandler = setInterval(checkIfLoaded, 100);
}

function checkIfLoaded() {
    if (loadedCount >= imgCount) {
        clearInterval(loadHandler);
        window.dispatchEvent(new CustomEvent('assetsLoaded'));
    }
}
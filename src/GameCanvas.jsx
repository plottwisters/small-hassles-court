import { useRef, useEffect } from "react";
import { backgroundColor, gameObjects } from "./SceneManager";
import { Clickable } from "./gameObjects/base/Clickable";

// variables scoped outside of React
let canvas;
let ctx;
// let rive;
// let renderer;
// let harryArtboard;

function GameCanvas({ width, height, children }) {

    const gameCanvas = useRef(null);
    const gameContainer = useRef(null);

    useEffect(() => {
        let gameLoop;

        const canvasInput = (event) => {
            handleCanvasClick(event);
        };

        canvas = gameCanvas.current;
        ctx = canvas.getContext('2d');

        // async function initRive() {
        //     rive = await RiveCanvas({
        //         locateFile: (_) => 'https://unpkg.com/@rive-app/canvas-advanced@2.26.1/rive.wasm'
        //     });

        //     renderer = rive.makeRenderer(canvas);

        //     const harryData = await (
        //         await fetch(new Request('./src/assets/harry.riv'))
        //     ).arrayBuffer();

        //     const harryFile = (await rive.load(new Uint8Array(harryData)));
        //     harryArtboard = harryFile.artboardByName('Artboard');


        // }
        // initRive();


        const container = gameContainer.current;
        gameLoop = requestAnimationFrame(renderLoop);
        container.addEventListener('mousedown', canvasInput);

        return () => {
            cancelAnimationFrame(gameLoop);
            container.removeEventListener('mousedown', canvasInput);
        }
    }, []);

    // scale canvas to proper resolution for high-res displays with subpixels
    useEffect(() => {

        const resizeWindow = () => {
            const scale = window.devicePixelRatio;

            canvas.width = width * scale;
            canvas.height = height * scale;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            for (const g of gameObjects) {
                g.resize();
            }
        }

        resizeWindow();

        window.addEventListener('resize', resizeWindow);
        return () => {
            window.removeEventListener(resizeWindow);
        }

    }, [width, height])

    return (
        <div className="game-container" ref={gameContainer} style={{ width: width, height: height }}>
            <canvas className="game-canvas" ref={gameCanvas}></canvas>
            {children}
        </div>
    );
}

function handleCanvasClick(event) {
    const canvasBounds = canvas.getBoundingClientRect();
    const canvasX = (event.clientX - canvasBounds.left) * window.devicePixelRatio;
    const canvasY = (event.clientY - canvasBounds.top) * window.devicePixelRatio;

    const clickableGameObjects = gameObjects.filter(obj => obj instanceof Clickable);
    for (const g of clickableGameObjects) {
        g.handleClickEvent(canvasX, canvasY);
    }
}

let prevTime = 0;
function renderLoop(time) {
    const dt = time - prevTime;
    prevTime = time;

    //renderer.clear();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const g of gameObjects) {
        g.update(dt);
        g.draw(ctx);
    }

    // harryArtboard.draw(renderer);

    // rive.requestAnimationFrame(renderLoop);

    requestAnimationFrame(renderLoop);
}

export default GameCanvas;
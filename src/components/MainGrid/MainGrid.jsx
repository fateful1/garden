import React, {useEffect, useRef, useState} from "react";
import './MainGrid.css';
import {fabric} from "fabric";

export const MainGrid = (props) => {
    const { setGrid } = props
    const MAX_SCALE = 2;
    const MIN_SCALE = 0.5;
    let canvas = useRef(null)
    // var [canvas, setCanvas] = useState('') ;
    var grid = 30;
    var canvasWidth = 4000;
    var canvasHeight = 4000;

    // setCanvas()

    useEffect(() => {
        canvas.current = initCanvas();
        // setCanvas(canvas)


        canvas.current.setWidth(canvasWidth)
        canvas.current.setHeight(canvasHeight)
        // canvas.current.setLeft(canvasWidth / 4)
        // canvas.current.setTop(canvasHeight / 4)

        canvas.current.on('object:moving', function(options) {
            console.log(options)
            options.target.set({
                left: Math.round(options.target.left / grid) * grid,
                top: Math.round(options.target.top / grid) * grid
            });
        });
        canvas.current.on('object:modified', function(options) {
            console.log(options)
            var newWidth = (Math.round(options.target.getScaledWidth() / grid)) * grid;
            var newHeight = (Math.round(options.target.getScaledHeight() / grid)) * grid;

            options.target.set({
                width: newWidth,
                height: newHeight,
                scaleX: 1,
                scaleY: 1
            });
        });

        canvas.current.on("mouse:wheel", function(opt) {
            let zoom = canvas.current.getZoom();
            zoom *= 0.999 ** opt.e.deltaY;
            if (zoom > MAX_SCALE) zoom = MAX_SCALE;
            if (zoom < MIN_SCALE) zoom = MIN_SCALE;

            canvas.current.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
            opt.e.preventDefault();
            opt.e.stopPropagation();

        });

        const gridLen = canvasWidth / grid;

        for (var i = 0; i < gridLen; i++) {
            var distance   = i * grid,
                horizontal = new fabric.Line([ distance, 0, distance, canvasWidth], { type:'line', stroke: '#e5e5e5', selectable: false }),
                vertical   = new fabric.Line([ 0, distance, canvasWidth, distance], { type:'line', stroke: '#e5e5e5', selectable: false });
            canvas.current.add(horizontal);
            canvas.current.add(vertical);
            if(i%5 === 0){
                horizontal.set({stroke: '#b4b4b4'});
                vertical.set({stroke: '#b4b4b4'});
            };
        };

        // for (var i = 0; i < (canvasWidth / grid); i++) {
        //     canvas.current.add(new fabric.Line([ i * grid, 0, i * grid, canvasHeight], { type:'line', stroke: '#ccc', selectable: false }));
        //     canvas.current.add(new fabric.Line([ 0, i * grid, canvasWidth, i * grid], { type: 'line', stroke: '#ccc', selectable: false }))
        // }

        setGrid(canvas.current)

        // return () => {
        //     canvas.current = null;
        // }

    }, []);

    const initCanvas = () => (
        new fabric.Canvas('canvas', {
            height: 800,
            width: 800,
            backgroundColor: 'white' ,
            selection: false,
            renderOnAddRemove: true,
            viewportTransform: [1, 0, 0, 1, -window.outerWidth/2, -window.outerHeight/2],
        })
    );

    return (
        <div>
            <canvas ref={canvas} id={'canvas'}></canvas>
            {/*<span style={{position: 'absolute', top: '150px', left: '100px'}} onClick={()=> addObjectCanvas('')}>ДОБАВИТЬ КВАДРАТ</span>*/}
        </div>
    )
}

$(function() {
"use strict";

    var resolution = [960, 540];
    var ar = resolution[0] / resolution[1];

    var renderer = PIXI.autoDetectRenderer(resolution[0], resolution[1]);
    //var renderer = new PIXI.CanvasRenderer(160, 90);
    $(renderer.view).css("margin-left", "auto");
    $(renderer.view).css("margin-right", "auto");
    $(renderer.view).css("display", "block");

    var tstage = new PIXI.Stage();
    var stage = new PIXI.DisplayObjectContainer();
    tstage.addChild(stage);

    function setRenderer() {
        var resize = function(w, h) {
            renderer.resize(w, h);
            stage.scale.x = w / resolution[0];
            stage.scale.y = w / resolution[0];
        };
        var w = window.innerHeight * ar;
        var h = window.innerWidth / ar;
        if (w > window.innerWidth) {
            resize(h * ar, h);
        } else {
            resize(w, w / ar);
        }
    }
    $(window).on("resize", setRenderer);
    setRenderer();

 
    document.body.appendChild(renderer.view);

    var image = document.createElement("canvas");

    (function() {
        image.width = 512;
        image.height = 512;
        var context = image.getContext('2d');
        var centerX = image.width / 2;
        var centerY = image.height / 2;
        var radius = image.width / 2;

        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'rgba(255, 255, 255, 0.5)';
        context.fill();
    })();

    var texture = PIXI.Texture.fromCanvas(image);
    var object = new PIXI.Sprite(texture);
    object.width = 64;
    object.height = 64;
    object.anchor.x = 0.5;
    object.anchor.y = 0.5;
    object.turn = 0;
    stage.addChild(object);

    var last = new Date().getTime() / 1000;
 
    var animate = function() {
        var now = new Date().getTime() / 1000;
        var deltat = now - last;
        object.turn += 1 * deltat;
        object.position.x = resolution[0] / 2 + Math.cos(object.turn) * 100;
        object.position.y = resolution[1] / 2 + Math.sin(object.turn) * 100;

        renderer.render(tstage);

        last = now;
        requestAnimFrame(animate);
    }
    requestAnimFrame(animate);

});
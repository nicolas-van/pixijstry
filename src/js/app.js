
$(function() {
"use strict";

    var resolution = [160, 90];
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
        image.width = 64;
        image.height = 64;
        var context = image.getContext('2d');
        var centerX = image.width / 2;
        var centerY = image.height / 2;
        var radius = image.width / 2;

        var iterations = 100;

        _.each(_.range(iterations), function(el) {
            el = el + 1;
            context.beginPath();
            context.arc(centerX, centerY, radius * (1 - (el / iterations)), 0, 2 * Math.PI, false);
            context.fillStyle = 'rgba(255, 255, 255, ' + ((el / iterations) * 0.05) + ')';
            context.fill();
        });
    })();

    var container = new PIXI.DisplayObjectContainer();
    container.position.x = resolution[0] / 2;
    container.position.y = resolution[1] / 2;
    stage.addChild(container);

    var texture = PIXI.Texture.fromCanvas(image);
    var object = new PIXI.Sprite(texture);
    object.anchor.x = 0.5;
    object.anchor.y = 0.5;
    object.position.x = 10;
    object.position.y = 0;
    container.addChild(object);
 
    var animate = function() {
        container.rotation += 0.1;

        renderer.render(tstage);

        requestAnimFrame(animate);
    }
    requestAnimFrame(animate);

});
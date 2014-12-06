(function() {
  var DarkMask, DiscObject, Lamp, Lighting, PolygonObject, RectangleObject, UPDATE_FREQ, Vec2, canvas, computeLightings, createLightings, ctx, darkmask, lastUpdate, lightings, lights, metal, objects, render, renderLightings, setup, startTime, update, x, y;

  Lamp = illuminated.Lamp;

  RectangleObject = illuminated.RectangleObject;

  DiscObject = illuminated.DiscObject;

  PolygonObject = illuminated.PolygonObject;

  Vec2 = illuminated.Vec2;

  Lighting = illuminated.Lighting;

  DarkMask = illuminated.DarkMask;

  canvas = document.getElementsByTagName('canvas')[0];

  ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;

  canvas.height = window.innerHeight;

  x = y = 0;

  startTime = +new Date();

  objects = [
    new RectangleObject({
      topleft: new Vec2(0, 150),
      bottomright: new Vec2(canvas.width, 175)
    }), new RectangleObject({
      topleft: new Vec2(0, canvas.height - 175),
      bottomright: new Vec2(canvas.width, canvas.height - 150)
    }), new RectangleObject({
      topleft: new Vec2(100, canvas.height - 300),
      bottomright: new Vec2(150, canvas.height - 175)
    })
  ];

  lights = [
    new Lamp({
      color: 'rgba(255, 220, 150, 0.6)',
      distance: 300
    }), new Lamp({
      color: 'rgba(255, 220, 150, 0.6)',
      distance: 300,
      position: new Vec2(500, 500)
    })
  ];

  lightings = [];

  createLightings = function() {
    var i, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = lights.length; _i < _len; _i++) {
      i = lights[_i];
      _results.push(lightings.push(new Lighting({
        light: i,
        objects: objects
      })));
    }
    return _results;
  };

  computeLightings = function() {
    var i, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = lightings.length; _i < _len; _i++) {
      i = lightings[_i];
      _results.push(i.compute(canvas.width, canvas.height));
    }
    return _results;
  };

  renderLightings = function() {
    var i, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = lightings.length; _i < _len; _i++) {
      i = lightings[_i];
      _results.push(i.render(ctx));
    }
    return _results;
  };

  darkmask = new DarkMask({
    lights: lights,
    color: 'rgba(0,0,0,0.8)'
  });

  lastUpdate = 0;

  UPDATE_FREQ = 25;

  createLightings();

  update = function() {
    computeLightings();
    return darkmask.compute(canvas.width, canvas.height);
  };

  setup = function() {
    return update();
  };

  metal = new Image();

  metal.onload = function() {
    var dirty;
    return dirty = true;
  };

  metal.src = '../assets/galvanized-plate.jpg';

  render = function() {
    var h, w;
    w = canvas.width;
    h = canvas.height;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    ctx.save();
    ctx.fillStyle = 'white';
    objects.forEach(function(obj) {
      var bounds, topleft;
      ctx.save();
      ctx.beginPath();
      obj.path(ctx);
      ctx.clip();
      bounds = obj.bounds();
      topleft = bounds.topleft;
      ctx.drawImage(metal, topleft.x, topleft.y);
      ctx.restore();
      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#778';
      ctx.beginPath();
      obj.path(ctx);
      ctx.stroke();
      return ctx.restore();
    });
    ctx.globalCompositeOperation = 'lighter';
    renderLightings();
    ctx.restore();
    ctx.globalCompositeOperation = 'source-over';
    return darkmask.render(ctx);
  };

  setup();

  
requestAnimFrame(function loop () {
  requestAnimFrame(loop, canvas);
  var now = +new Date();
  if (now >= lastUpdate + UPDATE_FREQ) {
    lastUpdate = now;
    update();
  }
  render();
}, canvas);
;

}).call(this);

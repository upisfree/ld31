(function() {
  var DarkMask, DiscObject, Lamp, Lighting, PolygonObject, RectangleObject, UPDATE_FREQ, Vec2, canvas, computeLightings, createLightings, ctx, currentLevel, darkmask, init, lastUpdate, level, levels, metal, render, renderLightings, setup, update;

  Math.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

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

  currentLevel = null;

  levels = [];

  level = {
    add: function(l) {
      l.lightings = [];
      return levels.push(l);
    },
    get: function(i) {
      return currentLevel = levels[i];
    },
    load: function(i) {
      var darkmask;
      darkmask = null;
      currentLevel = null;
      level.get(i);
      createLightings();
      return setup();
    }
  };

  darkmask = null;

  createLightings = function() {
    var i, _i, _len, _ref, _results;
    darkmask = new DarkMask({
      lights: currentLevel.lights,
      color: 'rgba(0,0,0,0.8)'
    });
    _ref = currentLevel.lights;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      _results.push(currentLevel.lightings.push(new Lighting({
        light: i,
        objects: currentLevel.objects
      })));
    }
    return _results;
  };

  computeLightings = function() {
    var i, _i, _len, _ref, _results;
    _ref = currentLevel.lightings;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      _results.push(i.compute(canvas.width, canvas.height));
    }
    return _results;
  };

  renderLightings = function() {
    var i, _i, _len, _ref, _results;
    _ref = currentLevel.lightings;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      _results.push(i.render(ctx));
    }
    return _results;
  };

  lastUpdate = 0;

  UPDATE_FREQ = 25;

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
    currentLevel.objects.forEach(function(obj) {
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

  init = function(levelNumber) {
    level.load(levelNumber);
    return requestAnimFrame(function loop () {
    requestAnimFrame(loop, canvas);
    var now = +new Date();
    if (now >= lastUpdate + UPDATE_FREQ) {
      lastUpdate = now;
      update();
    }
    render();
  }, canvas);
  };

  level.add({
    objects: [
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
    ],
    lights: [
      new Lamp({
        color: 'rgba(255, 220, 150, 0.6)',
        distance: 300
      }), new Lamp({
        color: 'rgba(255, 220, 150, 0.6)',
        distance: 300,
        position: new Vec2(500, 500)
      })
    ]
  });

  level.add({
    objects: [
      new RectangleObject({
        topleft: new Vec2(0, 600),
        bottomright: new Vec2(canvas.width, 100)
      })
    ],
    lights: [
      new Lamp({
        color: 'rgba(255, 0, 0, 1)',
        distance: 30
      }), new Lamp({
        color: 'rgba(255, 255, 255, 0.2)',
        distance: 100,
        position: new Vec2(600, 700)
      })
    ]
  });

  level.add({
    objects: [
      new RectangleObject({
        topleft: new Vec2(0, 600),
        bottomright: new Vec2(canvas.width / 2, 50)
      })
    ],
    lights: [
      new Lamp({
        color: 'rgba(0, 255, 0, 1)',
        distance: 30
      })
    ]
  });

  init(2);

  setInterval(function() {
    return level.load(Math.randomInt(0, 2));
  }, 2500);

}).call(this);

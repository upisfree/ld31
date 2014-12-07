(function() {
  var DarkMask, DiscObject, Lamp, Lighting, PolygonObject, RectangleObject, UPDATE_FREQ, Vec2, canvas, computeLightings, createLightings, ctx, currentLevel, darkmask, init, lastUpdate, level, levels, path, render, renderLightings, setup, update;

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

  path = {
    assets: '../assets/'
  };

  init = function(levelNumber) {
    if (levelNumber == null) {
      levelNumber = 0;
    }
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
      setup();
      return currentLevel.action();
    }
  };

  darkmask = null;

  createLightings = function() {
    var i, _i, _len, _ref, _results;
    darkmask = new DarkMask({
      lights: currentLevel.lights,
      color: 'rgba(0, 0, 0, 1)'
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

  render = function() {
    var h, w;
    w = canvas.width;
    h = canvas.height;
    ctx.fillRect(0, 0, w, h);
    ctx.save();
    ctx.fillStyle = 'white';
    currentLevel.objects.forEach(function(obj) {
      var bottomright, bounds, topleft;
      ctx.save();
      ctx.beginPath();
      obj.path(ctx);
      ctx.clip();
      bounds = obj.bounds();
      topleft = bounds.topleft;
      bottomright = bounds.bottomright;
      ctx.drawImage(resources.get(obj.texture), topleft.x, topleft.y, bottomright.x - topleft.x, bottomright.y - topleft.y);
      ctx.restore();
      ctx.save();
      ctx.beginPath();
      obj.path(ctx);
      return ctx.restore();
    });
    ctx.globalCompositeOperation = 'lighter';
    renderLightings();
    ctx.restore();
    ctx.globalCompositeOperation = 'source-over';
    return darkmask.render(ctx);
  };

  level.add({
    objects: [
      new RectangleObject({
        topleft: new Vec2(canvas.width - 150, canvas.height / 2 + 450 / 2),
        bottomright: new Vec2(canvas.width, canvas.height / 2 - 450 / 2),
        texture: path.assets + 'exit.png'
      })
    ],
    lights: [
      new Lamp({
        color: 'rgba(255, 255, 255, 1)',
        position: new Vec2(20, canvas.height - 20),
        distance: 100,
        radius: 50
      }), new Lamp({
        color: "rgba(" + (Math.randomInt(0, 255)) + ", " + (Math.randomInt(0, 255)) + ", " + (Math.randomInt(0, 255)) + ", " + (Math.random()) + ")",
        position: new Vec2(Math.randomInt(0, canvas.width), Math.randomInt(0, canvas.height)),
        distance: Math.randomInt(100, 300),
        diffuse: 0.8,
        radius: Math.randomInt(50, 100)
      }), new Lamp({
        color: "rgba(" + (Math.randomInt(0, 255)) + ", " + (Math.randomInt(0, 255)) + ", " + (Math.randomInt(0, 255)) + ", " + (Math.random()) + ")",
        position: new Vec2(Math.randomInt(0, canvas.width), Math.randomInt(0, canvas.height)),
        distance: Math.randomInt(100, 300),
        diffuse: 0.8,
        radius: Math.randomInt(50, 100)
      }), new Lamp({
        color: "rgba(" + (Math.randomInt(0, 255)) + ", " + (Math.randomInt(0, 255)) + ", " + (Math.randomInt(0, 255)) + ", " + (Math.random()) + ")",
        position: new Vec2(Math.randomInt(0, canvas.width), Math.randomInt(0, canvas.height)),
        distance: Math.randomInt(100, 300),
        diffuse: 0.8,
        radius: Math.randomInt(50, 100)
      }), new Lamp({
        color: "rgba(" + (Math.randomInt(0, 255)) + ", " + (Math.randomInt(0, 255)) + ", " + (Math.randomInt(0, 255)) + ", " + (Math.random()) + ")",
        position: new Vec2(Math.randomInt(0, canvas.width), Math.randomInt(0, canvas.height)),
        distance: Math.randomInt(100, 300),
        diffuse: 0.8,
        radius: Math.randomInt(50, 100)
      })
    ],
    action: function() {
      return window.onkeydown = function(e) {
        var distance, dx, dy, i, light, player, _i, _ref;
        console.log(e);
        switch (e.keyCode) {
          case 38:
            currentLevel.lights[0].position.y -= 10;
            break;
          case 37:
            currentLevel.lights[0].position.x -= 10;
            break;
          case 40:
            currentLevel.lights[0].position.y += 10;
            break;
          case 39:
            currentLevel.lights[0].position.x += 10;
        }
        for (i = _i = 1, _ref = currentLevel.lights.length - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
          player = currentLevel.lights[0];
          light = currentLevel.lights[i];
          dx = (player.position.x + player.distance) - (light.position.x + light.distance);
          dy = (player.position.y + player.distance) - (light.position.y + light.distance);
          distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < player.distance + light.distance) {
            console.log('collision detected');
          }
        }
        if ((currentLevel.lights[0].position.x + 100 >= currentLevel.objects[0].topleft.x && currentLevel.lights[0].position.x <= currentLevel.objects[0].bottomright.x) && (currentLevel.lights[0].position.y + 100 >= currentLevel.objects[0].topleft.y && currentLevel.lights[0].position.y <= currentLevel.objects[0].bottomright.y)) {
          return console.log('finish collision');
        }
      };
    }
  });

  level.add({
    objects: [
      new RectangleObject({
        topleft: new Vec2(0, 600),
        bottomright: new Vec2(canvas.width, 100)
      }), new RectangleObject({
        topleft: new Vec2(100, canvas.height - 500),
        bottomright: new Vec2(250, canvas.height - 175),
        texture: path.assets + 'player.png'
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

  resources.load([path.assets + 'exit.png']);

  resources.onReady(init);

}).call(this);

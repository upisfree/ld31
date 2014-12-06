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
        topleft: new Vec2(canvas.width / 1.5 - 325 / 2, canvas.height - 275),
        bottomright: new Vec2(canvas.width / 1.5 + 325 / 2, canvas.height - 175),
        texture: path.assets + 'player-lying.png'
      })
    ],
    lights: [
      new Lamp({
        color: 'rgba(189, 0, 0, 0.9)',
        position: new Vec2(canvas.width / 1.5, 176),
        distance: 300,
        diffuse: 0.8,
        radius: 0,
        samples: 1,
        roughness: 1,
        angle: -26.75
      }), new Lamp({
        color: 'rgba(250, 220, 150, 0.8)',
        position: new Vec2(canvas.width / 5, 176),
        distance: 1,
        diffuse: 0.8,
        radius: 0,
        samples: 1,
        roughness: 1,
        angle: -26.75
      }), new Lamp({
        color: 'rgba(250, 220, 150, 0.8)',
        position: new Vec2(canvas.width / 2, 176),
        distance: 1,
        diffuse: 0.8,
        radius: 0,
        samples: 1,
        roughness: 1,
        angle: -26.75
      }), new Lamp({
        color: 'rgba(250, 220, 150, 0.8)',
        position: new Vec2(canvas.width / 1.25, 176),
        distance: 1,
        diffuse: 0.8,
        radius: 0,
        samples: 1,
        roughness: 1,
        angle: -26.75
      }), new Lamp({
        color: 'rgba(255, 255, 255, 1)',
        position: new Vec2(canvas.width / 2, canvas.height / 2),
        distance: 1,
        radius: 10
      })
    ],
    action: function() {
      var blink, siren;
      blink = setInterval(function() {
        if (Math.random() > 0.5) {
          return currentLevel.lights[0].distance = 1;
        } else {
          return currentLevel.lights[0].distance = 300;
        }
      }, 2000);
      siren = resources.get(path.assets + 'level-0/siren.mp3');
      siren.play();
      return setTimeout(function() {
        var bgmusic;
        clearInterval(blink);
        currentLevel.lights[0].distance = 1;
        bgmusic = resources.get(path.assets + 'level-0/dimple-pinch-neat.mp3');
        bgmusic.volume(0.5);
        bgmusic.loop = true;
        bgmusic.play();
        return setTimeout(function() {
          currentLevel.lights[1].distance = 300;
          currentLevel.lights[2].distance = 300;
          currentLevel.lights[3].distance = 300;
          currentLevel.lights[4].distance = 50;
          currentLevel.objects[0].texture = path.assets + 'null.png';
          currentLevel.objects.push(new RectangleObject({
            topleft: new Vec2(canvas.width / 1.5 - 150 / 2, canvas.height - 500),
            bottomright: new Vec2(canvas.width / 1.5 + 150 / 2, canvas.height - 175),
            texture: path.assets + 'player.png'
          }));
          return window.onkeydown = function(e) {
            switch (e.keyCode) {
              case 38:
                currentLevel.lights[4].position.y -= 10;
                break;
              case 37:
                currentLevel.lights[4].position.x -= 10;
                break;
              case 40:
                currentLevel.lights[4].position.y += 10;
                break;
              case 39:
                currentLevel.lights[4].position.x += 10;
            }
            if ((currentLevel.lights[4].position.x + 10 >= currentLevel.objects[1].topleft.x && currentLevel.lights[4].position.x <= currentLevel.objects[1].bottomright.x) && (currentLevel.lights[4].position.y + 10 >= currentLevel.objects[1].topleft.y && currentLevel.lights[4].position.y <= currentLevel.objects[1].bottomright.y)) {
              $('#level-0-message').fadeIn('fast');
              return setTimeout(function() {
                return $('#level-0-message').fadeOut('fast');
              }, 5000);
            }
          };
        }, 2000);
      }, 8000);
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

  resources.load([path.assets + 'player.png', path.assets + 'player-lying.png', path.assets + 'null.png', path.assets + 'level-0/background.png', path.assets + 'level-0/siren.mp3', path.assets + 'level-0/dimple-pinch-neat.mp3']);

  resources.onReady(init);

}).call(this);

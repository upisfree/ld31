# Rename illuminated's objects to shorter names 
Lamp = illuminated.Lamp
RectangleObject = illuminated.RectangleObject
DiscObject = illuminated.DiscObject
PolygonObject = illuminated.PolygonObject
Vec2 = illuminated.Vec2
Lighting = illuminated.Lighting
DarkMask = illuminated.DarkMask

# Init canvas
canvas = document.getElementsByTagName('canvas')[0]
ctx = canvas.getContext '2d'

## Set canvas size
canvas.width  = window.innerWidth
canvas.height = window.innerHeight

# Paths
path =
  assets: '../assets/'

#####

metal = new Image()
metal.onload = ->
  dirty = true
metal.src = '../assets/galvanized-plate.jpg'

#####

init = (levelNumber = 0) ->
  level.load levelNumber

  `requestAnimFrame(function loop () {
    requestAnimFrame(loop, canvas);
    var now = +new Date();
    if (now >= lastUpdate + UPDATE_FREQ) {
      lastUpdate = now;
      update();
    }
    render();
  }, canvas)`
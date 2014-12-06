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

# Level's stuff
currentLevel = null
levels = []
level = 
  add: (l) ->
    l.lightings = []
    levels.push l
  get: (i) ->
    currentLevel = levels[i]
  load: (i) ->
    darkmask = null
    currentLevel = null

    level.get i
    createLightings()
    setup()

# Lighting's stuff
darkmask = null

createLightings = ->
  darkmask = new DarkMask
    lights: currentLevel.lights
    color: 'rgba(0,0,0,0.8)'

  for i in currentLevel.lights
    currentLevel.lightings.push new Lighting
      light: i
      objects: currentLevel.objects

computeLightings = ->
  for i in currentLevel.lightings
    i.compute canvas.width, canvas.height

renderLightings = ->
  for i in currentLevel.lightings
    i.render ctx

# Start game
lastUpdate = 0
UPDATE_FREQ = 25

# Render stuff
update = ->
  computeLightings()
  darkmask.compute canvas.width, canvas.height

setup = ->
  update()

#####

metal = new Image()
metal.onload = ->
  dirty = true
metal.src = '../assets/galvanized-plate.jpg'

#####

render = ->
  w = canvas.width
  h = canvas.height
  ctx.fillStyle = '#000'
  ctx.fillRect 0, 0, w, h
  ctx.save()
  ctx.fillStyle = 'white'

  currentLevel.objects.forEach (obj) ->
    ctx.save()
    ctx.beginPath()
    obj.path ctx
    ctx.clip()
    bounds = obj.bounds()
    topleft = bounds.topleft
    ctx.drawImage metal, topleft.x, topleft.y
    ctx.restore()
    ctx.save()
    ctx.lineWidth = 1
    ctx.strokeStyle = '#778'

    ctx.beginPath()
    obj.path ctx
    ctx.stroke()
    ctx.restore()

  ctx.globalCompositeOperation = 'lighter'
  renderLightings()
  ctx.restore()
  ctx.globalCompositeOperation = 'source-over'
  darkmask.render ctx

init = (levelNumber) ->
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
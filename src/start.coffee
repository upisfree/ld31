Lamp = illuminated.Lamp
RectangleObject = illuminated.RectangleObject
DiscObject = illuminated.DiscObject
PolygonObject = illuminated.PolygonObject
Vec2 = illuminated.Vec2
Lighting = illuminated.Lighting
DarkMask = illuminated.DarkMask

canvas = document.getElementsByTagName('canvas')[0]
ctx = canvas.getContext '2d'
canvas.width  = window.innerWidth
canvas.height = window.innerHeight

x = y = 0

pe = null

PARTICLE_SIZE = 1.1
PARTICLE_LIFESPAN = 14
camerascale = 40

startTime = +new Date()

light = new Lamp
  color: 'rgba(255, 220, 150, 0.6)'
  distance: 300

objects = [
  new RectangleObject
    topleft: new Vec2 60, 250
    bottomright: new Vec2 140, 330
  new RectangleObject
    topleft: new Vec2 50, 50
    bottomright: new Vec2 100, 100
  new DiscObject
    center: new Vec2 550, 300
    radius: 50
  new DiscObject
    center: new Vec2 550, 130
    radius: 20
  P = new PolygonObject
    "points": $.map [
        {"x": 287, "y": 132}
        {"x": 245, "y": 90}
        {"x": 269, "y": 146}
        {"x": 218, "y": 159}
        {"x": 270, "y": 171}
        {"x": 252, "y": 214}
        {"x": 286, "y": 181}
        {"x": 319, "y": 224}
        {"x": 310, "y": 177}
        {"x": 367, "y": 183}
        {"x": 309, "y": 157}
        {"x": 342, "y": 86}
      ],
      (p) ->
        new Vec2 p.x, p.y
]

lighting = new Lighting
  light: light
  objects: objects

darkmask = new DarkMask
  lights: [light]
  color: 'rgba(0,0,0,0.8)'

randBaseTime = Math.round 2000 + 600 * Math.random()

updatePosition = ->
  t = +new Date() - startTime
  s = randBaseTime + 500 * Math.cos t / 3000
  ts = t / s
  x = 140 + 150 * (1 + Math.cos ts)
  y = 160 * (1 + Math.sin ts)
  light.position.x = x + 0.65 * camerascale
  light.position.y = y + 0.55 * camerascale

samples = null
computeSamplesPosition = ->
  samples = []
  (pe.particles || []).forEach (p) ->
    if p.timeToLive > 4
      samples.push new Vec2 p.position.x, p.position.y
  
  light.samples = samples.length


initParticles = ->
  pe && pe.stop()
  pe = new cParticleSystem()
  pe.maxParticles = 60
  pe.lifeSpan = PARTICLE_LIFESPAN
  pe.lifeSpanRandom = 1
  pe.position.x = -1000
  pe.position.y = -1000
  pe.startColour = [240, 208, 68, 1]
  pe.startColourRandom = [40, 40, 60, 0]
  pe.finishColour = [245, 35, 0, 0]
  pe.finishColourRandom = [20, 20, 20, 0]
  pe.gravity = {x: 0, y: -0.02 * camerascale}
  pe.size = PARTICLE_SIZE * camerascale
  pe.sizeRandom = 0.4 * camerascale
  pe.speed = 0.01 * camerascale
  pe.speedRandom = 0.005 * camerascale
  pe.sharpness = .3 * camerascale
  pe.sharpnessRandom = .1 * camerascale
  pe.positionRandom = {x: 0.1 * camerascale, y: 0.1 * camerascale}
  pe.init()

  computeSamplesPosition()
  light.forEachSample = (f) ->
    samples.forEach f

lastUpdate = 0
UPDATE_FREQ = 25

update = ->
  computeSamplesPosition()
  updatePosition()
  pe.position.x = x
  pe.position.y = y
  pe.update 1
  lighting.compute canvas.width, canvas.height
  darkmask.compute canvas.width, canvas.height

setup = ->
  initParticles()
  update()

metal = new Image()
metal.onload = ->
  dirty = true
metal.src = '../assets/galvanized-plate.jpg'
render = ->
  w = canvas.width
  h = canvas.height
  ctx.fillStyle = '#000'
  ctx.fillRect 0, 0, w, h
  ctx.save()
  ctx.fillStyle = 'white'

  objects.forEach (obj) ->
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
  lighting.render ctx
  pe.render ctx
  ctx.restore()
  ctx.globalCompositeOperation = 'source-over'
  darkmask.render ctx

setup()

`
requestAnimFrame(function loop () {
  requestAnimFrame(loop, canvas);
  var now = +new Date();
  if (now >= lastUpdate + UPDATE_FREQ) {
    lastUpdate = now;
    update();
  }
  render();
}, canvas);
`
# Render stuff
lastUpdate = 0
UPDATE_FREQ = 25

update = ->
  computeLightings()
  darkmask.compute canvas.width, canvas.height

setup = ->
  update()

# THE KING OF THIS FILE FUNCTIONS
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
    topleft     = bounds.topleft
    bottomright = bounds.bottomright

    ctx.drawImage resources.get(obj.texture), topleft.x, topleft.y, bottomright.x - topleft.x,  bottomright.y - topleft.y
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
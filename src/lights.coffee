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
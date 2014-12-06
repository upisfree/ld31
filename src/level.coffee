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
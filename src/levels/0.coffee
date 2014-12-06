level.add
  objects: [
    new RectangleObject # игрок лежащий
      topleft: new Vec2 canvas.width / 1.5 - 325 / 2, canvas.height - 275 # 150 is player width
      bottomright: new Vec2 canvas.width / 1.5 + 325 / 2, canvas.height - 175
      texture: path.assets + 'player-lying.png'
  ]
  lights: [
    new Lamp # red signal lamp
      color: 'rgba(189, 0, 0, 0.9)'
      position: new Vec2 canvas.width / 1.5, 176
      distance: 300
      diffuse: 0.8
      radius: 0
      samples: 1
      roughness: 1
      angle: -26.75
    new Lamp # light
      color: 'rgba(250, 220, 150, 0.8)'
      position: new Vec2 canvas.width / 5, 176
      distance: 1
      diffuse: 0.8
      radius: 0
      samples: 1
      roughness: 1
      angle: -26.75
    new Lamp # light
      color: 'rgba(250, 220, 150, 0.8)'
      position: new Vec2 canvas.width / 2, 176
      distance: 1
      diffuse: 0.8
      radius: 0
      samples: 1
      roughness: 1
      angle: -26.75
    new Lamp # light
      color: 'rgba(250, 220, 150, 0.8)'
      position: new Vec2 canvas.width / 1.25, 176
      distance: 1
      diffuse: 0.8
      radius: 0
      samples: 1
      roughness: 1
      angle: -26.75
    new Lamp # light
      color: 'rgba(255, 255, 255, 1)'
      position: new Vec2 canvas.width / 2, canvas.height / 2
      distance: 1
      radius: 10
  ]
  action: ->
    blink = setInterval ->
      if Math.random() > 0.5
        currentLevel.lights[0].distance = 1
      else
        currentLevel.lights[0].distance = 300
    , 2000

    siren = resources.get path.assets + 'level-0/siren.mp3'
    siren.play()

    setTimeout ->
      # off blinking
      clearInterval blink
      currentLevel.lights[0].distance = 1

      bgmusic = resources.get path.assets + 'level-0/dimple-pinch-neat.mp3'
      bgmusic.volume 0.5
      bgmusic.loop = true
      bgmusic.play()

      setTimeout ->
        # on lights
        currentLevel.lights[1].distance = 300
        currentLevel.lights[2].distance = 300
        currentLevel.lights[3].distance = 300
        currentLevel.lights[4].distance = 50

        currentLevel.objects[0].texture = path.assets + 'null.png'
        currentLevel.objects.push new RectangleObject
          topleft: new Vec2 canvas.width / 1.5 - 150 / 2, canvas.height - 500
          bottomright: new Vec2 canvas.width / 1.5 + 150 / 2, canvas.height - 175
          texture: path.assets + 'player.png'

        # moving
        window.onkeydown = (e) ->
          switch e.keyCode
            when 38 then currentLevel.lights[4].position.y -= 10
            when 37 then currentLevel.lights[4].position.x -= 10
            when 40 then currentLevel.lights[4].position.y += 10
            when 39 then currentLevel.lights[4].position.x += 10

          if (currentLevel.lights[4].position.x + 10 >= currentLevel.objects[1].topleft.x and
             currentLevel.lights[4].position.x <= currentLevel.objects[1].bottomright.x) and
             (currentLevel.lights[4].position.y + 10 >= currentLevel.objects[1].topleft.y and
             currentLevel.lights[4].position.y <= currentLevel.objects[1].bottomright.y)
            $('#level-0-message').fadeIn 'fast'
          
            setTimeout ->
              $('#level-0-message').fadeOut('fast');
            , 5000
      , 2000
    , 8000
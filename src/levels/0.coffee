level.add
  objects: [
    new RectangleObject # игрок лежащий
      topleft: new Vec2 canvas.width - 150, canvas.height / 2 + 450 / 2 # 150 is player width
      bottomright: new Vec2 canvas.width, canvas.height / 2 - 450 / 2
      texture: path.assets + 'exit.png'
  ]
  lights: [
    new Lamp # player
      color: 'rgba(255, 255, 255, 1)'
      position: new Vec2 20, canvas.height - 20
      distance: 100
      radius: 50
    new Lamp # light
      color: "rgba(#{Math.randomInt 0, 255}, #{Math.randomInt 0, 255}, #{Math.randomInt 0, 255}, #{Math.random()})"
      position: new Vec2 Math.randomInt(0, canvas.width), Math.randomInt(0, canvas.height)
      distance: Math.randomInt 100, 300
      diffuse: 0.8
      radius: Math.randomInt 50, 100
    new Lamp # light
      color: "rgba(#{Math.randomInt 0, 255}, #{Math.randomInt 0, 255}, #{Math.randomInt 0, 255}, #{Math.random()})"
      position: new Vec2 Math.randomInt(0, canvas.width), Math.randomInt(0, canvas.height)
      distance: Math.randomInt 100, 300
      diffuse: 0.8
      radius: Math.randomInt 50, 100
    new Lamp # light
      color: "rgba(#{Math.randomInt 0, 255}, #{Math.randomInt 0, 255}, #{Math.randomInt 0, 255}, #{Math.random()})"
      position: new Vec2 Math.randomInt(0, canvas.width), Math.randomInt(0, canvas.height)
      distance: Math.randomInt 100, 300
      diffuse: 0.8
      radius: Math.randomInt 50, 100
    new Lamp # light
      color: "rgba(#{Math.randomInt 0, 255}, #{Math.randomInt 0, 255}, #{Math.randomInt 0, 255}, #{Math.random()})"
      position: new Vec2 Math.randomInt(0, canvas.width), Math.randomInt(0, canvas.height)
      distance: Math.randomInt 100, 300
      diffuse: 0.8
      radius: Math.randomInt 50, 100
  ]
  action: ->
    # moving
    window.onkeydown = (e) ->
      console.log e
      switch e.keyCode
        when 38 then currentLevel.lights[0].position.y -= 10
        when 37 then currentLevel.lights[0].position.x -= 10
        when 40 then currentLevel.lights[0].position.y += 10
        when 39 then currentLevel.lights[0].position.x += 10

      for i in [1..currentLevel.lights.length - 1]
        player = currentLevel.lights[0]
        light  = currentLevel.lights[i]

        dx = (player.position.x + player.distance) - (light.position.x + light.distance)
        dy = (player.position.y + player.distance) - (light.position.y + light.distance)
        distance = Math.sqrt dx * dx + dy * dy

        if distance < player.distance + light.distance # collision with light
          console.log 'collision detected'

      if (currentLevel.lights[0].position.x + 100 >= currentLevel.objects[0].topleft.x and
         currentLevel.lights[0].position.x <= currentLevel.objects[0].bottomright.x) and
         (currentLevel.lights[0].position.y + 100 >= currentLevel.objects[0].topleft.y and
         currentLevel.lights[0].position.y <= currentLevel.objects[0].bottomright.y)
        console.log 'finish collision'
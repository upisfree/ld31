level.add
  objects: [
    new RectangleObject # потолок
      topleft: new Vec2 0, 600
      bottomright: new Vec2 canvas.width, 100
    new RectangleObject # игрок
      topleft: new Vec2 100, canvas.height - 500
      bottomright: new Vec2 250, canvas.height - 175
      texture: path.assets + 'player.png'
  ]
  lights: [
    new Lamp
      color: 'rgba(255, 0, 0, 1)'
      distance: 30
    new Lamp
      color: 'rgba(255, 255, 255, 0.2)'
      distance: 100
      position: new Vec2 600, 700
  ]
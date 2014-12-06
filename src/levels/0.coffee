level.add
  objects: [
    new RectangleObject # потолок
      topleft: new Vec2 0, 150
      bottomright: new Vec2 canvas.width, 175
      texture: path.assets + 'level-0/background.png'
    new RectangleObject # пол
      topleft: new Vec2 0, canvas.height - 175
      bottomright: new Vec2 canvas.width, canvas.height - 150
      texture: path.assets + 'level-0/background.png'
    new RectangleObject # игрок
      topleft: new Vec2 100, canvas.height - 500
      bottomright: new Vec2 250, canvas.height - 175
      texture: path.assets + 'player.png'
  ]
  lights: [
    new Lamp
      color: 'rgba(255, 220, 150, 0.6)'
      distance: 300
    new Lamp
      color: 'rgba(255, 220, 150, 0.6)'
      distance: 300
      position: new Vec2 500, 500
  ]
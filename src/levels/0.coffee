level.add
  objects: [
    new RectangleObject # потолок
      topleft: new Vec2 0, 150
      bottomright: new Vec2 canvas.width, 175
    new RectangleObject # пол
      topleft: new Vec2 0, canvas.height - 175
      bottomright: new Vec2 canvas.width, canvas.height - 150
    new RectangleObject # игрок
      topleft: new Vec2 100, canvas.height - 300
      bottomright: new Vec2 150, canvas.height - 175
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
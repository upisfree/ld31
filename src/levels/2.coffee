level.add
  objects: [
    new RectangleObject # потолок
      topleft: new Vec2 0, 600
      bottomright: new Vec2 canvas.width / 2, 50
  ]
  lights: [
    new Lamp
      color: 'rgba(0, 255, 0, 1)'
      distance: 30
  ]
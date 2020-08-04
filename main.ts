let disciple = DisciplePlayer.create(SpriteKind.Player, 0, 0, Characters.Matthew)
DisciplePlayer.playAnimation(AnimationTypes.Idle)
controller.moveSprite(disciple.sprite)

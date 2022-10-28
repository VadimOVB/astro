namespace SpriteKind {
    export const Furniture = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy(effects.hearts, 100)
    info.changeLifeBy(1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    timer.throttle("fire", 500, function () {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 2 5 5 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite, 150, 0)
        projectile.startEffect(effects.fire, 500)
    })
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vx = -150
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    mySprite.vx = 0
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    mySprite.vx = 0
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vx = 30
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    sprite.destroy()
    info.changeScoreBy(1)
    speed += 2
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
    info.changeLifeBy(-1)
})
let mySprite3: Sprite = null
let mySprite2: Sprite = null
let Border: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
info.setLife(3)
let speed = 20
mySprite = sprites.create(img`
    ..ccc.........ccccc.....
    ..c4cc.......ccc22c.....
    ..c44cc...cccccccc......
    ..c244cccc22224442cc....
    ..c224cc2222222244b9c...
    ..cc2222222222222b999c..
    .c22c222222222b11199b2c.
    c22ccccccc222299111b222c
    ccccccc222c222222222222c
    .....c2222442222222222c.
    ....c222244ccccccccccc..
    ...c222244cc............
    ...c2222ccc.............
    ....ccccc...............
    ........................
    ........................
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 0, 100)
mySprite.setStayInScreen(true)
scene.setBackgroundColor(8)
game.onUpdateInterval(500, function () {
    if (Math.percentChance(20)) {
        Border = sprites.create(img`
            .........bbbb...........
            .......bb1111bb.........
            ......bb111111bbbbb.....
            ......b1111111ddd11b....
            ......b11111111d1111b...
            ...bbbd11111111d1111b...
            ..b11111111111111111bb..
            .b11111111111111111d11b.
            .b111d11111111111111111b
            cdd1d111111111111111111c
            cdddd11111111111111111dc
            cddbd11111d11111dd111dc.
            .cbbdd111dddd11ddbdddcc.
            .ccbbdddddbdddddddbcc...
            ...cccdddbbbdddddcc.....
            ......ccccccccccc.......
            `, SpriteKind.Furniture)
        Border.setPosition(170, randint(20, 100))
        Border.setVelocity(randint(-5, 5) - speed, 0)
        Border.setFlag(SpriteFlag.AutoDestroy, true)
        Border.setFlag(SpriteFlag.Ghost, true)
        Border.z = randint(-1, 1)
    } else if (Math.percentChance(15)) {
        mySprite2 = sprites.create(img`
            ....ffffff..............
            ....ff7cccf.........cf..
            .....ff7cccfff.....c6f..
            ....cc77777777ccccc66f..
            ...c9b766677777ccc667f..
            ..c99966777777777767fc..
            .c7b9917777777777777fcc.
            c777b1111b77777777cc77cf
            f7777771997777ccccccc77f
            .f77777777777c777cffffff
            ..ff7777777c667777ff....
            ....fffffffff667777fc...
            .........f7cff667777c...
            .........fccfffc7777c...
            ..........fc7ffffffff...
            ...........c7fff........
            `, SpriteKind.Enemy)
        mySprite2.setPosition(170, randint(20, 100))
        mySprite2.setVelocity(randint(-10, 5) - speed, 0)
        mySprite2.setFlag(SpriteFlag.AutoDestroy, true)
        mySprite2.z = randint(-2, 1)
    } else if (Math.percentChance(1)) {
        mySprite3 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . f f f f f . f f f f f . . 
            . . f f 2 2 2 f f f 2 2 2 f f . 
            . . f 2 2 2 2 2 f 2 2 1 2 2 f . 
            . . f 2 2 2 2 2 2 2 1 1 1 2 f . 
            . . f 2 2 2 2 2 2 2 2 1 2 2 f . 
            . . f 2 2 2 2 2 2 2 2 2 2 2 f . 
            . . f f 2 2 2 2 e 2 2 2 2 f f . 
            . . . f f 2 2 e e e 2 2 f f . . 
            . . . . f f 2 e e e 2 f f . . . 
            . . . . . f f e e e f f . . . . 
            . . . . . . f f e f f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Food)
        mySprite3.setPosition(170, randint(20, 100))
        mySprite3.setVelocity(randint(-10, 0) - speed, 0)
        mySprite3.setFlag(SpriteFlag.AutoDestroy, true)
        mySprite3.z = randint(-2, 1)
    }
})

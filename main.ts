controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    game.showLongText("Hit the fish with cannonballs and don't let them touch you! Good luck", DialogLayout.Center)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    cannonball = sprites.create(assets.image`cannonball`, SpriteKind.Projectile)
    cannonball.setVelocity(50, 0)
    cannonball.y = sub.y - 8
    cannonball.x = sub.x + 5
    cannonball.setScale(1, ScaleAnchor.Middle)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (cannonball, fishp) {
    sprites.destroy(cannonball)
    fishp.data.num_hits = fishp.data.num_hits + 1
if (fishp.data.num_hits > fishp.data.max_num_hits) {
        array_index = fishp.data.di
        sprites.destroy(fishp)
        fish_left_per_level[array_index] = fish_left_per_level[array_index] - 1
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    game.setGameOverMessage(false, "fail :(")
    game.gameOver(false)
})
let array_index = 0
let cannonball: Sprite = null
let sub: Sprite = null
let fish_left_per_level: number[] = []
let fishp_index = 0
let fish: Sprite = null
fish_left_per_level = [10]
game.showLongText("Hit the fish with cannonballs and don't let them touch you! Good luck", DialogLayout.Center)
sub = sprites.create(assets.image`subby`, SpriteKind.Player)
sub.setPosition(9, 66)
controller.moveSprite(sub, 100, 100)
sub.setScale(2, ScaleAnchor.Middle)
sub.setStayInScreen(true)
let max_hits_fishp = 3
let level_complete = [
false,
false,
false,
false,
false
]
game.onUpdateInterval(1000, function () {
    if (fish_left_per_level[fishp_index] > 0) {
        fish = sprites.create(assets.image`fish1`, SpriteKind.Enemy)
        animation.runImageAnimation(
        fish,
        assets.animation`fishp`,
        500,
        true
        )
        fish.setPosition(164, randint(0, 110))
        fish.setVelocity(-30, 0)
        fish.data.num_hits = 0
fish.data.max_num_hits = max_hits_fishp
fish.data.di = fishp_index
    } else {
        if (level_complete[fishp_index] == false) {
            game.showLongText("Level 1 complete!", DialogLayout.Center)
            level_complete[fishp_index] = true
        }
    }
})
game.onUpdateInterval(500, function () {
    if (Math.percentChance(50)) {
        scene.setBackgroundImage(assets.image`underwater1`)
    } else {
        scene.setBackgroundImage(assets.image`underwater0`)
    }
})

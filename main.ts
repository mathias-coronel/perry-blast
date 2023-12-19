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
let cannonball: Sprite = null
let fishp_index = 0
let sub: Sprite = null
let fish_left_per_level: number[] = []
let array_index = 0
let fish: Sprite = null
fish_left_per_level = [
10,
12,
14,
16,
20
]
game.showLongText("Hit the fish with cannonballs and don't let them touch you! Good luck", DialogLayout.Center)
sub = sprites.create(assets.image`subby`, SpriteKind.Player)
sub.setPosition(9, 66)
controller.moveSprite(sub, 100, 100)
sub.setScale(2, ScaleAnchor.Middle)
sub.setStayInScreen(true)
let max_hits = [2, 2, 3]
let level_complete = [
false,
false,
false,
false,
false
]
let active_fish = fishp_index
let asset_imgs = [assets.image`fish1`, assets.image`fisho`, assets.image`crab`]
let asset_anims = [assets.animation`fishp`, assets.animation`fisho`, assets.animation`crab`]
let fish_speed = [-20, -30, -40, -50, -60]
game.onUpdateInterval(1000, function () {
    if (fish_left_per_level[active_fish] > 0) {
        fish = sprites.create(asset_imgs[active_fish], SpriteKind.Enemy)
        animation.runImageAnimation(
        fish,
        asset_anims[active_fish],
        500,
        true
        )
        fish.setPosition(164, randint(0, 110))
        fish.setVelocity(fish_speed[active_fish], 0)
        fish.data.num_hits = 0
fish.data.max_num_hits = max_hits[active_fish]
fish.data.di = active_fish
    } else {
        if (level_complete[active_fish] == false) {
            game.showLongText("Level " + (active_fish + 1) + " complete!", DialogLayout.Center)
            level_complete[active_fish] = true
            active_fish = active_fish + 1
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

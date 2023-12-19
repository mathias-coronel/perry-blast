controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    game.showLongText("Hit the fish with cannonballs and don't let them touch you! Good luck", DialogLayout.Center)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    cannonball = sprites.create(assets.image`cannonball`, SpriteKind.Projectile)
    cannonball.setVelocity(50, 0)
    cannonball.y = sub.y - 8
    cannonball.x = sub.x + 5
    cannonball.setScale(0.5, ScaleAnchor.Middle)
    num_cannonballs = num_cannonballs + 1
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (cannonball, fishp) {
    x = cannonball.x
    y = cannonball.y
    sprites.destroy(cannonball)
    num_hits = num_hits + 1
    // Call the createExplosion function when needed
    createExplosion(x, y)
    info.setScore(info.score() + fish.data.hit_val)
    fishp.data.num_hits = fishp.data.num_hits + 1
if (fishp.data.num_hits >= fishp.data.max_num_hits) {
        array_index = fishp.data.di
sprites.destroy(fishp)
        fish_left_per_level[array_index] = fish_left_per_level[array_index] - 1
    }
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    game.setGameOverMessage(false, "fail :(")
    game.gameOver(false)
})
// Function to create an explosion at a specific position
function createExplosion (x: number, y: number) {
    for (let index = 0; index < 20; index++) {
        createParticle(x, y)
    }
}
// Create a function to generate particles for the explosion
function createParticle (x: number, y: number) {
    particle = sprites.create(assets.image`red`, SpriteKind.Projectile)
    // Set the initial position of the particle
    particle.setPosition(x, y)
    // Set random velocity for the particle
    particle.vx = Math.randomRange(-50, 50)
    particle.vy = Math.randomRange(-50, 50)
    // Set a lifespan for the particle and destroy it after a short delay
    // Adjust the lifespan as needed
    particle.lifespan = 100
    particle.setFlag(SpriteFlag.AutoDestroy, true)
}
let msg = ""
let accuracy = 0
let particle: Sprite = null
let y = 0
let x = 0
let num_cannonballs = 0
let cannonball: Sprite = null
let fishp_index = 0
let sub: Sprite = null
let fish_left_per_level: number[] = []
let num_hits = 0
let array_index = 0
let fish: Sprite = null
info.setScore(0)
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
let max_hits = [
2,
3,
4,
5,
6
]
// for testing
// fish_left_per_level = [
// 1,
// 1,
// 1,
// 1,
// 1
// ]
// max_hits = [
// 1,
// 1,
// 1,
// 1,
// 1
// ]
// end for testing
let hit_val = [
10,
20,
40,
80,
100
]
let level_complete = [
false,
false,
false,
false,
false
]
let active_fish = fishp_index
let asset_imgs = [
assets.image`fish1`,
assets.image`fisho`,
assets.image`crab`,
assets.image`clam`,
assets.image`shark`
]
let asset_anims = [
assets.animation`fishp`,
assets.animation`fisho`,
assets.animation`crab`,
assets.animation`clam`,
assets.animation`shark`
]
let fish_speed = [
-20,
-30,
-40,
-50,
-60
]
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
fish.data.hit_val = hit_val[active_fish]
    } else {
        if (level_complete[active_fish] == false) {
            game.showLongText("Level " + (active_fish + 1) + " complete!", DialogLayout.Center)
            level_complete[active_fish] = true
            active_fish = active_fish + 1
            if (active_fish == 5) {
                accuracy = Math.floor(num_hits * 100 / num_cannonballs)
                msg = "# Shots: " + num_cannonballs + "\n"
                msg = "" + msg + "# Hits: " + num_hits + "\n"
                msg = "" + msg + "Accuracy: " + accuracy + "%"
                game.showLongText(msg, DialogLayout.Center)
                msg = "you won! :)"
                game.setGameOverMessage(true, msg)
                game.gameOver(true)
            }
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

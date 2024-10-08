export class Ball {
    x: number
    y: number
    r: number
    bg: string

    constructor(x: number, y: number, r: number, bg: string) {
        this.x = x
        this.y = y
        this.r = r
        this.bg = bg
    }
}

export class Player extends Ball {
    dy: number
    spellBg: string
    fireRate: number
    constructor( x: number, y: number, r: number, bg: string, dy: number, spellBg: string, fireRate: number) {
        super(x, y, r, bg)
        this.dy = dy
        this.spellBg = spellBg
        this.fireRate = fireRate
    }
}

export class Spell extends Ball {
    dx: number
    constructor( x: number, y: number, r: number, dx: number, bg: string) {
        super(x, y, r, bg)
        this.dx = dx
    }
}

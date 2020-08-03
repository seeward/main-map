enum Characters {
    //% block='Mathew'
    Matthew = 1,
    //% block='Mark'
    Mark = 2,
    //% block='Luke' 
    Luke = 3,
    //% block='John',
    John = 4
}
    
enum AnimationTypes {
        //% block='Attack Left'
        attackLeft = 1,
        //% block='Attack Right'
        attackRight = 2,
        //% block='Idle Left'
        IdleLeft = 3,
        //% block='Idle Right'
        IdleRight = 4,
        //% block='Walk Left'
        WalkLeft = 5,
        //% block='Walk Right'
        WalkRight = 6
    }

namespace codeplant.mainmap {
    
    //% blockId=playerCreate block="sprite of kind %kind=spritekind || at x %x y %y of %c"
    //% expandableArgumentMode=toggle
    //% inlineInputMode=inline
    //% blockSetVariable=disciple
    //% weight=100
    let _disciple : Disciple = null;
    export function create(k: number, x: number, y: number, c: Characters): Disciple {
       _disciple = new Disciple(k,x,y,c);
       return _disciple
    }

    
}

class Disciple {

    private _player: Sprite = null; // hold our player
    private _character: Characters = null; // which Disciple
    private walkDown: Image[] = [img`
    . . . . . f f f f . . . . .
    . . . f f e e e e f f . . .
    . . f e e e e e e e e f . .
    . . f e e e e e e e e f . .
    . f e d e e e e e e e e f .
    . f d d d d e e e e e d f .
    . f d d d f d d f d d d f .
    . . f d d d d f d d d f . .
    . . . f d d d f d d f . . .
    . . f 2 f d d d d f 2 f . .
    . f d 2 2 f f f f 2 2 d f .
    f d d 2 2 2 2 2 2 2 2 d d f
    f d d f 2 2 2 2 2 2 f d d f
    f d d f 2 2 2 2 2 2 f d d f
    . f f 8 f f f f f f 8 f f .
    . . f 8 8 8 8 8 8 8 8 f . .
    . . f 8 8 8 f f 8 8 8 f . .
    . . f e e e f f e e e f . .
    . . . f f f . . f f f . . .
`,img`
    . . . . . . . . . . . . . . 
    . . . . . f f f f . . . . . 
    . . . f f e e e e f f . . . 
    . . f e e e e e e e e f . . 
    . . f e e e e e e e e f . . 
    . f e d e e e e e e e e f . 
    . 3 d d d d e e e e e d f . 
    . f d d d f d d f d d d f . 
    . . f d d d d f d d d f f . 
    . . . f d d d f d d f d d f 
    . f f 2 f d d d d f 2 2 d f 
    . f d 2 2 f f f f 2 2 f f . 
    . f d d 2 2 2 2 2 2 2 f . . 
    . f d d 2 2 2 2 2 2 2 f . . 
    . f f 8 f f f f f f 8 f . . 
    . . f 8 8 8 f 8 8 8 8 f . . 
    . . . f f f f f 8 8 8 f . . 
    . . . . . . . f e e e f . . 
    . . . . . . . . f f f . . . 
    `,img`
    . . . . . f f f f . . . . . 
    . . . f f e e e e f f . . . 
    . . f e e e e e e e e f . . 
    . . f e e e e e e e e f . . 
    . f e d e e e e e e e e f . 
    . f d d d d e e e e e d f . 
    . f d d d f d d f d d d f . 
    . . f d d d d f d d d f . . 
    . . . f d d d f d d f . . . 
    . . f 2 f d d d d f 2 f . . 
    . f d 2 2 f f f f 2 2 d f . 
    f d d 2 2 2 2 2 2 2 2 d d f 
    f d d f 2 2 2 2 2 2 f d d f 
    f d d f 2 2 2 2 2 2 f d d f 
    . f f 8 f f f f f f 8 f f . 
    . . f 8 8 8 8 8 8 8 8 f . . 
    . . f 8 8 8 f f 8 8 8 f . . 
    . . f e e e f f e e e f . . 
    . . . f f f . . f f f . . . 
    `,img`
    . . . . . . . . . . . . . . 
    . . . . . f f f f . . . . . 
    . . . f f e e e e f f . . . 
    . . f e e e e e e e e f . . 
    . . f e e e e e e e e f . . 
    . f e d e e e e e e e e f . 
    . f d d d d e e e e e d f . 
    . f d d d f d d f d d d f . 
    . . f d d d d f d d d f . . 
    . d d f d d d f d d f . . . 
    . d f 2 f d d d d f f f . . 
    . f 2 2 2 f f f f f d d f . 
    . f 2 2 2 2 2 2 2 f d d f . 
    . . f f 2 2 2 2 2 f d d . . 
    . . f 8 f f f f f f 8 f . . 
    . . f 8 8 8 8 f 8 8 8 f . . 
    . . f 8 8 8 f f f f f f . . 
    . . f e e e f . . . . . . . 
    . . . f f f . . . . . . . . 
    `];
    private walkUp: Image[] = [img`
        . . . . . f f f f . . . . . 
        . . . f f e e e e f f . . . 
        . . f e e e e e e e e f . . 
        . . f e e e e e e e e f . . 
        . f e e e e e e e e e e f . 
        . f e e e e e e e e e e f . 
        . f e e e e e e e e e e f . 
        . . f e e e e e e e e f . . 
        . . . f d e e e e d f . . . 
        . . f 2 f d d d d f 2 f . . 
        . f d 2 2 f f f f 2 2 d f . 
        f d d 2 2 2 2 2 2 2 2 d d f 
        f d d f 2 2 2 2 2 2 f d d f 
        f d d f 2 2 2 2 2 2 f d d f 
        . f f 8 f f f f f f 8 f f . 
        . . f 8 8 8 8 8 8 8 8 f . . 
        . . f 8 8 8 f f 8 8 8 f . . 
        . . f e e e f f e e e f . . 
        . . . f f f . . f f f . . . 
        `,img`
        . . . . . . . . . . . . . . 
        . . . . . f f f f . . . . . 
        . . . f f e e e e f f . . . 
        . . f e e e e e e e e f . . 
        . . f e e e e e e e e f . . 
        . f e e e e e e e e e e f . 
        . f e e e e e e e e e e f . 
        . f e e e e e e e e e e f . 
        . . f e e e e e e e e f f . 
        . . . f d e e e e d f d d f 
        . f f 2 f d d d d f 2 2 d f 
        . f d 2 2 f f f f 2 2 f f . 
        . f d d 2 2 2 2 2 2 2 f . . 
        . f d d 2 2 2 2 2 2 2 f . . 
        . f f 8 f f f f f f 8 f . . 
        . . f 8 8 8 f 8 8 8 8 f . . 
        . . . f f f f f 8 8 8 f . . 
        . . . . . . . f e e e f . . 
        . . . . . . . . f f f . . . 
        `,img`
        . . . . . f f f f . . . . . 
        . . . f f e e e e f f . . . 
        . . f e e e e e e e e f . . 
        . . f e e e e e e e e f . . 
        . f e e e e e e e e e e f . 
        . f e e e e e e e e e e f . 
        . f e e e e e e e e e e f . 
        . . f e e e e e e e e f . . 
        . . . f d e e e e d f . . . 
        . . f 2 f d d d d f 2 f . . 
        . f d 2 2 f f f f 2 2 d f . 
        f d d 2 2 2 2 2 2 2 2 d d f 
        f d d f 2 2 2 2 2 2 f d d f 
        f d d f 2 2 2 2 2 2 f d d f 
        . f f 8 f f f f f f 8 f f . 
        . . f 8 8 8 8 8 8 8 8 f . . 
        . . f 8 8 8 f f 8 8 8 f . . 
        . . f e e e f f e e e f . . 
        . . . f f f . . f f f . . . 
        `,img`
        . . . . . . . . . . . . . . 
        . . . . . f f f f . . . . . 
        . . . f f e e e e f f . . . 
        . . f e e e e e e e e f . . 
        . . f e e e e e e e e f . . 
        . f e e e e e e e e e e f . 
        . f e e e e e e e e e e f . 
        . f e e e e e e e e e e f . 
        . . f e e e e e e e e f . . 
        . . f f d e e e e d f . . . 
        . f 2 2 f d d d d f f f . . 
        . f 2 2 2 f f f f f d d f . 
        . f 2 2 2 2 2 2 2 f d d f . 
        . . f f 2 2 2 2 2 f d d . . 
        . . f 8 f f f f f f 8 f . . 
        . . f 8 8 8 8 f 8 8 8 f . . 
        . . f 8 8 8 f f f f f f . . 
        . . f e e e f . . . . . . . 
        . . . f f f . . . . . . . . 
        `]
    private walkLeft: Image[] = [img`
        . . . . . f f f f . . . . . 
        . . . f f e e e e f f . . . 
        . . f e e e e e e e e f . . 
        . . f e e e e e e e e f . . 
        . f e d e e e e e e e e f . 
        f e d d e e e e e e e e f . 
        . f d f d d e e e e e e f . 
        . f d f d d e e e d e e f . 
        . . f d d d d d d d e f . . 
        . . . f d d d d d d f . . . 
        . . . . f f f f f f . . . . 
        . . . f 2 2 f 2 2 2 f . . . 
        . . . f 2 f f f 2 2 f . . . 
        . . . f 2 f d f 2 2 f . . . 
        . . . . f f d f 2 2 f . . . 
        . . . . f f d f f f . . . . 
        . . . f 8 f f f 8 f . . . . 
        . . . f 8 8 8 8 8 f . . . . 
        . . . . f f f f f . . . . . 
        `,img`
        . . . . . . . . . . . . . . 
        . . . . . f f f f . . . . . 
        . . . f f e e e e f f . . . 
        . . f e e e e e e e e f . . 
        . . f e e e e e e e e f . . 
        . f e d e e e e e e e e f . 
        f e d d e e e e e e e e f . 
        . f d f d d e e e e e e f . 
        . f d f d d e e e d e e f . 
        . . f d d d d d d d e f . . 
        . . f f d d d d d d f . . . 
        . . f d f f f f f f d f . . 
        . f d d 2 2 2 2 2 f d d f . 
        . . f 2 2 2 2 2 2 f d d f . 
        . f e f 8 8 f 8 8 8 f f . . 
        f e e e f 8 f 8 8 8 f f . . 
        . f e e e f . f f f e e f . 
        . . f e f . . . f e e f . . 
        . . . f . . . . . f f . . . 
        `,img`
        . . . . . f f f f . . . . . 
        . . . f f e e e e f f . . . 
        . . f e e e e e e e e f . . 
        . . f e e e e e e e e f . . 
        . f e d e e e e e e e e f . 
        f e d d e e e e e e e e f . 
        . f d f d d e e e e e e f . 
        . f d f d d e e e d e e f . 
        . . f d d d d d d d e f . . 
        . . . f d d d d d d f . . . 
        . . . . f f f f f f . . . . 
        . . . f 2 2 f 2 2 2 f . . . 
        . . . f 2 f f f 2 2 f . . . 
        . . . f 2 f d f 2 2 f . . . 
        . . . . f f d f 2 2 f . . . 
        . . . . f f d f f f . . . . 
        . . . f 8 f f f 8 f . . . . 
        . . . f 8 8 8 8 8 f . . . . 
        . . . . f f f f f . . . . . 
        `,img`
        . . . . . . . . . . . . . . 
        . . . . . f f f f . . . . . 
        . . . f f e e e e f f . . . 
        . . f e e e e e e e e f . . 
        . . f e e e e e e e e f . . 
        . f e d e e e e e e e e f . 
        f e d d e e e e e e e e f . 
        . f d f d d e e e e e e f . 
        . f d f d d e e e d e e f . 
        . . f d d d d d d d e f . . 
        . . f f d d d d d d f . . . 
        . . f d f f f f f f d f . . 
        . f d d 2 2 2 2 2 f d d f . 
        . . f 2 2 2 2 2 2 f d d f . 
        . f f f 8 8 f 8 8 8 f e . . 
        f e e f f 8 f 8 8 8 e e f . 
        . f e f f f . f f f e e f . 
        . . f e f . . . f e e f . . 
        . . . f . . . . . f f . . . 
        `]

        private walkRight: Image[] = [img`
        . . . . . f f f f . . . . . 
        . . . f f e e e e f f . . . 
        . . f e e e e e e e e f . . 
        . . f e e e e e e e e f . . 
        . f e e e e e e e e d e f . 
        f e e e e e e e e d d d f . 
        . f e e e e e e d d f d f . 
        . f e e d d e e d d f d f . 
        . . f e d d d d d d d f . . 
        . . . f d d d d d d f . . . 
        . . . . f f f f f f . . . . 
        . . . f 2 2 f 2 2 2 f . . . 
        . . . f 2 f f f 2 2 f . . . 
        . . . f 2 f d f 2 2 f . . . 
        . . . . f f d f 2 2 f . . . 
        . . . . f f d f f f . . . . 
        . . . f 8 f f f 8 f . . . . 
        . . . f 8 8 8 8 8 f . . . . 
        . . . . f f f f f . . . . . 
        `,img`
        . . . . . . . . . . . . . . 
        . . . . . f f f f . . . . . 
        . . . f f e e e e f f . . . 
        . . f e e e e e e e e f . . 
        . . f e e e e e e e e f . . 
        . f e e e e e e e e d e f . 
        f e e e e e e e e d d d f . 
        . f e e e e e e d d f d f . 
        . f e e d d e e d d f d f . 
        . . f e d d d d d d d f . . 
        . . f f d d d d d d f . . . 
        . . f d f f f f f f d f . . 
        . f d d 2 2 2 2 2 f d d f . 
        . . f 2 2 2 2 2 2 f d d f . 
        . f e f 8 8 f 8 8 8 f f . . 
        f e e e f 8 f 8 8 8 f f . . 
        . f e e e f . f f f e e f . 
        . . f e f . . . f e e f . . 
        . . . f . . . . . f f . . . 
        `,img`
        . . . . . f f f f . . . . . 
        . . . f f e e e e f f . . . 
        . . f e e e e e e e e f . . 
        . . f e e e e e e e e f . . 
        . f e e e e e e e e d e f . 
        f e e e e e e e e d d d f . 
        . f e e e e e e d d f d f . 
        . f e e d d e e d d f d f . 
        . . f e d d d d d d d f . . 
        . . . f d d d d d d f . . . 
        . . . . f f f f f f . . . . 
        . . . f 2 2 f 2 2 2 f . . . 
        . . . f 2 f f f 2 2 f . . . 
        . . . f 2 f d f 2 2 f . . . 
        . . . . f f d f 2 2 f . . . 
        . . . . f f d f f f . . . . 
        . . . f 8 f f f 8 f . . . . 
        . . . f 8 8 8 8 8 f . . . . 
        . . . . f f f f f . . . . . 
        `,img`
        . . . . . . . . . . . . . . 
        . . . . . f f f f . . . . . 
        . . . f f e e e e f f . . . 
        . . f e e e e e e e e f . . 
        . . f e e e e e e e e f . . 
        . f e e e e e e e e d e f . 
        f e e e e e e e e d d d f . 
        . f e e e e e e d d f d f . 
        . f e e d d e e d d f d f . 
        . . f e d d d d d d d f . . 
        . . f f d d d d d d f . . . 
        . . f d f f f f f f d f . . 
        . f d d 2 2 2 2 2 f d d f . 
        . . f 2 2 2 2 2 2 f d d f . 
        . f f f 8 8 f 8 8 8 f e . . 
        f e e f f 8 f 8 8 8 e e f . 
        . f e f f f . f f f e e f . 
        . . f e f . . . f e e f . . 
        . . . f . . . . . f f . . . 
        `]
    public constructor(k: number, x: number =50, y: number = 50, c: Characters = 1) {
        this._player = sprites.create(this.walkDown[0], k)
        this._player.setFlag(SpriteFlag.StayInScreen, true);
        this._character = c;
        this._player.x = x;
        this._player.y = y;

    }


    //% blockId=discipleSprite block='Disciple sprite'
    get sprite(): Sprite {
        return this._player;
    }
}
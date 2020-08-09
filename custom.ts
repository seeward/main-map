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
        //% block='Walk Down'
        WalkDown = 1,
        //% block='Walk Up'
        WalkUp = 2,
        //% block='Idle'
        Idle = 3,
        //% block='Walk Left'
        WalkLeft = 4,
        //% block='Walk Right'
        WalkRight = 5
    }

namespace DisciplePlayer {
    
    let _disciple : Disciple = null;
    
    //% blockId=playerCreate block="sprite of kind %kind=spritekind || at x %x y %y of %c with %bc clothes and %hc hair "
    //% expandableArgumentMode=enabled
    //% inlineInputMode=inline
    //% blockSetVariable=disciple
    //% weight=100
    export function create(k: number, x: number = 25, y: number = 25, c: Characters, bc: number, hc: number): Disciple {
       _disciple = new Disciple(k,x,y,c);
       return _disciple
    }

    //% blockId=DiscipleAnimations block="Disciple Play %a Animation"
    //% a.shadow=animationTypes
    export function playAnimation(s: AnimationTypes) {
        animation.stopAnimation(animation.AnimationTypes.All, _disciple.sprite)
 
        switch (s) {
            case AnimationTypes.Idle:
                _disciple.idleAnimation();
                break
            case AnimationTypes.WalkDown:
                _disciple.walkDownAnimation()
                break
            case AnimationTypes.WalkUp:
                _disciple.walkUpAnimation()
                break
            case AnimationTypes.WalkLeft:
                _disciple.walkLeftAnimation()
                break
            case AnimationTypes.WalkRight:
                _disciple.walkRightAnimation()
                break
        }
    }
}

//% blockNamespace=DisciplePlayer
class Disciple {

    private _player: Sprite = null; // hold our player
    public _character: Characters = null; // which Disciple
    public baseColor: number = 1; 
    public hairColor: number = 1
    // animation image arrays
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
        . f d d d d e e e e e d f .
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
            . f d d 2 2 2 2 2 d d d f .
            . . f 2 2 2 2 2 2 d d d f .
            . f e f 8 8 f 8 8 d d f . .
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
            . f d d f f f f f f d f . .
            f d d d 2 2 2 2 2 f d d f .
            . f d d 2 2 2 2 2 f f f f .
            . f f f 8 8 f 8 8 8 f e e .
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
            . . f d f f f f f f d f f .
            . f d d 2 2 2 2 2 f d d d f
            . . f 2 2 2 2 2 2 f d d d f
            . f e f 8 8 f 8 8 f d d f f
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
            f f f e d d d d d d d f . .
            f d d f d d d d d d f . . .
            f d d d f f f f f f d f . .
            . f d d f 2 2 2 2 f d d f .
            . . f f f 2 2 2 2 f f f f .
            . f f f 8 8 f 8 8 8 f e . .
            f e e f f 8 f 8 8 8 e e f .
            . f e f f f . f f f e e f .
            . . f e f . . . f e e f . .
            . . . f . . . . . f f . . .
        `]
    private idle:Image[] = [img`
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
        . . f f d d d f d d f f . .
        . f d 2 f d d d d f 2 d f .
        f d d 2 f f f f f f 2 d d f
        f d d f 2 2 2 2 2 2 f d d f
        f d d f 2 2 2 2 2 2 f d d f
        . f f 8 f f f f f f 8 f f .
        . . f 8 8 8 8 8 8 8 8 f . .
        . . f 8 8 8 f f 8 8 8 f . .
        . . f e e e f f f f f f . .
        . . . f f f . . . . . . . .
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
        . . f f f f f f e e e f . .
        . . . . . . . . f f f . . .
    `
    ];

        
    public constructor(k: number, x: number = 50, y: number = 50, c: Characters, bc?: number, hc?: number ) {
        this.baseColor = bc
        this.hairColor = hc
        this._player = sprites.create(this.changePlayerColor(this.walkDown, c)[0], k)
        this._character = c;
        this._player.x = x;
        this._player.y = y;
    }
    
    public changePlayerColor(imgs: Image[], c: Characters, base?: number, hair?: number): Image[] {

        let newBaseColor: number = 1
        
        let newHairColor: number = 14
        let newImgArray: Image[] = []
        switch(c){
            case Characters.Matthew: 
                newBaseColor = 12
                newHairColor = 15
            break
            case Characters.John: 
                newBaseColor = 8
                newHairColor = 5
            break
            case Characters.Mark: 
                newBaseColor = 2
                newHairColor = 13
            break
            case Characters.Luke: 
                newBaseColor = 9
            break
            
        }

        imgs.forEach(function(value: Image, index: number) {
            value.replace(2, base ?  base : newBaseColor)
            value.replace(8,  base ?  base : newBaseColor)
            value.replace(14, hair ? hair : newHairColor)
            newImgArray.push(value)
        })

        this.baseColor = base ?  base : newBaseColor
        this.hairColor = hair ? hair : newHairColor
        
        return newImgArray
    }
    public walkRightAnimation(){
        animation.runImageAnimation(
        this._player,
        this.changePlayerColor(this.walkRight, this._character),
        200,
        true
        )
    }
    public walkLeftAnimation(){
        animation.runImageAnimation(
        this._player,
        this.changePlayerColor(this.walkLeft, this._character),
        200,
        true
        )
    }
    public walkUpAnimation(){
        animation.runImageAnimation(
        this._player,
        this.changePlayerColor(this.walkUp, this._character),
        200,
        true
        )
    }
    public walkDownAnimation(){
        animation.runImageAnimation(
        this._player,
        this.changePlayerColor(this.walkDown, this._character),
        200,
        true
        )
    }
    public idleAnimation(){
        animation.runImageAnimation(
        this._player,
        this.changePlayerColor(this.idle, this._character),
        200,
        true
        )
    }

    //% blockId=jesusSprite block="%Disciple(disciple) sprite"
    //% weight=8
    get sprite(): Sprite {
        return this._player;
    }
}
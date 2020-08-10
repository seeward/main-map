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
enum _colors {
    //% block='None'
    None = 0,
    //% block='White'
    White = 1,
   //% block='Red'
    Red = 2,
    //% block='Pink'
    Pink = 3,
    //% block='Orange'
    Orange = 4,
    //% block='Yellow'
    Yellow = 5,
    //% block='Aqua'
    Aqua = 6,
    //% block='Green'
    Green = 7,
    //% block='Dark Blue'
    DarkBlue = 8,
    //% block='Light Blue'
    LightBlue = 9,
    //% block='Purple'
    Purple = 10,
    //% block='Grey'
    Grey = 11,
    //% block='Olive'
    Olive = 12,
    //% block='Cream'
    Cream = 13,
    //% block='Light Brown'
    LightBrown = 14,
    //% block='Black'
    Black = 15

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
    let _pharisee : Pharisee = null;
    
    //% blockId=playerCreate block="sprite of kind %k=spritekind || at x %x y %y of %c"
    //% expandableArgumentMode=enabled
    //% inlineInputMode=inline
    //% blockSetVariable=disciple
    //% weight=100
    export function create(k: number, x: number = 25, y: number = 25, c: Characters): Disciple {
       _disciple = new Disciple(k,x,y,c);
       return _disciple
    }
    

    //% blockId=phariseeCreate block="sprite of kind %k=spritekind || at x %x y %y"
    //% expandableArgumentMode=enabled
    //% inlineInputMode=inline
    //% blockSetVariable=pharisee
    //% weight=100
    export function createPharisee(k: number, x: number = 25, y: number = 25): Pharisee {
       _pharisee = new Pharisee(k,x,y);
       return _pharisee
    }


    //% blockId=changeColor block="Change Clothes to $c and Hair to $h"
    export function changeColors(c:_colors, h: _colors) {
        _disciple.baseColor = c;
        _disciple.hairColor = h;
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
    public baseColor: number = 2; 
    public hairColor: number = 14;
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
        . f e e e e e e e e e f . .
        f e e d e e e e e e e e f .
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
        . f e e e e e e e e e f . .
        f e e d e e e e e e e e f .
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
        . f f e e e e e e e e f . .
        f e e e e e e e e e e f . .
        f e d d e e e e e e e e f .
        f d d d e e e e e e e e f .
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
        . . f e e e e e e e e e f .
        . f e e e e e e e e d e e f
        . f e e e e e e e d d d f .
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
        . . f e e e e e e e e f f .
        . . f e e e e e e e e e e f
        . f e e e e e e e e d e f .
        . f e e e e e e e d d d f .
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
        . . f e e e e e e e e e f .
        . f e e e e e e e e d e e f
        . f e e e e e e e d d d f .
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
        . . f e e e e e e e e e e f
        . f e e e e e e e e d e f .
        . f e e e e e e e d d d f .
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
        . . f e e e f f e e e f . .
        . . . f f f . . f f f . . .
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

        
    public constructor(k: number, x: number = 50, y: number = 50, c: Characters ) {
         switch(c){
            case Characters.Matthew: 
                this.baseColor = 12
                this.hairColor = 15
            break
            case Characters.John: 
                this.baseColor = 8
                this.hairColor = 14
            break
            case Characters.Mark: 
                this.baseColor = 2
                this.hairColor = 13
            break
            case Characters.Luke: 
                this.baseColor = 9
                this.hairColor = 5
            break
            
        }
        this._player = sprites.create(this.changePlayerColor(this.idle, c)[0], k)
        this._character = c;
        this._player.x = x;
        this._player.y = y;
    }
    
    public changePlayerColor(imgs: Image[], c: Characters): Image[] {
        let newImgArray : Image[] = [];

        imgs.forEach(function(value: Image, index: number) {
            value.replace(2, this.baseColor)
            value.replace(8,  this.baseColor)
            value.replace(14, this.hairColor)
            newImgArray.push(value)
        })
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


//% blockNamespace=DisciplePlayer
class Pharisee {

    private idle:Image[] = [img`
    . . . . . f f f f f f . . . . . 
    . f f . f e e e e e e f . . . . 
    f d d f 1 1 1 1 1 1 1 1 f . . . 
    f d d f e e d d d d e e 1 f . . 
    . f f 1 e d f d d f d e 1 f . . 
    . c c 1 e d d d f d d e 1 f . . 
    . c c 1 e d d f f d d e 1 f . . 
    . c 1 1 e e e d d e e e 1 1 f . 
    . f 1 1 f f e e e e f f 1 1 f . 
    . f 1 1 f c f f f f c f 1 d d f 
    . f 8 8 f c c c c c c f 8 d d f 
    . f 1 1 f c c c c c c f 1 1 f . 
    . f 8 8 f f f f f f f f 8 8 f . 
    . f 1 1 f c c c c c c f 1 1 f . 
    . f f f f c c f f c c f f f f . 
    . f f f f c f . . f c f f f f . 
    `,img`
    . . . . . f f f f f f . . . . . 
    . . . . f e e e e e e f . . . . 
    . f f . 1 1 1 1 1 1 1 1 f . . . 
    f d d f e e d d d d e e 1 f . . 
    f d d f e d f d d f d e 1 f . . 
    . f f 1 e d d d f d d e 1 f . . 
    . c c 1 e d d f f d d e 1 f . . 
    . c 1 1 e e e d d e e e 1 1 f . 
    . f 1 1 f f e e e e f f 1 1 f . 
    . f 1 1 f c f f f f c f 1 1 f . 
    . f 8 8 f c c c c c c f 8 d d f 
    . f 1 1 f c c c c c c f 1 d d f 
    . f 8 8 f f f f f f f f 8 8 f . 
    . f 1 1 f c c c c c c f 1 1 f . 
    . f f f f c c f f c c f f f f . 
    . f f f f c f . . f c f f f f . 
    `,img`
    . . . . . f f f f f f . . . . . 
    . . . . f e e e e e e f . . . . 
    . . . f 1 1 1 1 1 1 1 1 f . . . 
    . f f 1 e e d d d d e e 1 f . . 
    f d d f e d f d d f d e 1 f . . 
    f d d f e d d d f d d e 1 f . . 
    . f f 1 e d d f f d d e 1 f . . 
    . c 1 1 e e e d d e e e 1 1 f . 
    . f 1 1 f f e e e e f f 1 1 f . 
    . f 1 1 f c f f f f c f 1 d d f 
    . f 8 8 f c c c c c c f 8 d d f 
    . f 1 1 f c c c c c c f 1 1 f . 
    . f 8 8 f f f f f f f f 8 8 f . 
    . f 1 1 f c c c c c c f 1 1 f . 
    . f f f f c c f f c c f f f f . 
    . f f f f c f . . f c f f f f . 
    `,img`
    . . . . . f f f f f f . . . . . 
    . f f . f e e e e e e f . . . . 
    f d d f 1 1 1 1 1 1 1 1 f . . . 
    f d d f e e d d d d e e 1 f . . 
    . f f 1 e d f d d f d e 1 f . . 
    . c c 1 e d d d f d d e 1 f . . 
    . c c 1 e d d f f d d e 1 f . . 
    . c 1 1 e e e d d e e e 1 1 f . 
    . f 1 1 f f e e e e f f 1 1 f . 
    . f 1 1 f c f f f f c f 1 1 f . 
    . f 8 8 f c c c c c c f 8 d d f 
    . f 1 1 f c c c c c c f 1 d d f 
    . f 8 8 f f f f f f f f 8 8 f . 
    . f 1 1 f c c c c c c f 1 1 f . 
    . f f f f c c f f c c f f f f . 
    . f f f f c f . . f c f f f f . 
    `,img`
    . f f . . f f f f f f . . . . . 
    f d d f f e e e e e e f . . . . 
    f d d f 1 1 1 1 1 1 1 1 f . . . 
    . f f 1 e e d d d d e e 1 f . . 
    . c c 1 e d f d d f d e 1 f . . 
    . c 1 1 e d d d f d d e 1 f . . 
    . c 1 1 e d d f f d d e 1 f . . 
    . c 1 1 e e e d d e e e 1 1 f . 
    . f 1 1 f f e e e e f f 1 1 f . 
    . f 1 1 f c f f f f c f 1 d d f 
    . f 8 8 f c c c c c c f 8 d d f 
    . f 1 1 f c c c c c c f 1 1 f . 
    . f 8 8 f f f f f f f f 8 8 f . 
    . f 1 1 f c c c c c c f 1 1 f . 
    . f f f f c c f f c c f f f f . 
    . f f f f c f . . f c f f f f . 
    `];

    private _pharisee: Sprite = null

        public constructor(k: number, x: number = 50, y: number = 50 ) {
         
        this._pharisee = sprites.create(this.idle[0], k)

        this._pharisee.x = x;
        this._pharisee.y = y;
    }

        public idleAnimation(){
        animation.runImageAnimation(
        this._pharisee,
        this.idle,
        100,
        true
        )
    }

      //% blockId=phariseeSprite block="%Pharisee(pharisee) sprite"
    //% weight=8
    get sprite(): Sprite {
        return this._pharisee;
    }

}
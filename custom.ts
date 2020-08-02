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
    
    //% blockid=createPlayer block='create %c=Characters character of %k=SpriteKind'
    export function create(k: number, x: number, y: number, c: Characters) {
        
    }
}

class Disciple {

    private _player: Sprite = null; // hold our player
    private _character: Characters = null; // which Disciple

    public constructor(k: number, x: number, y: number, c: Characters) {
        this._player = sprites.create(img` `, k)
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
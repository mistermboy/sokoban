
var estadoQuieto = 1;
var estadoCaminando = 2;

var Jugador = cc.Class.extend({
    estado: estadoCaminando,
    animacion:null,
    aCaminar:null,
    gameLayer:null,
    sprite:null,
    shape:null,
    body:null,
ctor:function (gameLayer, posicion) {
    this.gameLayer = gameLayer;

    var framesAnimacion = [];
    for (var i = 1; i <= 4; i++) {
        var str = "jugador_caminar" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        framesAnimacion.push(frame);
    }
    var animacion = new cc.Animation(framesAnimacion, 0.2);
    var actionAnimacionBucle =
        new cc.RepeatForever(new cc.Animate(animacion));
    this.aCaminar = actionAnimacionBucle;
    this.aCaminar.retain();

    // Crear Sprite - Cuerpo y forma
    this.sprite = new cc.PhysicsSprite("#jugador_caminar1.png");
    // Cuerpo dinámico, SI le afectan las fuerzas
    this.body = new cp.Body(1, cp.momentForBox(1,
        this.sprite.getContentSize().width,
        this.sprite.getContentSize().height));

    this.body.setPos(posicion);
    //body.w_limit = 0.02;
    this.body.setAngle(0);
    this.sprite.setBody(this.body);

    // Se añade el cuerpo al espacio
    gameLayer.space.addBody(this.body);


    // forma 16px más pequeña que la imagen original
    this.shape = new cp.BoxShape(this.body,
        this.sprite.getContentSize().width,
        this.sprite.getContentSize().height);
    this.shape.setCollisionType(tipoJugador);


    // forma dinamica
    gameLayer.space.addShape(this.shape);

    this.shape.setFriction(0.1);


    // ejecutar la animación
    this.sprite.runAction(actionAnimacionBucle);
    // añadir sprite a la capa
    gameLayer.addChild(this.sprite,10);


},
    actualizar: function (){

        this.body.rot = new cp.Vect(1,0);


        this.sprite.setRotationX(1);

        switch ( this.estado ){
            case estadoCaminando:
                if (this.animacion != this.aCaminar){
                    this.animacion = this.aCaminar;
                    this.sprite.stopAllActions();
                    this.sprite.runAction(this.animacion);
                }
                break;
        }
        this.sprite.setRotation(0);
        this.sprite.setRotationX(0);
        this.sprite.setRotationY(0);

}



});

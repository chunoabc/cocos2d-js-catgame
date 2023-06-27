const MenuLayer = cc.Layer.extend({
    ctor:function() {
        this._super();

        const size = cc.winSize;
        const bg = new cc.Sprite(res.mene_bg_png);
        const start = new cc.Sprite(res.mene_start_png);
        bg.setPosition(size.width / 2, size.height / 2);
        start.setPosition(size.width / 2, size.height / 2);
        this.addChild(bg);
        this.addChild(start);

        const bgMusic = cc.audioEngine.playEffect(res.menu_bg_mp3, true)
        // const listener = cc.EventListener.create({
        //     event: cc.EventListener.TOUCH_ONE_BY_ONE,
        //     onTouchBegan : function(touch, event) {
        //         if(cc.rectContainsPoint(event.getCurrentTarget().getBoundingBox(),touch.getLocation())){
        //         }
        //     },
        // });
        // cc.eventManager.addListener(listener, start)
        cc.eventManager.addListener({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan : (touch, event) => {
                start.runAction(new cc.ScaleTo(0.05, 0.9))
                // if(cc.rectContainsPoint(event.getCurrentTarget().getBoundingBox(),touch.getLocation())){
                // }
                return true
            },
            onTouchEnded : (touch, event) => {
                start.stopAllActions()
                start.runAction(new cc.ScaleTo(0.05, 1))
                cc.audioEngine.stopEffect(bgMusic)
                cc.director.runScene(new GameScene());

                return true
            }
        }, start)

        const cat = new cc.Sprite(res.cat_default_png);
        this.addChild(cat);
        cat.setPosition(size.width / 2, size.height / 2 - 350);
        cat.setScale(0.5);

        cat.setAnchorPoint(cc.p(0.5,0));

        // logo.runAction(new cc.MoveTo(2, cc.p(size.width - 100, size.height/2)))
        // logo.runAction(new cc.MoveBy(2, cc.p(500, 0)))
        // var move1 = new cc.MoveTo(2, cc.p(size.width - 100, size.height/2));
        // var move2 = new cc.MoveBy(2, cc.p(-500, 0));
        // cat.runAction(new cc.Sequence(move1, move2));
        // cat.runAction(new cc.Spawn(move1, move2));
        // var move1 = new cc.MoveBy(2, cc.p(500,0));
        // var move2 = move1.reverse();
        // cat.runAction(new cc.Sequence(move1, move2, new cc.CallFunc(function(){
        //     cc.log("complate")
        // })));

        this.schedule(function(f) {
            const scale = cat.getScaleY();
            if(scale === 0.5) {
                cat.setScaleY(0.49);
            } else {
                cat.setScaleY(0.5);
            }
        }, 0.6);

        

        return true;
    }
})

const MenuScene = cc.Scene.extend({
    onEnter:function() {
        this._super()
        const layer = new MenuLayer();

        this.addChild(layer);
    }
})
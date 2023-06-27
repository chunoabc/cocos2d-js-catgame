const GameLayer = cc.Layer.extend({
    bg: null,
    winSize: null,
    catGroup: [],
    score: null,
    scoreNum : 0,
    time: null,
    timeNum : 0,
    subTime : -1,
    hands : [],
    keyboardListener : null,
    startListener : null,
    bgMusic : null,
    ctor: function() {
        this._super();

        this.bgMusic = cc.audioEngine.playEffect(res.game_bg_mp3, true)
        this.initScene()
        this.initCat()
        this.initInfo()
        this.initHand()

        this.addChild(new startScene())
        this.startListener = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: 'game_start',
            callback: (event) => {
                this.setListener()
                this.schedule(this.updateTime, 1);
            }
        })
        cc.eventManager.addListener(this.startListener, 1);


        return true;
    },
    onEnter: function() {
        this._super()
        // this.init()
    },
    init: function() {
        // console.log('初始化')
        // this.hideAllCat()
        // this.showCat(0)
    },
    initScene: function() {
        this.winSize = cc.winSize;
        this.bg = new cc.Sprite(res.game_bg_png);
        this.bg.setPosition(this.winSize.width / 2, this.winSize.height / 2);
        this.addChild(this.bg);
    },
    initCat: function() {
        const cat = new cc.Sprite(res.cat_default_png);
        cat.setPosition(this.winSize.width / 2, this.winSize.height / 2 -100);
        cat.setScale(0.6);
        this.addChild(cat);

        cat.setAnchorPoint(cc.p(0.5,0));
        this.schedule(function(f) {
            const scale = cat.getScaleY();
            if(scale === 0.6) {
                cat.setScaleY(0.58);
            } else {
                cat.setScaleY(0.6);
            }
        }, 0.6);
        
        const cat_up = new cc.Sprite(res.cat_up_png);
        cat_up.setPosition(this.winSize.width / 2, this.winSize.height / 2 + 100);
        cat_up.setScale(0.6);
        this.addChild(cat_up);

        const cat_right = new cc.Sprite(res.cat_right_png);
        cat_right.setPosition(this.winSize.width / 2 + 100, this.winSize.height / 2);
        cat_right.setScale(0.6);
        this.addChild(cat_right);

        const cat_down = new cc.Sprite(res.cat_down_png);
        cat_down.setPosition(this.winSize.width / 2, this.winSize.height / 2 - 100);
        cat_down.setScale(0.6);
        this.addChild(cat_down);

        const cat_left = new cc.Sprite(res.cat_left_png);
        cat_left.setPosition(this.winSize.width / 2 - 100, this.winSize.height / 2);
        cat_left.setScale(0.6);
        this.addChild(cat_left);

        this.catGroup = []
        this.catGroup.push(cat, cat_up, cat_right, cat_down, cat_left)
        this.hideAllCat()
        this.showCat(0)
    },
    hideAllCat: function() {
        for(let i = 0; i < this.catGroup.length; i ++) {
            this.catGroup[i].visible = false
        }
    },
    showCat: function(num) {
        this.catGroup[num].visible = true
    },
    initInfo: function() {
        this.scoreNum = 0;
        this.score = new cc.LabelTTF(`Score : ${this.scoreNum}`, "Arial", 40);
        this.score.setAnchorPoint(cc.p(0,0));
        this.score.setColor(cc.color(0,0,0,1));
        this.addChild(this.score)

        this.timeNum = 30;
        this.time = new cc.LabelTTF(`Time : ${this.timeNum}s`, "Arial", 40);
        this.time.y = this.winSize.height - 50;
        this.time.setAnchorPoint(cc.p(0,0));
        this.time.setColor(cc.color(0,0,0,1));
        this.addChild(this.time)

        this.subTime = new cc.LabelTTF(`-1s`, "Arial", 40);
        this.subTime.y = this.winSize.height - 50;
        this.subTime.x = 190;
        this.subTime.setAnchorPoint(cc.p(0,0));
        this.subTime.setColor(cc.color(255,0,0,1));
        this.subTime.visible = false
        this.addChild(this.subTime)

    },
    setListener: function() {
        let isKeyPressed = false; 

        this.keyboardListener = cc.EventListener.create({
            event: cc.EventListener.KEYBOARD,

            onKeyPressed: (keyCode, event) => {
                if (!isKeyPressed) {
                    isKeyPressed = true;
                    switch(keyCode) {
                        case 37:
                            this.shakeScene()
                            this.hideAllCat()
                            this.showCat(4)
                            if(this.hands[0].id === 4) {
                                this.reFreshHands()
                                this.reFreshScore()
                                // const hand = Hand.reCreate()
                                // hand.id = Math.floor(Math.random() * 4) + 1
                            } else {
                                this.errorHand();
                            }
                            break
                        case 38:
                            this.shakeScene()
                            this.hideAllCat()
                            this.showCat(1)
                            if(this.hands[0].id === 1) {
                                this.reFreshHands()
                                this.reFreshScore()
                            } else {
                                this.errorHand();
                            }
                            break
                        case 39:
                            this.shakeScene()
                            this.hideAllCat()
                            this.showCat(2)
                            if(this.hands[0].id === 2) {
                                this.reFreshHands();
                                this.reFreshScore();
                            } else {
                                this.errorHand();
                            }
                            break;
                        case 40:
                            this.shakeScene()
                            this.hideAllCat();
                            this.showCat(3);
                            if(this.hands[0].id === 3) {
                                this.reFreshHands();
                                this.reFreshScore();
                            } else {
                                this.errorHand();
                            }
                            break;
                    }
                }
            },
            // 放開按鍵時觸發
            onKeyReleased: (keyCode, event) => {
                isKeyPressed = false;
                this.hideAllCat()
                this.showCat(0)
            }

        });

        // 註冊鍵盤事件監聽器
        cc.eventManager.addListener(this.keyboardListener, this);
    },
    shakeScene: function() {
        const move1 = new cc.ScaleTo(0.1, 1.02);
        const move2 = new cc.ScaleTo(0.1, 1);
        this.bg.runAction(new cc.Sequence(move1, move2))

        const effectId = cc.audioEngine.playEffect(res.attack_effect_mp3, false)
    },
    initHand: function() {
        this.hands = []
        for(let i = 1; i < 10; i++) {
            this.createHande(i)
        }
    },
    createHande: function(num) {
        const hand = Hand.reCreate()
        hand.id = Math.floor(Math.random() * 4) + 1
        switch(hand.id) {
            case 1:
                hand.x = this.winSize.width / 2;
                hand.y = this.winSize.height / 2 + 150 * num + 30;
                break;
            case 2:
                hand.x = this.winSize.width / 2  + 150 * num;
                hand.y = this.winSize.height / 2;
                break;
            case 3:
                hand.x = this.winSize.width / 2;
                hand.y = this.winSize.height / 2  - 150 * num - 30;
                break;
            case 4:
                hand.x = this.winSize.width / 2  - 150 * num;
                hand.y = this.winSize.height / 2;
                break;
        }
        
        this.hands.push(hand)
        this.addChild(hand)
    },
    reFreshHands: function() {
        this.hands[0].del()
        this.hands.shift()
        this.createHande(9)

        for(let i = 0; i < this.hands.length; i++) {
            const hand = this.hands[i]
            let targetX = 0;
            let targetY = 0;
            switch(hand.id) {
            case 1:
                targetX = this.winSize.width / 2;
                targetY = this.winSize.height / 2 + 150 * (i + 1) + 30;
                break;
            case 2:
                targetX = this.winSize.width / 2  + 150 * (i + 1);
                targetY = this.winSize.height / 2;
                break;
            case 3:
                targetX = this.winSize.width / 2;
                targetY = this.winSize.height / 2  - 150 * (i + 1) - 30;
                break;
            case 4:
                targetX = this.winSize.width / 2  - 150 * (i + 1);
                targetY = this.winSize.height / 2;
                break;
            }

            hand.runAction(new cc.MoveTo(0.1, cc.p(targetX, targetY)))
        }
    },
    reFreshScore: function() {
        this.scoreNum += 1;
        this.score.string = `Score : ${this.scoreNum}`
    },
    errorHand: function() {
        const move1 = new cc.ScaleTo(0.1, 1.15);
        const move2 = new cc.ScaleTo(0.1, 1);
        this.hands[0].runAction(new cc.Sequence(move1, move2))
        this.updateTime()

        this.subTime.visible = true
        this.schedule(function(f){
            this.subTime.visible = false
        }, 1, 1)
    },
    updateTime : function() {
        this.timeNum -= 1;
        this.time.string = `Time : ${this.timeNum}s`
        if(this.timeNum <= 0) {
            //結算
            this.endGame()
        }
    },
    endGame : function() {
        this.unschedule(this.updateTime);
        cc.eventManager.removeListener(this.keyboardListener, this);
        cc.eventManager.removeListener(this.startListener, this);
        cc.audioEngine.stopEffect(this.bgMusic)
        cc.audioEngine.playEffect(res.whistle_mp3, false)
        this.addChild(new endScene(this.scoreNum))
    }
})

const GameScene = cc.Scene.extend({
    onEnter:function() {
        this._super()
        const layer = new GameLayer();

        this.addChild(layer);
    }
})

const Hand = cc.Sprite.extend({
    ctor: function() {
        this._super(res.hand_png);
        this.handId = Hand.handId;
    },
    del: function() {
        this.removeFromParent()
        cc.pool.putInPool(this)
    }
})
Hand.reCreate = function() {
    if(cc.pool.hasObject(Hand)) {
        return cc.pool.getFromPool(Hand);
    } else {
        return new Hand();
    }
}

const startScene = cc.Layer.extend({
    ctor: function() {
        this._super();

        const bg = new cc.Sprite(res.bg_black_png);
        const size = cc.winSize;
        bg.setPosition(size.width / 2, size.height / 2);
        bg.setScale(1280, 720)
        bg.setOpacity(120);
        this.addChild(bg);

        let startTimeNum = 3;
        const startTime = new cc.LabelTTF(`${startTimeNum}`, "Arial", 120);
        
        startTime.setPosition(size.width / 2, size.height / 2);
        // startTime.setFontFillColor(cc.color(255,255,255,1));
        startTime.setColor(cc.color(255,255,255))
        startTime.enableStroke(cc.color(255,0,0), 3);
        this.addChild(startTime)

        this.schedule((f) => {
            if(startTimeNum <= 1) {
                cc.eventManager.dispatchCustomEvent('game_start')
                this.removeFromParent()
            } else {
                startTimeNum -= 1
                startTime.string = `${startTimeNum}`
            }
        },1);
        return true
    }
})

const endScene = cc.Layer.extend({
    ctor: function(num) {
        this._super();

        const bg = new cc.Sprite(res.bg_black_png);
        const size = cc.winSize;
        bg.setPosition(size.width / 2, size.height / 2 - 200);
        bg.setScale(1280, 720)
        bg.setOpacity(0);
        this.addChild(bg);

        const score = new cc.LabelTTF(`Score: ${num}`, "Arial", 120);
        score.setPosition(size.width / 2, size.height / 2 - 100);
        score.setColor(cc.color(255,255,255))
        score.enableStroke(cc.color(0,0,0), 5);
        score.setOpacity(0)
        this.addChild(score)

        const bg_action1 = cc.fadeTo(1, 170)
        const bg_action2 = cc.moveBy(1, cc.p(0, 200)) 
        bg.runAction(new cc.Spawn(bg_action1, bg_action2))

        const score_action1 = cc.fadeTo(1, 255)
        const score_action2 = cc.moveBy(1, cc.p(0, 100)) 
        score.runAction(new cc.Spawn(score_action1, score_action2))
        // score.runAction(action1)

        let time = 4
        const func = () => {
            time -= 1
            if(time <= 0) {
                this.unschedule(func)
                const txt = new cc.LabelTTF(`按下任意按鍵返回主選單`, "Arial", 60);
                txt.setPosition(size.width / 2, size.height / 2 - 300);
                txt.setColor(cc.color(255,255,255))
                txt.enableStroke(cc.color(0,0,0), 5);
                this.addChild(txt)

                const keyboardListener = cc.EventListener.create({
                    event: cc.EventListener.KEYBOARD,
                    onKeyPressed: (keyCode, event) => {
                        cc.director.runScene(new MenuScene());
                    },
                });
        
                // 註冊鍵盤事件監聽器
                cc.eventManager.addListener(keyboardListener, this);
            }
        }
        this.schedule(func, 1);

        return true
    }
})
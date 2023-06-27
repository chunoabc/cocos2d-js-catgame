/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
 
 http://www.cocos2d-x.org
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/


var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    test:function () {
        cc.log('test');
        cc.log(cc.director);
    },
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        this.test();
        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        let size = cc.winSize;
        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        // var helloLabel = new cc.LabelTTF("測試123", "Arial", 20);
        // position the label on the center of the screen
        // helloLabel.x = size.width / 2;
        // helloLabel.y = size.height / 2;
        // add the label as a child to this layer
        // this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        // this.sprite = new cc.Sprite(res.HelloWorld_png);
        // this.sprite.attr({
        //     x: size.width / 2,
        //     y: size.height / 2
        // });
        // this.addChild(this.sprite, 0);

        // var logo = new cc.Sprite(res.bg1_png);
        // let logoSize = logo.getContentSize(); 
        // cc.log(`logo size:${logoSize.width} ${logoSize.height}`);
        // var img = cc.director.getTextureCache().addImage(res.bg1_png);
        // var logo = new cc.Sprite(img);
        
        // logo.x = size.width / 2;
        // logo.y = size.height / 2;
        // this.addChild(logo);

        var layer1 = new cc.Layer();
        var layer2 = new cc.Layer();
        var layer3 = new cc.Layer();

        img1 = new cc.Sprite(res.bg1_png);
        img2 = new cc.Sprite(res.bg2_png);
        img3 = new cc.Sprite(res.bg3_png);
        img1.setAnchorPoint(cc.p(0,0));
        img2.setAnchorPoint(cc.p(0,0));
        img3.setAnchorPoint(cc.p(0,0));

        layer1.addChild(img1);
        layer2.addChild(img2);
        layer3.addChild(img3);

        this.addChild(layer1);
        this.addChild(layer2);
        this.addChild(layer3);

        layer1.setPosition(0, 0);
        layer2.setPosition(100, 100);
        layer3.setPosition(200, 200);

        // this.schedule(function(f) {
        //     var scene2 = new cc.Scene();
        //     var scene2Layer = new cc.Layer();
        //     scene2.addChild(scene2Layer);

        //     var logo = new cc.Sprite(res.HelloWorld_png)
        //     scene2Layer.addChild(logo)

        //     var tra = new cc.TransitionCrossFade(1 , scene2);
        //     cc.director.runScene(scene2);

        // }, 3 ,true)
        // this.scheduleOnce

        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});


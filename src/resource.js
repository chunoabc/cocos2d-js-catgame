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

var res = {
    // HelloWorld_png : "res/HelloWorld.png",
    bg_black_png : "res/bg_black.png",
    bg_white_png : "res/bg_white2.png",
    mene_bg_png : "res/bg_white.png",
    mene_start_png : "res/start.png",
    game_bg_png : "res/bg_cat.png",
    cat_default_png : "res/cat_default.png",
    cat_up_png : "res/cat_up.png",
    cat_right_png : "res/cat_right.png",
    cat_down_png : "res/cat_down.png",
    cat_left_png : "res/cat_left.png",
    hand_png : "res/hand.png",
    attack_effect_mp3 : "res/middle_punch1.mp3",
    menu_bg_mp3 : "res/Country Cue 1 - Audionautix.mp3",
    game_bg_mp3 : "res/Girasol - Quincas Moreira.mp3",
    whistle_mp3 : "res/whistle.mp3",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

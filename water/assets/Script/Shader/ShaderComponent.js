const ShaderMaterial = require('ShaderMaterial');
cc.Class({
    extends: cc.Component,
    properties: {
        target: {
            default: null,
            type: cc.Sprite
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.dynamicAtlasManager.enabled = false;
        this._material = new ShaderMaterial();
        this._material.setColor(1, 1, 1, 1);
        this._material.setNum(0);
        this._material.setPos(0, 0, 0);
    },

    start() {
        this._start = Date.now();
        if (this.target) {
            let texture = this.target.spriteFrame.getTexture();
            this._material.setTexture(texture);
            this._material.setSize(this.target.node.width, this.target.node.height);
            this._material.updateHash();
            this.target._material = this._material;
            this.target._renderData._material = this._material;
        }
    },

    update(dt) {
        let now = Date.now();
        let time = (now - this._start) / 1000;
        this._material.setTime(time);
    },
    updateShader(texture) {
        if (this.target) {
            let texture = this.target.spriteFrame.getTexture();
            this._material.setTexture(texture);
            this._material.setSize(this.target.node.width, this.target.node.height);
            this._material.updateHash();
            this.target._material = this._material;
            this.target._renderData._material = this._material;
        }
    }
});
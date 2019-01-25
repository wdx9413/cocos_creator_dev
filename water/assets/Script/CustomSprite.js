cc.Class({
    // 所有渲染组件需要继承自 cc.RenderComponent
    extends: cc.Sprite,
    ctor() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 640;
        this.canvas.height = 960;

        this.img = new Image();
        this.ctt = new cc.Texture2D();
    },
    properties: {
        
        metaballWidth: {
            default: 200,
            type: cc.Integer
        },
        metaballHeight: {
            default: 200,
            type: cc.Integer
        },
        waters: {
            default: null,
            type: cc.Node
        },
        _metaball: {
            default: null,
            type: cc.Texture2D
        }
    },
    onLoad() {
        cc.director.getPhysicsManager().enabled = true;

        this._metaball = this.spriteFrame.getTexture();
        this.img.src = this._metaball.url;
    },
    /**
     * 绘制canvas => 设置texture
     */
    changeSpriteFrame() {

        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let index = 0; index < this.waters.children.length; index++) {
            const node = this.waters.children[index];
            ctx.drawImage(
                this.img,
                node.x - this.metaballWidth / 2,
                -node.y - this.metaballHeight / 2,
                this.metaballWidth,
                this.metaballHeight
            );
        }

        this.ctt.initWithElement(this.canvas);
        this.spriteFrame.setTexture(this.ctt);
    },
    /**
     * 实时绘制水珠Metaball，并增加shader
     */
    update() {
        this.changeSpriteFrame();
        this.node.getComponent("ShaderComponent").updateShader();
    }
});
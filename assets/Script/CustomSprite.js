cc.Class({
    // 所有渲染组件需要继承自 cc.RenderComponent
    extends: cc.Sprite,
    ctor() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 640;
        this.canvas.height = 960;

        this.img = new Image();
        this.ctt = new cc.Texture2D();
        // this.waters = [];
    },
    properties: {
        metaball: {
            default: null,
            type: cc.Texture2D
        },
        waters: {
            default: null,
            type: cc.Node
        }
    },
    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
    },
    start() {
        this.img.src = this.metaball.url;
    },
    changeSpriteFrame() {
        let ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let index = 0; index < this.waters.children.length; index++) {
            const node = this.waters.children[index];
            ctx.drawImage(this.img, node.x-100, -node.y-100, 200, 200);
        }
        this.ctt.initWithElement(this.canvas);
        this.spriteFrame.setTexture(this.ctt);
    },
    update() {
        this.changeSpriteFrame();
        this.node.getComponent("ShaderComponent").updateShader();
        
    }
});
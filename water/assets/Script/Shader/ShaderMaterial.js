const math = cc.vmath;
const renderEngine = cc.renderer.renderEngine;
const renderer = renderEngine.renderer;
const gfx = renderEngine.gfx;
const Material = renderEngine.Material;

// Require to load the shader to program lib
require('Shader');

function ShaderMaterial() {
    Material.call(this, false);

    var pass = new renderer.Pass('threshold');
    pass.setDepth(false, false);
    pass.setCullMode(gfx.CULL_NONE);
    pass.setBlend(
        gfx.BLEND_FUNC_ADD,
        gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA,
        gfx.BLEND_FUNC_ADD,
        gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA
    );

    let mainTech = new renderer.Technique(
        ['transparent'],
        [{
                name: 'texture',
                type: renderer.PARAM_TEXTURE_2D
            },
            {
                name: 'size',
                type: renderer.PARAM_FLOAT2
            },
            // {
            //     name: 'iResolution',
            //     type: renderer.PARAM_FLOAT3
            // },
            {
                name: 'time',
                type: renderer.PARAM_FLOAT
            },
            {
                name: 'num',
                type: renderer.PARAM_FLOAT
            },
            {
                name: "color",
                type: renderer.PARAM_COLOR4
            },
            {
                name: "pos",
                type: renderer.PARAM_FLOAT3
            }
        ],
        [
            pass
        ]
    );

    this._texture = null;
    // this._size = math.vec3.create();
    this._size = {x:0,y:0};
    this._time = 0.0;
    this._num = 0.03;
    this._color = {
            r: 1,
            g: 1,
            b: 1,
            a: 1
        },
        this._pos = {
            x: 0,
            y: 0,
            z: 0
        }

    // need _effect to calculate hash
    this._effect = this.effect = new renderer.Effect(
        [
            mainTech,
        ], {
            // 'iResolution': this._size,
            'color': this._color,
            'size': this._size,
            "time": this._time,
            "num": this._num,
            "pos": this._pos
        },
        [
            // {
            //     name: 'HAS_HEART',
            //     value: true
            // },
            // {
            //     name: 'USE_POST_PROCESSING',
            //     value: true
            // }
        ]
    );

    this._mainTech = mainTech;
}
cc.js.extend(ShaderMaterial, Material);
cc.js.mixin(ShaderMaterial.prototype, {
    getTexture() {
        return this._texture;
    },

    setTexture(val) {
        if (this._texture !== val) {
            this._texture = val;
            this._texture.update({
                // Adapt to shader
                flipY: false,
                // For load texture
                mipmap: false
            });
            this.effect.setProperty('texture', val.getImpl());
            this._texIds['texture'] = val.getId();

            this._size.x = this._texture.width;
            this._size.y = this._texture.height;
        }
    },
    setColor(r, g, b, a) {
        this._color.r = r;
        this._color.g = g;
        this._color.b = b;
        this._color.a = a;
        this._effect.setProperty("color", this._color);
    },

    setSize(w, h) {
        this._size.x = w;
        this._size.y = h;
        this._effect.setProperty("size", this._size);
    },

    setTime(time) {
        this._time = time;
        this.effect.setProperty('time', this._time);
    },

    setNum(num) {
        this._num = num;
        this.effect.setProperty('num', this._num);
    },
    setPos(x, y, z) {
        this._pos.x = x;
        this._pos.y = y;
        this._pos.z = z;
        this.effect.setProperty('pos', this._pos);
    },
    // setHasHeart(value) {
    //     this.effect.define('HAS_HEART', !!value);
    // },

    // usePostProcessing(value) {
    //     this.effect.define('USE_POST_PROCESSING', !!value);
    // }
});

module.exports = ShaderMaterial;
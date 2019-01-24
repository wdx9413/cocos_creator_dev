let shader = {
    name: 'threshold',

    defines: [
        // { name: 'HAS_HEART', },
        // { name: 'USE_POST_PROCESSING', },
    ],   
    vert: 
`
\nuniform mat4 viewProj;\nattribute vec3 a_position;\nattribute vec2 a_uv0;\nvarying vec2 uv0;\nvoid main () {\n    vec4 pos = viewProj * vec4(a_position, 1);\n    gl_Position = pos;\n    uv0 = a_uv0;\n}
`
,
    frag:
`
uniform sampler2D texture;
uniform float num;
uniform vec4 color;
varying vec2 uv0;	

void main(void)
{							
    vec4 col = texture2D( texture, uv0 ) ;
    // col.rgb /= col.a;
    // float range = ( color.a - (1.0 - threshold) - (smoothness * 0.05) ) / (0.0001 + smoothness * 0.1) ;
    float range = ( col.a - 0.8 ) / 0.1001;
	col.a = smoothstep( 0.0, 1.0, range ) ;
	col.rgb *= col.a ;
	
	gl_FragColor = vec4(col);
}
`,
    
};

cc.game.once(cc.game.EVENT_ENGINE_INITED, function () {
    cc.renderer._forward._programLib.define(shader.name, shader.vert, shader.frag, shader.defines);
});

module.exports = shader;
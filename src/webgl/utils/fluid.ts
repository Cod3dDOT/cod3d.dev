// https://github.com/alienkitty/alien.js/blob/main/src/three/utils/Fluid.ts

import {
	HalfFloatType,
	LinearFilter,
	LinearMipmapLinearFilter,
	LinearMipMapLinearFilter,
	LinearMipMapNearestFilter,
	MagnificationTextureFilter,
	MinificationTextureFilter,
	NearestFilter,
	NearestMipmapLinearFilter,
	NearestMipMapLinearFilter,
	NearestMipmapNearestFilter,
	NearestMipMapNearestFilter,
	PixelFormatGPU,
	RGBAFormat,
	ShaderMaterial,
	TextureDataType,
	Vector2,
	Vector3,
	WebGLRenderer,
	WebGLRenderTarget,
	Wrapping,
} from "three";

import Program from "./program";

// const fragment = /* glsl */ `
//   precision highp float;
//   uniform sampler2D tMap;
//   uniform sampler2D tFluid;
//   uniform float uTime;
//   varying vec2 vUv;
//   void main() {
//       vec3 fluid = texture2D(tFluid, vUv).rgb;
//       vec2 uv = vUv - fluid.rg * 0.0002;
//       gl_FragColor = mix( texture2D(tMap, uv), vec4(fluid * 0.1 + 0.5, 1), step(0.5, vUv.x) ) ;
//   }
//   `;

const baseVertex = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;
  void main () {
      vUv = uv;
      vL = vUv - vec2(texelSize.x, 0.0);
      vR = vUv + vec2(texelSize.x, 0.0);
      vT = vUv + vec2(0.0, texelSize.y);
      vB = vUv - vec2(0.0, texelSize.y);
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
  `;

const clearShader = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  uniform sampler2D uTexture;
  uniform float value;
  void main () {
      gl_FragColor = value * texture2D(uTexture, vUv);
  }
  `;

const splatShader = /* glsl */ `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;
  void main () {
      vec2 p = vUv - point.xy;
      p.x *= aspectRatio;
      vec3 splat = exp(-dot(p, p) / radius) * color;
      vec3 base = texture2D(uTarget, vUv).xyz;
      gl_FragColor = vec4(base + splat, 1.0);
  }
  `;

const advectionManualFilteringShader = /* glsl */ `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform vec2 dyeTexelSize;
  uniform float dt;
  uniform float dissipation;
  vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
      vec2 st = uv / tsize - 0.5;
      vec2 iuv = floor(st);
      vec2 fuv = fract(st);
      vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
      vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
      vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
      vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
      return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
  }
  void main () {
      vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
      gl_FragColor = dissipation * bilerp(uSource, coord, dyeTexelSize);
      gl_FragColor.a = 1.0;
  }
  `;

const advectionShader = /* glsl */ `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform float dt;
  uniform float dissipation;
  void main () {
      vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
      gl_FragColor = dissipation * texture2D(uSource, coord);
      gl_FragColor.a = 1.0;
  }
  `;

const divergenceShader = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
      float L = texture2D(uVelocity, vL).x;
      float R = texture2D(uVelocity, vR).x;
      float T = texture2D(uVelocity, vT).y;
      float B = texture2D(uVelocity, vB).y;
      vec2 C = texture2D(uVelocity, vUv).xy;
      if (vL.x < 0.0) { L = -C.x; }
      if (vR.x > 1.0) { R = -C.x; }
      if (vT.y > 1.0) { T = -C.y; }
      if (vB.y < 0.0) { B = -C.y; }
      float div = 0.5 * (R - L + T - B);
      gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
  `;

const curlShader = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
      float L = texture2D(uVelocity, vL).y;
      float R = texture2D(uVelocity, vR).y;
      float T = texture2D(uVelocity, vT).x;
      float B = texture2D(uVelocity, vB).x;
      float vorticity = R - L - T + B;
      gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
  `;

const vorticityShader = /* glsl */ `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;
  void main () {
      float L = texture2D(uCurl, vL).x;
      float R = texture2D(uCurl, vR).x;
      float T = texture2D(uCurl, vT).x;
      float B = texture2D(uCurl, vB).x;
      float C = texture2D(uCurl, vUv).x;
      vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
      force /= length(force) + 0.0001;
      force *= curl * C;
      force.y *= -1.0;
      vec2 vel = texture2D(uVelocity, vUv).xy;
      gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
  }
  `;

const pressureShader = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      float C = texture2D(uPressure, vUv).x;
      float divergence = texture2D(uDivergence, vUv).x;
      float pressure = (L + R + B + T - divergence) * 0.25;
      gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
  `;

const gradientSubtractShader = /* glsl */ `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  void main () {
      float L = texture2D(uPressure, vL).x;
      float R = texture2D(uPressure, vR).x;
      float T = texture2D(uPressure, vT).x;
      float B = texture2D(uPressure, vB).x;
      vec2 velocity = texture2D(uVelocity, vUv).xy;
      velocity.xy -= vec2(R - L, T - B);
      gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
  `;

interface DoubleFBOOptions {
	wrapS?: Wrapping;
	wrapT?: Wrapping;
	minFilter?: MinificationTextureFilter;
	magFilter?: MagnificationTextureFilter;
	format?: number;
	internalFormat?: PixelFormatGPU;
	type?: TextureDataType;
	depthBuffer?: boolean;
	stencilBuffer?: boolean;
}

interface DoubleFBO {
	read: WebGLRenderTarget;
	write: WebGLRenderTarget;
	swap: (callback?: (texture: any) => void) => void;
}

interface SplatData {
	x: number;
	y: number;
	dx: number;
	dy: number;
}

interface FluidOptions {
	size?: number;
}

function minToMagFilter(
	minFilter: MinificationTextureFilter
): MagnificationTextureFilter {
	switch (minFilter) {
		case NearestFilter:
		case NearestMipMapNearestFilter:
		case NearestMipmapNearestFilter:
		case NearestMipMapLinearFilter:
		case NearestMipmapLinearFilter:
			return NearestFilter;
		case LinearFilter:
		case LinearMipMapNearestFilter:
		case NearestMipmapNearestFilter:
		case LinearMipMapLinearFilter:
		case LinearMipmapLinearFilter:
			return LinearFilter;
	}
}

function createDoubleFBO(
	width: number,
	height: number,
	{
		wrapS,
		wrapT,
		minFilter = LinearFilter,
		magFilter = minToMagFilter(minFilter),
		format = RGBAFormat,
		internalFormat,
		type,
		depthBuffer,
		stencilBuffer,
	}: DoubleFBOOptions = {}
): DoubleFBO {
	const fbo = {
		read: new WebGLRenderTarget(width, height, {
			wrapS,
			wrapT,
			minFilter,
			magFilter,
			format,
			type,
			depthBuffer,
			stencilBuffer,
		}),
		write: new WebGLRenderTarget(width, height, {
			wrapS,
			wrapT,
			minFilter,
			magFilter,
			format,
			type,
			depthBuffer,
			stencilBuffer,
		}),
		swap: (callback?: (texture: any) => void) => {
			const temp = fbo.read;
			fbo.read = fbo.write;
			fbo.write = temp;
			callback?.(fbo.write.texture);
		},
	};

	if (internalFormat) {
		fbo.read.texture.internalFormat = fbo.write.texture.internalFormat =
			internalFormat;
	}

	return fbo;
}

function getTHREEFormat(format: number): PixelFormatGPU {
	switch (format) {
		case 34842:
			return "RGBA16F";
		case 33327:
			return "RG16F";
		case 33325:
			return "R16F";
		case 6408:
			return "RGBA";
		case 6403:
			return "RED_INTEGER";
		default:
			return "RGBA";
	}
}

function supportRenderTextureFormat(
	gl: WebGLRenderingContext,
	internalFormat: number,
	format: number,
	type: number
): boolean {
	const texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texImage2D(
		gl.TEXTURE_2D,
		0,
		internalFormat,
		gl.RGBA,
		gl.RGBA,
		0,
		format,
		type,
		null
	);

	const fbo = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
	gl.framebufferTexture2D(
		gl.FRAMEBUFFER,
		gl.COLOR_ATTACHMENT0,
		gl.TEXTURE_2D,
		texture,
		0
	);

	const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
	return status === gl.FRAMEBUFFER_COMPLETE;
}

interface SupportedFormat {
	internalFormat: PixelFormatGPU;
	format: string | number;
}

// Helper functions for more device support
function getSupportedFormat(
	gl: WebGLRenderingContext,
	internalFormat: number,
	format: number,
	type: number
): SupportedFormat | null {
	if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
		switch (internalFormat) {
			case (gl as any).R16F:
				return getSupportedFormat(
					gl,
					(gl as any).RG16F,
					(gl as any).RG,
					type
				);
			case (gl as any).RG16F:
				return getSupportedFormat(
					gl,
					(gl as any).RGBA16F,
					gl.RGBA,
					type
				);
			default:
				return null;
		}
	}

	return {
		internalFormat: getTHREEFormat(internalFormat),
		format: getTHREEFormat(format),
	};
}

interface ProgramMaterial extends ShaderMaterial {
	uniforms: {
		[key: string]: { value: any };
	};
}

export class Fluid {
	renderer: WebGLRenderer;
	simRes: number;
	dyeRes: number;
	iterations: number;
	densityDissipation: number;
	velocityDissipation: number;
	pressureDissipation: number;
	curlStrength: number;
	radius: number;
	texelSize: { value: Vector2 };
	uniform: { value: any };
	density: DoubleFBO;
	velocity: DoubleFBO;
	pressure: DoubleFBO;
	divergence: WebGLRenderTarget;
	curl: WebGLRenderTarget;
	clearProgram: Program;
	splatProgram: Program;
	advectionProgram: Program;
	divergenceProgram: Program;
	curlProgram: Program;
	vorticityProgram: Program;
	pressureProgram: Program;
	gradienSubtractProgram: Program;
	splats: SplatData[];
	lastMouse: Vector2 & { isInit?: boolean };

	constructor(renderer: WebGLRenderer, { size = 128 }: FluidOptions = {}) {
		this.renderer = renderer;
		// Resolution of simulation
		this.simRes = size;
		this.dyeRes = size;

		// Main inputs to control look and feel of fluid
		this.iterations = 3;
		this.densityDissipation = 0.97;
		this.velocityDissipation = 0.98;
		this.pressureDissipation = 0.8;
		this.curlStrength = 20;
		this.radius = 0.2;

		// Common uniform
		this.texelSize = {
			value: new Vector2(1 / this.simRes, 1 / this.simRes),
		};

		const gl = this.renderer.getContext();

		gl.getExtension("EXT_color_buffer_float");
		const supportLinearFiltering = gl.getExtension(
			"OES_texture_float_linear"
		);

		const rgba = getSupportedFormat(
			gl,
			(gl as any).RGBA16F,
			gl.RGBA,
			HalfFloatType
		);
		const rg = getSupportedFormat(
			gl,
			(gl as any).RG16F,
			(gl as any).RG,
			HalfFloatType
		);
		const r = getSupportedFormat(
			gl,
			(gl as any).R16F,
			gl.RED_BITS,
			HalfFloatType
		);

		const filtering = supportLinearFiltering ? LinearFilter : NearestFilter;

		this.uniform = {
			value: null,
		};

		if (!rgba || !rg || !r) {
			throw new Error("Required formats not supported");
		}

		// Create fluid simulation FBOs
		this.density = createDoubleFBO(this.dyeRes, this.dyeRes, {
			type: HalfFloatType,
			minFilter: filtering,
			format: rgba.format as number,
			internalFormat: rgba.internalFormat,
			depthBuffer: false,
			stencilBuffer: false,
		});

		this.velocity = createDoubleFBO(this.simRes, this.simRes, {
			type: HalfFloatType,
			minFilter: filtering,
			format: rg.format as number,
			internalFormat: rg.internalFormat,
			depthBuffer: false,
			stencilBuffer: false,
		});

		this.pressure = createDoubleFBO(this.simRes, this.simRes, {
			type: HalfFloatType,
			minFilter: NearestFilter,
			format: r.format as number,
			internalFormat: r.internalFormat,
			depthBuffer: false,
			stencilBuffer: false,
		});

		this.divergence = new WebGLRenderTarget(this.simRes, this.simRes, {
			type: HalfFloatType,
			minFilter: NearestFilter,
			format: r.format as number,
			depthBuffer: false,
			stencilBuffer: false,
		});
		this.divergence.texture.internalFormat = r.internalFormat;

		this.curl = new WebGLRenderTarget(this.simRes, this.simRes, {
			type: HalfFloatType,
			minFilter: NearestFilter,
			format: r.format as number,
			depthBuffer: false,
			stencilBuffer: false,
		});
		this.curl.texture.internalFormat = r.internalFormat;

		//programs
		this.clearProgram = new Program(
			new ShaderMaterial({
				vertexShader: baseVertex,
				fragmentShader: clearShader,
				uniforms: {
					texelSize: this.texelSize,
					uTexture: { value: null },
					value: { value: this.pressureDissipation },
				},
				depthTest: false,
				depthWrite: false,
			}) as ProgramMaterial
		);

		this.splatProgram = new Program(
			new ShaderMaterial({
				vertexShader: baseVertex,
				fragmentShader: splatShader,
				uniforms: {
					texelSize: this.texelSize,
					uTarget: { value: null },
					aspectRatio: { value: 1 },
					color: { value: new Vector3() },
					point: { value: new Vector2() },
					radius: { value: 1 },
				},
				depthTest: false,
				depthWrite: false,
			}) as ProgramMaterial
		);

		this.advectionProgram = new Program(
			new ShaderMaterial({
				vertexShader: baseVertex,
				fragmentShader: supportLinearFiltering
					? advectionShader
					: advectionManualFilteringShader,
				uniforms: {
					texelSize: this.texelSize,
					dyeTexelSize: {
						value: new Vector2(1 / this.dyeRes, 1 / this.dyeRes),
					},
					uVelocity: { value: null },
					uSource: { value: null },
					dt: { value: 0.016 },
					dissipation: { value: 1.0 },
				},
				depthTest: false,
				depthWrite: false,
			}) as ProgramMaterial
		);

		this.divergenceProgram = new Program(
			new ShaderMaterial({
				vertexShader: baseVertex,
				fragmentShader: divergenceShader,
				uniforms: {
					texelSize: this.texelSize,
					uVelocity: { value: null },
				},
				depthTest: false,
				depthWrite: false,
			}) as ProgramMaterial
		);

		this.curlProgram = new Program(
			new ShaderMaterial({
				vertexShader: baseVertex,
				fragmentShader: curlShader,
				uniforms: {
					texelSize: this.texelSize,
					uVelocity: { value: null },
				},
				depthTest: false,
				depthWrite: false,
			}) as ProgramMaterial
		);

		this.vorticityProgram = new Program(
			new ShaderMaterial({
				vertexShader: baseVertex,
				fragmentShader: vorticityShader,
				uniforms: {
					texelSize: this.texelSize,
					uVelocity: { value: null },
					uCurl: { value: null },
					curl: { value: this.curlStrength },
					dt: { value: 0.016 },
				},
				depthTest: false,
				depthWrite: false,
			}) as ProgramMaterial
		);

		this.pressureProgram = new Program(
			new ShaderMaterial({
				vertexShader: baseVertex,
				fragmentShader: pressureShader,
				uniforms: {
					texelSize: this.texelSize,
					uPressure: { value: null },
					uDivergence: { value: null },
				},
				depthTest: false,
				depthWrite: false,
			}) as ProgramMaterial
		);

		this.gradienSubtractProgram = new Program(
			new ShaderMaterial({
				vertexShader: baseVertex,
				fragmentShader: gradientSubtractShader,
				uniforms: {
					texelSize: this.texelSize,
					uPressure: { value: null },
					uVelocity: { value: null },
				},
				depthTest: false,
				depthWrite: false,
			}) as ProgramMaterial
		);

		this.splats = [];

		this.lastMouse = new Vector2();

		window.addEventListener(
			"touchstart",
			this.updateMouse.bind(this),
			false
		);
		window.addEventListener(
			"touchmove",
			this.updateMouse.bind(this),
			false
		);
		window.addEventListener(
			"mousemove",
			this.updateMouse.bind(this),
			false
		);
	}

	updateMouse(e: MouseEvent | TouchEvent): void {
		let x: number;
		let y: number;

		if ("changedTouches" in e && e.changedTouches?.length) {
			x = e.changedTouches[0].pageX;
			y = e.changedTouches[0].pageY;
		} else if ("pageX" in e) {
			x = e.pageX;
			y = e.pageY;
		} else {
			return;
		}

		if (!this.lastMouse.isInit) {
			this.lastMouse.isInit = true;

			// First input
			this.lastMouse.set(x, y);
		}

		const deltaX = x - this.lastMouse.x;
		const deltaY = y - this.lastMouse.y;

		this.lastMouse.set(x, y);

		const viewportSize = this.renderer.getSize(new Vector2());

		// Add if the mouse is moving
		if (Math.abs(deltaX) || Math.abs(deltaY)) {
			this.splats.push({
				// Get mouse value in 0 to 1 range, with y flipped
				x: x / viewportSize.width,
				y: 1.0 - y / viewportSize.height,
				dx: deltaX * 5.0,
				dy: deltaY * -5.0,
			});
		}
	}

	splat({ x, y, dx, dy }: SplatData): void {
		const viewportSize = this.renderer.getSize(new Vector2());

		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.splatProgram.program.uniforms.uTarget.value =
			this.velocity.read.texture;
		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.splatProgram.program.uniforms.aspectRatio.value =
			viewportSize.width / viewportSize.height;
		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.splatProgram.program.uniforms.point.value.set(x, y);
		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.splatProgram.program.uniforms.color.value.set(dx, dy, 1.0);
		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.splatProgram.program.uniforms.radius.value = this.radius / 100.0;

		this.renderer.setRenderTarget(this.velocity.write);
		this.splatProgram.render(this.renderer);

		this.velocity.swap();

		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.splatProgram.program.uniforms.uTarget.value =
			this.density.read.texture;

		this.renderer.setRenderTarget(this.density.write);
		this.splatProgram.render(this.renderer);

		this.density.swap((texture) => {
			this.uniform.value = texture;
		});
	}

	update(): void {
		// Perform all of the fluid simulation renders
		// No need to clear during sim, saving a number of GL calls.
		const oldAutoClear = this.renderer.autoClear;
		this.renderer.autoClear = false;

		// Render all of the inputs since last frame
		for (let i = this.splats.length - 1; i >= 0; i--) {
			this.splat(this.splats.splice(i, 1)[0]);
		}

		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.curlProgram.program.uniforms.uVelocity.value =
			this.velocity.read.texture;

		this.renderer.setRenderTarget(this.curl);
		this.curlProgram.render(this.renderer);

		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.vorticityProgram.program.uniforms.uVelocity.value =
			this.velocity.read.texture;
		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.vorticityProgram.program.uniforms.uCurl.value = this.curl.texture;

		this.renderer.setRenderTarget(this.velocity.write);
		this.vorticityProgram.render(this.renderer);

		this.velocity.swap();

		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.divergenceProgram.program.uniforms.uVelocity.value =
			this.velocity.read.texture;

		this.renderer.setRenderTarget(this.divergence);
		this.divergenceProgram.render(this.renderer);

		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.clearProgram.program.uniforms.uTexture.value =
			this.pressure.read.texture;
		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.clearProgram.program.uniforms.value.value =
			this.pressureDissipation;

		this.renderer.setRenderTarget(this.pressure.write);
		this.clearProgram.render(this.renderer);

		this.pressure.swap();

		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.pressureProgram.program.uniforms.uDivergence.value =
			this.divergence.texture;

		for (let i = 0; i < this.iterations; i++) {
			// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
			this.pressureProgram.program.uniforms.uPressure.value =
				this.pressure.read.texture;

			this.renderer.setRenderTarget(this.pressure.write);
			this.pressureProgram.render(this.renderer);

			this.pressure.swap();
		}

		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.gradienSubtractProgram.program.uniforms.uPressure.value =
			this.pressure.read.texture;
		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.gradienSubtractProgram.program.uniforms.uVelocity.value =
			this.velocity.read.texture;

		this.renderer.setRenderTarget(this.velocity.write);
		this.gradienSubtractProgram.render(this.renderer);

		this.velocity.swap();

		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.advectionProgram.program.uniforms.dyeTexelSize.value.set(
			1 / this.simRes
		);
		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.advectionProgram.program.uniforms.uVelocity.value =
			this.velocity.read.texture;
		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.advectionProgram.program.uniforms.uSource.value =
			this.velocity.read.texture;
		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.advectionProgram.program.uniforms.dissipation.value =
			this.velocityDissipation;

		this.renderer.setRenderTarget(this.velocity.write);
		this.advectionProgram.render(this.renderer);

		this.velocity.swap();

		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.advectionProgram.program.uniforms.dyeTexelSize.value.set(
			1 / this.dyeRes
		);
		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.advectionProgram.program.uniforms.uVelocity.value =
			this.velocity.read.texture;
		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.advectionProgram.program.uniforms.uSource.value =
			this.density.read.texture;
		// @ts-expect-error Property 'uniforms' does not exist on type 'Material'.
		this.advectionProgram.program.uniforms.dissipation.value =
			this.densityDissipation;

		this.renderer.setRenderTarget(this.density.write);
		this.advectionProgram.render(this.renderer);

		this.density.swap((texture) => {
			this.uniform.value = texture;
		});

		// Set clear back to default
		this.renderer.autoClear = oldAutoClear;
		this.renderer.setRenderTarget(null);
		// this.renderer.clear()

		// return this.density.read.texture
	}
}

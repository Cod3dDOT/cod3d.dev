'use client';

import { extend, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer, RenderPass, ShaderPass } from 'three-stdlib';

class DistortionShader {
	uniforms: {
		tDiffuse: { value: THREE.Texture | null };
		u_prevMouse: { value: THREE.Vector2 };
		u_mouse: { value: THREE.Vector2 };
		u_resolution: { value: THREE.Vector2 };
		u_intensity: { value: number };
		u_radius: { value: number };
		u_chromaticAberration: { value: number };
		u_gridSize: { value: number };
	};
	vertexShader: string;
	fragmentShader: string;

	constructor() {
		this.uniforms = {
			tDiffuse: { value: null },
			u_prevMouse: { value: new THREE.Vector2(0.5, 0.5) },
			u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
			u_resolution: { value: new THREE.Vector2(1, 1) },
			u_intensity: { value: 0.0 },
			u_radius: { value: 0.3 },
			u_chromaticAberration: { value: 0.02 },
			u_gridSize: { value: 30.0 }
		};

		this.vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `;

		this.fragmentShader = `
            uniform sampler2D tDiffuse;
            uniform vec2 u_prevMouse;
            uniform vec2 u_mouse;
            uniform vec2 u_resolution;
            uniform float u_intensity;
            uniform float u_radius;
            uniform float u_chromaticAberration;
            uniform float u_gridSize;
            varying vec2 vUv;

            vec2 getDistortionUv(vec2 uv) {
                vec2 gridUv = floor(uv * vec2(u_gridSize)) / vec2(u_gridSize);
                vec2 centerOfPixel = gridUv + vec2(1.0 / (u_gridSize));

                vec2 mouseDirection = u_mouse - u_prevMouse;

                vec2 pixelToMouse = centerOfPixel - u_mouse;
                float distanceToMouse = length(pixelToMouse);
                float strength = smoothstep(u_radius, 0.0, distanceToMouse) * u_intensity;

                vec2 direction = normalize(pixelToMouse);
                vec2 uvOffset = strength * 0.4 * mouseDirection;

                return uvOffset;
            }

            void main() {
                vec2 uvOffset = getDistortionUv(vUv);
                vec2 uv = vUv - uvOffset;

                // Chromatic aberration
                vec4 cr = texture2D(tDiffuse, uv + uvOffset * u_chromaticAberration);
                vec4 cg = texture2D(tDiffuse, uv);
                vec4 cb = texture2D(tDiffuse, uv - uvOffset * u_chromaticAberration);

                gl_FragColor = vec4(cr.r, cg.g, cb.b, cg.a);
            }
        `;
	}
}

extend({ EffectComposer, RenderPass, ShaderPass });

class MouseState {
	current: THREE.Vector2;
	target: THREE.Vector2;
	velocity: THREE.Vector2;
	intensity: number;
	targetIntensity: number;
	springStrength: number;
	damping: number;

	constructor(springStrength: number = 8.0, damping: number = 0.9) {
		this.current = new THREE.Vector2(0.5, 0.5);
		this.target = new THREE.Vector2(0.5, 0.5);
		this.velocity = new THREE.Vector2(0, 0);
		this.intensity = 0;
		this.targetIntensity = 0;
		this.springStrength = springStrength;
		this.damping = damping;
	}

	update(delta: number) {
		const INTENSITY_LERP = 0.1;

		const dx = this.target.x - this.current.x;
		const dy = this.target.y - this.current.y;

		this.velocity.x += dx * this.springStrength * delta;
		this.velocity.y += dy * this.springStrength * delta;

		this.velocity.multiplyScalar(this.damping);

		this.current.x += this.velocity.x;
		this.current.y += this.velocity.y;

		this.intensity += (this.targetIntensity - this.intensity) * INTENSITY_LERP;

		return this;
	}
}

interface DistortionEffectProps {
	strength?: number;
	radius?: number;
	chromaticAberration?: number;
	springStrength?: number;
	damping?: number;
	gridSize?: number;

	magnification?: number;
	lensShape?: number;
	borderWidth?: number;
	borderFeather?: number;
}

export const DistortionEffect: React.FC<DistortionEffectProps> = ({
	strength = 1.0,
	radius = 0.3,
	chromaticAberration = 0.02,
	springStrength = 8.0,
	damping = 0.9,
	gridSize = 30.0
}) => {
	const { gl, scene, camera, size: windowSize } = useThree();
	const mouseState = useRef(new MouseState(springStrength, damping));
	const lastTime = useRef(performance.now());

	const [effectComposer, shaderPass] = useMemo(() => {
		const effectComposer = new EffectComposer(gl);
		const renderPass = new RenderPass(scene, camera);
		effectComposer.addPass(renderPass);

		const shader = new DistortionShader();
		const shaderPass = new ShaderPass(shader);
		effectComposer.addPass(shaderPass);

		return [effectComposer, shaderPass];
	}, [gl, scene, camera]);

	useEffect(() => {
		effectComposer.setSize(windowSize.width, windowSize.height);
	}, [effectComposer, windowSize]);

	const handleMouseMove = (event: MouseEvent) => {
		const x = event.clientX / window.innerWidth;
		const y = 1 - event.clientY / window.innerHeight;

		mouseState.current.target.set(x, y);
		mouseState.current.targetIntensity = 1.0 * strength;
	};

	const handleMouseLeave = () => {
		mouseState.current.target.set(0.5, 0.5);
		mouseState.current.targetIntensity = 0;
	};

	useFrame(() => {
		const currentTime = performance.now();
		const delta = Math.min((currentTime - lastTime.current) / 1000, 0.1);
		lastTime.current = currentTime;

		mouseState.current.update(delta);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		shaderPass.uniforms.u_mouse.value.copy(mouseState.current.target);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		shaderPass.uniforms.u_prevMouse.value.copy(mouseState.current.current);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		shaderPass.uniforms.u_resolution.value.set(
			windowSize.width,
			windowSize.height
		);
		shaderPass.uniforms.u_intensity.value = mouseState.current.intensity;
		shaderPass.uniforms.u_radius.value = radius;
		shaderPass.uniforms.u_chromaticAberration.value = chromaticAberration;
		shaderPass.uniforms.u_gridSize.value = gridSize;

		effectComposer.render();
	}, 1);

	useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

	return null;
};

'use client';

import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer, RenderPass, ShaderPass } from 'three-stdlib';

import distortionFragmentShader from '@/assets/shaders/distortion.frag';
import distortionVertexShader from '@/assets/shaders/distortion.vert';

const DistortionMaterial = shaderMaterial(
	{
		tDiffuse: null,
		u_prevMouse: new THREE.Vector2(0.5, 0.5),
		u_mouse: new THREE.Vector2(0.5, 0.5),
		u_resolution: new THREE.Vector2(1, 1),
		u_intensity: 0.0,
		u_radius: 0.3,
		u_chromaticAberration: 0.02,
		u_gridSize: 30.0
	},
	distortionVertexShader,
	distortionFragmentShader
);

extend({ EffectComposer, RenderPass, ShaderPass, DistortionMaterial });

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
	const { size: windowSize, scene, camera, gl } = useThree();
	const mouseState = useRef(new MouseState(springStrength, damping));
	const lastTime = useRef(performance.now());

	const [effectComposer, shaderPass] = useMemo(() => {
		const effectComposer = new EffectComposer(gl);
		const renderPass = new RenderPass(scene, camera);
		effectComposer.addPass(renderPass);

		const material = new DistortionMaterial();
		const shaderPass = new ShaderPass(material);
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

		shaderPass.uniforms.u_mouse.value = mouseState.current.target;
		shaderPass.uniforms.u_prevMouse.value = mouseState.current.current;
		shaderPass.uniforms.u_resolution.value = new THREE.Vector2(
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

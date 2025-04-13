"use client";

import { Suspense } from "react";
import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { PostProcessing } from "../postprocessing";
import { Preload } from "../preload";
import { RAF } from "../raf";
import { useCanvas } from "./";

type WebGLCanvasProps = React.HTMLAttributes<HTMLDivElement> & {
	render?: boolean;
	postprocessing?: boolean;
};

export function WebGLCanvas({
	render = true,
	postprocessing = false,
	...props
}: WebGLCanvasProps) {
	const { WebGLTunnel, DOMTunnel } = useCanvas();

	return (
		<div
			className="pointer-events-none fixed inset-0 max-h-screen max-w-screen"
			{...props}
		>
			<Canvas
				className="h-full w-full"
				gl={{
					precision: "highp",
					powerPreference: "high-performance",
					antialias: true,
					alpha: true,
					...(postprocessing && { stencil: false, depth: false }),
				}}
				dpr={[1, 2]}
				orthographic
				// camera={{ position: [0, 0, 5000], near: 0.001, far: 10000, zoom: 1 }}
				frameloop="never"
				linear
				flat
				eventSource={document.documentElement}
				eventPrefix="client"
				resize={{ scroll: false, debounce: { scroll: 0, resize: 500 } }}
			>
				{/* <StateListener onChange={onChange} /> */}
				<OrthographicCamera
					makeDefault
					position={[0, 0, 5000]}
					near={0.001}
					far={10000}
					zoom={1}
				/>
				<RAF render={render} />
				{postprocessing && <PostProcessing />}
				<Suspense>
					<WebGLTunnel.Out />
				</Suspense>
				<Preload />
			</Canvas>
			<DOMTunnel.Out />
		</div>
	);
}

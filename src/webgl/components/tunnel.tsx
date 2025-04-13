"use client";

import { Fragment, useId, type PropsWithChildren } from "react";
import { useContextBridge } from "@react-three/drei";

import { TransformContext } from "@/lib/hooks/useTransform";
import { useCanvas } from "@/webgl/components/canvas";

export function WebGLTunnel({ children }: PropsWithChildren) {
	const { WebGLTunnel } = useCanvas();

	const ContextBridge = useContextBridge(TransformContext);

	const uuid = useId();

	if (!WebGLTunnel) return;

	return (
		<WebGLTunnel.In>
			<ContextBridge key={uuid}>{children}</ContextBridge>
		</WebGLTunnel.In>
	);
}

export function DOMTunnel({ children }: PropsWithChildren) {
	const { DOMTunnel } = useCanvas();

	const uuid = useId();

	return (
		<DOMTunnel.In>
			<Fragment key={uuid}>{children}</Fragment>
		</DOMTunnel.In>
	);
}

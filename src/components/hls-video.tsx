"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface HlsVideoProps {
	src: string;
}

export default function HlsVideo({ src }: HlsVideoProps) {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		let hls: Hls | null = null;

		if (Hls.isSupported()) {
			hls = new Hls();
			hls.loadSource(src);
			hls.attachMedia(video);
		} else if (video.canPlayType("application/vnd.apple.mpegurl")) {
			video.src = src;
		}

		return () => {
			if (hls) {
				hls.destroy();
			}
		};
	}, [src]);

	return (
		<video
			ref={videoRef}
			className="absolute inset-0 h-full w-full object-cover z-0"
			autoPlay
			loop
			muted
			playsInline
		/>
	);
}

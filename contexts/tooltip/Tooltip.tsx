import { motion } from "framer-motion";
import { RefObject, useLayoutEffect, useRef, useState } from "react";
import { TooltipPosition } from ".";
import clsx from "clsx";

const SPACE_FROM_ORIGIN = 10;
const SPACE_FROM_EDGE = 25;
const INITIAL_SCALE = 0.92;
const TRANSITION_DURATION = 0.15;
export const Tooltip: React.FC<{
	children: React.ReactNode;
	position: TooltipPosition;
	refElement: RefObject<HTMLDivElement>;
}> = ({ children, position, refElement }) => {
	const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
	const [tooltipOffset, setTooltipOffset] = useState(0);
	const ref = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		if (!ref.current || !refElement.current) return;

		// Getting dimensions
		let {
			left,
			top,
			width: refWidth,
			height: refHeight,
		} = refElement.current.getBoundingClientRect();
		let { width, height } = ref.current.getBoundingClientRect();

		width = width / INITIAL_SCALE;
		height = height / INITIAL_SCALE;

		// Getting preliminary position
		switch (position) {
			case "top":
				top -= height + SPACE_FROM_ORIGIN;
				left = left - width / 2 + refWidth / 2;
				break;
			case "bottom":
				top += refHeight + SPACE_FROM_ORIGIN;
				left = left - width / 2 + refWidth / 2;
				break;
		}

		// Checking if position exceeds viewport
		let offset = 0;
		if (left + width > window.innerWidth - SPACE_FROM_EDGE) {
			const newLeft = window.innerWidth - width - SPACE_FROM_EDGE;
			offset = left - newLeft;
			left = newLeft;
		}
		if (left < 0) {
			offset = left - SPACE_FROM_EDGE;
			left = SPACE_FROM_EDGE;
		}

		setTooltipOffset(offset);
		setTooltipPosition({ top, left });
	}, [refElement.current]);

	return (
		<motion.div
			className={clsx(
				"[--tooltip-bg:#0c0e02] [--tooltip-offset:0px] bg-[var(--tooltip-bg)] pointer-events-none max-w-[240px] fixed z-50 p-3 text-xs font-medium rounded-lg",
				"after:border-[7px] after:border-transparent after:absolute data-[position=top]:after:border-t-[var(--tooltip-bg)] data-[position=top]:after:top-full",
				"data-[position=top]:after:left-[calc(50%+var(--tooltip-offset))] data-[position=top]:after:-translate-x-2/4 data-[position=bottom]:after:border-b-[var(--tooltip-bg)]",
				"data-[position=bottom]:after:bottom-full data-[position=bottom]:after:left-[calc(50%+var(--tooltip-offset))] data-[position=bottom]:after:-translate-x-2/4"
			)}
			initial={{
				opacity: 0,
				scale: INITIAL_SCALE,
			}}
			exit={{
				opacity: 0,
				scale: INITIAL_SCALE,
			}}
			animate={{
				opacity: 1,
				scale: 1,
				translateY: 0,
				translateX: 0,
			}}
			transition={{ duration: TRANSITION_DURATION }}
			style={{
				...tooltipPosition,
				...{
					"--tooltip-offset": `${tooltipOffset}px`,
				},
			}}
			data-position={position}
			ref={ref}
		>
			{children}
		</motion.div>
	);
};

import { useEffect, useState } from "react";
import { SUIT_NAMES } from "./constants";

export const useForceUpdate = () => {
	const [, setValue] = useState(0);
	return () => setValue((value) => ++value);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useWindowEvent = (event: any, callback: any) => {
	useEffect(() => {
		window.addEventListener(event, callback);
		return () => window.removeEventListener(event, callback);
	}, [event, callback]);
};

export const getPileSize = () => {
	const pileEl = document.querySelector(".pile") as HTMLDivElement | null;
	return {
		width: pileEl?.offsetWidth ?? 0,
		height: pileEl?.offsetHeight ?? 0,
	};
};

const getPilePos = (pileIndex: number) => {
	const pileEl = document.querySelector(
		`.pile[data-pileindex="${pileIndex}"]`,
	) as HTMLDivElement | null;
	const pilePos = pileEl?.getBoundingClientRect();
	return { x: pilePos?.x ?? 0, y: pilePos?.y ?? 0 };
};

export const getCardPilePosition = (card: CardType) => {
	const pilePos = getPilePos(card.pileIndex);
	let offsetX = 0;
	let offsetY = 0;
	const pileType =
		card.pileIndex === 0
			? "deck"
			: card.pileIndex === 1 || card.pileIndex === SUIT_NAMES.length * 3 + 2
				? "hand"
				: card.pileIndex > 5 && card.pileIndex < 11
					? "discard"
					: "tableau";

	const CARD_Y_GAP = 0.25;
	const CARD_X_GAP = 0.3;
	if (pileType === "tableau") {
		const { width } = getPileSize();
		offsetY = card.cardPileIndex * (CARD_Y_GAP * width);
	}
	if (pileType === "hand") {
		const { width } = getPileSize();
		const gw = CARD_X_GAP * width;
		offsetX = card.cardPileIndex * gw - gw * 2.25;
	}

	return {
		x: pilePos.x + offsetX,
		y: pilePos.y + offsetY,
		pileType,
	};
};

export const loadStorage = (key: string): any => {
	const saved = localStorage.getItem(key);
	return saved ? JSON.parse(saved) : {};
};

export const saveStorage = (key: string, value: any) =>
	localStorage.setItem(key, JSON.stringify(value));

export const cn = (...args: (string | false | null | undefined)[]) =>
	args.filter(Boolean).join(" ");

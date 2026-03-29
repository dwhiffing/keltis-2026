export const Pile = ({
	pileIndex,
	pileType,
}: {
	pileIndex: number;
	pileType: "discard" | "tableau" | "hand" | "deck";
}) => {
	return (
		<div
			key={`pile-${pileIndex}`}
			className={`pile ${pileType}`}
			data-pileindex={pileIndex}
			data-piletype={pileType}
		></div>
	);
};

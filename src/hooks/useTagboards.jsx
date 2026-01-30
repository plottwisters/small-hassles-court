import { TagBoard } from "@components/court/TagBoard";

export function useTagboards(gameState) {
    const player1 = gameState.player1;
    const player2 = gameState.player2;

    return (
        <>
            <TagBoard 
                name={player1.name} 
                tags={JSON.parse(player1.tags)}
                left={true}
            />
            <TagBoard 
                name={player2.name} 
                tags={JSON.parse(player2.tags)}
                left={false}
            />
        </>
    );
}
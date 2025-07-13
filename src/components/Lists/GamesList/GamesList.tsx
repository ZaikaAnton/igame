import CardGame from "@/components/Cards/CardGame/CardGame";
import Box from "@/shared/Box/Box";
import { Game } from "@/shared/api/api";
import { Ref } from "react";

interface GamesListProps {
  games: Game[];
  cardRef?: Ref<HTMLDivElement>;
}

const GamesList = ({ games, cardRef }: GamesListProps) => {
  return (
    <Box
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px 20px",
        justifyContent: "space-around",
      }}
    >
      {games.map((game, index) => (
        <Box key={game.gameID} ref={index === 0 ? cardRef : undefined}>
          <CardGame game={game} />
        </Box>
      ))}
    </Box>
  );
};

export default GamesList;

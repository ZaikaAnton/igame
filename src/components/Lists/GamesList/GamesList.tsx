import CardGame from "@/components/Cards/CardGame/CardGame";
import Box from "@/shared/ui/Box/Box";
import { Game } from "@/shared/api/api";
import { Ref } from "react";
import "./GamesList.css";

interface GamesListProps {
  games: Game[];
  cardRef?: Ref<HTMLDivElement>;
}

const GamesList = ({ games, cardRef }: GamesListProps) => {
  return (
    <Box className="games-list">
      {games.map((game, index) => (
        <Box key={game.gameID} ref={index === 0 ? cardRef : undefined}>
          <CardGame game={game} />
        </Box>
      ))}
    </Box>
  );
};

export default GamesList;

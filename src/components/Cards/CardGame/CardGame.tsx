import Box from "@/shared/Box/Box";
import Typography from "@/shared/Typography/Typography";
import { Game } from "@/shared/api/api";

interface CardGameProps {
  game: Game;
}

const CardGame = ({ game }: CardGameProps) => {
  return (
    <Box>
      <img
        src={`https://bsw-dk1.pragmaticplay.net/game_pic/square/200/${game.gameID}.png`}
        alt={game.gameName}
        style={{ width: "190px", height: "120px" }}
      />
      <Typography variantClass="text-12-400">{game.gameName}</Typography>
    </Box>
  );
};

export default CardGame;

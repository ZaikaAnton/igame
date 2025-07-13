import Box from "@/shared/Box/Box";
import "./GamesPage.css";
import FilterGamesPage from "@/components/Filter/FilterGamesPage/FilterGamesPage";
import HeaderGamesPage from "@/components/Headers/HeaderGamesPage/HeaderGamesPage";

const GamesPage = () => {
  return (
    <Box
      style={{
        padding: "10px 20px",
        height: "100vh",
      }}
    >
      <FilterGamesPage />
      <HeaderGamesPage />
    </Box>
  );
};

export default GamesPage;

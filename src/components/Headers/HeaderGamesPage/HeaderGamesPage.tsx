import Box from "@/shared/ui/Box/Box";
import Typography from "@/shared/ui/Typography/Typography";
import "./HeaderGamesPage.css";

const HeaderGamesPage = () => {
  return (
    <Box className="header-games-page">
      <img
        src="/assets/logo.svg"
        alt="Logo"
        className="header-games-page__logo"
      />
      <Typography variantClass="text-16-700">BSW Games</Typography>
    </Box>
  );
};

export default HeaderGamesPage;

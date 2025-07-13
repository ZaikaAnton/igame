import Box from "@/shared/Box/Box";
import Typography from "@/shared/Typography/Typography";

const HeaderGamesPage = () => {
  return (
    <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <img
        src="/assets/logo.svg"
        alt="Logo"
        style={{
          padding: "0 5px",
          border: "1px dashed var(--colorDisabledOrTransparent)",
        }}
      />
      <Typography variantClass="text-16-700">BSW Games</Typography>
    </Box>
  );
};

export default HeaderGamesPage;

import InputSection from "@/components/InputSection/InputSection";
import SelectSection from "@/components/SelectSection/SelectSection";
import Box from "@/shared/Box/Box";
import "./GamesPage.css";

const GamesPage = () => {
  return (
    <Box
      style={{
        padding: "10px 20px",
        height: "100vh",
      }}
    >
      <Box
        style={{
          display: "flex",
          gap: "10px",
          height: "80px",
        }}
      >
        <SelectSection className="selectSection" />
        <InputSection className="inputSection" />
      </Box>
    </Box>
  );
};

export default GamesPage;

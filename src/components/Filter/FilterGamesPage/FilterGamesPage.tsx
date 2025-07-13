import InputSection from "@/components/InputSection/InputSection";
import SelectSection from "@/components/SelectSection/SelectSection";
import Box from "@/shared/Box/Box";

const FilterGamesPage = () => {
  return (
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
  );
};

export default FilterGamesPage;

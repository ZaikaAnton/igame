import Box from "@/shared/Box/Box";
import Typography from "@/shared/Typography/Typography";
import { CSSProperties } from "react";

interface SelectSectionProps {
  style?: CSSProperties;
  className?: string;
}

const SelectSection = ({ style, className }: SelectSectionProps) => {
  return (
    <Box
      className={className}
      style={{
        ...style,
      }}
    >
      <Typography variantClass="text-14-700">Game Type</Typography>
      <Box style={{ border: "1px solid var(--colorBorderDarkGold)" }}>All</Box>
    </Box>
  );
};

export default SelectSection;

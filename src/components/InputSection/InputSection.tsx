import Box from "@/shared/Box/Box";
import Button from "@/shared/Button/Button";
import TextField from "@/shared/TextField/TextField";
import Typography from "@/shared/Typography/Typography";
import { CSSProperties } from "react";

interface InputSectionProps {
  style?: CSSProperties;
  className?: string;
}

const InputSection = ({ style, className }: InputSectionProps) => {
  return (
    <Box
      className={className}
      style={{
        ...style,
      }}
    >
      <Typography variantClass="text-14-700">Search</Typography>
      <Box style={{ display: "flex", gap: "10px" }}>
        <TextField
          style={{ flex: 1 }}
          icon={<img src="/assets/searchIcon.svg" alt="Search Icon" />}
        />
        <Button variant="primary">BUTTON</Button>
      </Box>
    </Box>
  );
};

export default InputSection;

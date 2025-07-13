import Autocomplete from "@/shared/Autocomplete/Autocomplete";
import Box from "@/shared/Box/Box";
import Typography from "@/shared/Typography/Typography";
import { CSSProperties, useState } from "react";

interface SelectSectionProps {
  style?: CSSProperties;
  className?: string;
}

interface Option {
  label: string;
  value: string | number;
}

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
];

const SelectSection = ({ style, className }: SelectSectionProps) => {
  const [selected, setSelected] = useState<Option | null>(null);

  return (
    <Box
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "30px",
        ...style,
      }}
    >
      <Typography variantClass="text-14-700">Game Type</Typography>
      <Autocomplete
        options={options}
        value={selected}
        onValueChange={setSelected}
      />
    </Box>
  );
};

export default SelectSection;

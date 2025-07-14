import Box from "@/shared/ui/Box/Box";
import Typography from "@/shared/ui/Typography/Typography";
import { CSSProperties, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import "./SelectSection.css";
import Autocomplete from "@/shared/ui/Autocomplete/Autocomplete";

interface SelectSectionProps {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  style?: CSSProperties;
  className?: string;
}

const SelectSection = ({
  options,
  onChange,
  style,
  className,
}: SelectSectionProps) => {
  const gameTypeValue = useSelector(
    (state: RootState) => state.gamesFilter.gameType
  );

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === gameTypeValue) || null,
    [options, gameTypeValue]
  );

  return (
    <Box className={`${className || ""} select-section`} style={style}>
      <Typography variantClass="text-14-700">Game Type</Typography>
      <Autocomplete
        options={options}
        value={selectedOption}
        onValueChange={(option) => onChange(option?.value || "")}
      />
    </Box>
  );
};

export default SelectSection;

import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "@/features/gamesFilterSlice";
import TextField from "@/shared/TextField/TextField";
import Box from "@/shared/Box/Box";
import Typography from "@/shared/Typography/Typography";
import { CSSProperties, useEffect, useState } from "react";
import { RootState } from "@/app/store/store";
import Button from "@/shared/Button/Button";

interface InputSectionProps {
  style?: CSSProperties;
  className?: string;
}

const InputSection = ({ style, className }: InputSectionProps) => {
  const dispatch = useDispatch();
  const searchFromStore = useSelector(
    (state: RootState) => state.gamesFilter.search
  );

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(searchFromStore);
  }, [searchFromStore]);

  const onSearchClick = () => {
    dispatch(setSearch(inputValue.trim()));
  };

  return (
    <Box className={className} style={style}>
      <Typography variantClass="text-14-700">Search</Typography>
      <Box style={{ display: "flex", gap: "10px" }}>
        <TextField
          style={{ flex: 1 }}
          icon={<img src="/assets/searchIcon.svg" alt="Search Icon" />}
          value={inputValue}
          onChange={(val) => setInputValue(val)}
          placeholder="Search"
        />
        <Button onClick={onSearchClick}>BUTTON</Button>
      </Box>
    </Box>
  );
};

export default InputSection;

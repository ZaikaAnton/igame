import { RootState } from "@/app/store/store";
import InputSection from "@/components/InputSection/InputSection";
import SelectSection from "@/components/SelectSection/SelectSection";
import { setSearch, setGameType } from "@/features/gamesFilterSlice";
import Box from "@/shared/ui/Box/Box";
import { ALL_OPTIONS } from "@/shared/const/defaultText";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./FilterGamesPage.css";
interface FilterGamesPageProps {
  gameTypeOptions: { label: string; value: string }[];
  onGameTypeChange: (value: string) => void;
}

const FilterGamesPage = ({
  gameTypeOptions,
  onGameTypeChange,
}: FilterGamesPageProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const searchValue = useSelector(
    (state: RootState) => state.gamesFilter.search
  );

  const gameTypeValue = useSelector(
    (state: RootState) => state.gamesFilter.gameType
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const urlSearch = params.get("search") || "";
    const urlGameType = params.get("gameType") || ALL_OPTIONS;

    if (urlSearch !== searchValue) {
      dispatch(setSearch(urlSearch));
    }

    if (urlGameType !== gameTypeValue) {
      dispatch(setGameType(urlGameType));
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }

    if (gameTypeValue && gameTypeValue !== ALL_OPTIONS) {
      params.set("gameType", gameTypeValue);
    } else {
      params.delete("gameType");
    }

    const newSearch = params.toString();
    if (newSearch !== location.search.replace(/^\?/, "")) {
      navigate({ search: newSearch }, { replace: true });
    }
  }, [searchValue, gameTypeValue, location.search, navigate]);

  return (
    <Box className="filter-container">
      <SelectSection
        options={gameTypeOptions}
        onChange={onGameTypeChange}
        className="select-section"
      />
      <InputSection className="input-section" />
    </Box>
  );
};

export default FilterGamesPage;

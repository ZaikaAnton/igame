import { RootState } from "@/app/store/store";
import InputSection from "@/components/InputSection/InputSection";
import SelectSection from "@/components/SelectSection/SelectSection";
import { setSearch } from "@/features/gamesFilterSlice";
import Box from "@/shared/Box/Box";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const FilterGamesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const searchValue = useSelector(
    (state: RootState) => state.gamesFilter.search
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlSearch = params.get("search") || "";
    if (urlSearch !== searchValue) {
      dispatch(setSearch(urlSearch));
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    if (params.toString() !== location.search.replace(/^\?/, "")) {
      navigate({ search: params.toString() }, { replace: true });
    }
  }, [searchValue, location.search, navigate]);
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

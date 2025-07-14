import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Box from "@/shared/ui/Box/Box";
import "./GamesPage.css";
import FilterGamesPage from "@/components/Filter/FilterGamesPage/FilterGamesPage";
import HeaderGamesPage from "@/components/Headers/HeaderGamesPage/HeaderGamesPage";

import { useGetGamesQuery } from "@/shared/api/api";
import GamesList from "@/components/Lists/GamesList/GamesList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setGameType } from "@/features/gamesFilterSlice";
import { ALL_OPTIONS } from "@/shared/const/defaultText";

const GamesPage = () => {
  const dispatch = useDispatch();
  const { data: gamesResponse } = useGetGamesQuery();
  const cardRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(1);

  const searchValue = useSelector(
    (state: RootState) => state.gamesFilter.search
  );

  const gameTypeValue = useSelector(
    (state: RootState) => state.gamesFilter.gameType
  );

  const gameTypeOptions = useMemo(() => {
    if (!gamesResponse) return [];
    const ids = Array.from(new Set(gamesResponse.map((g) => g.gameTypeID)));
    const options = ids.map((id) => ({
      label: id,
      value: id,
    }));
    return [{ label: ALL_OPTIONS, value: ALL_OPTIONS }, ...options];
  }, [gamesResponse]);

  const filteredGames = useMemo(() => {
    if (!gamesResponse) return [];
    const lowerSearch = searchValue.toLowerCase();

    return gamesResponse.filter((game) => {
      const matchesSearch = game.gameName.toLowerCase().includes(lowerSearch);
      const matchesGameType =
        gameTypeValue === ALL_OPTIONS || !gameTypeValue
          ? true
          : game.gameTypeID === gameTypeValue;
      return matchesSearch && matchesGameType;
    });
  }, [gamesResponse, searchValue, gameTypeValue]);

  const visibleGames = useMemo(() => {
    return filteredGames ? filteredGames.slice(0, visibleCount) : [];
  }, [filteredGames, visibleCount]);

  const updateVisibleCount = useCallback(() => {
    if (!cardRef.current || !gamesResponse?.length) return;

    const cardRect = cardRef.current.getBoundingClientRect();
    const cardWidth = cardRect.width;
    const cardHeight = cardRect.height;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const cardsPerRow = Math.floor(windowWidth / cardWidth);
    const rowsPerPage = Math.floor(windowHeight / cardHeight);
    const totalCardsVisible = cardsPerRow * rowsPerPage;

    setVisibleCount(totalCardsVisible);
  }, [gamesResponse]);

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [updateVisibleCount]);

  useEffect(() => {
    function onScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        if (visibleCount < filteredGames.length) {
          setVisibleCount((prev) =>
            Math.min(prev + visibleCount, filteredGames.length)
          );
        }
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [visibleCount, filteredGames.length]);

  if (!gamesResponse || gamesResponse.length === 0) return null;

  return (
    <Box className="games-page-container">
      <FilterGamesPage
        gameTypeOptions={gameTypeOptions}
        onGameTypeChange={(value) => dispatch(setGameType(value))}
      />
      <HeaderGamesPage />
      <GamesList games={visibleGames} cardRef={cardRef} />
    </Box>
  );
};

export default GamesPage;

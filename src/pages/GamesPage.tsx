import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Box from "@/shared/Box/Box";
import "./GamesPage.css";
import FilterGamesPage from "@/components/Filter/FilterGamesPage/FilterGamesPage";
import HeaderGamesPage from "@/components/Headers/HeaderGamesPage/HeaderGamesPage";

import { useGetGamesQuery } from "@/shared/api/api";
import GamesList from "@/components/Lists/GamesList/GamesList";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";

const GamesPage = () => {
  const { data: gamesResponse } = useGetGamesQuery();
  const cardRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(1);

  const searchValue = useSelector(
    (state: RootState) => state.gamesFilter.search
  );

  const filteredGames = useMemo(() => {
    if (!gamesResponse) return [];
    const lowerSearch = searchValue.toLowerCase();
    return gamesResponse.filter((game) =>
      game.gameName.toLowerCase().includes(lowerSearch)
    );
  }, [gamesResponse, searchValue]);

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

    const horizontalGap = 20;
    const verticalGap = 10;

    const cardsPerRow = Math.floor(windowWidth / (cardWidth + horizontalGap));
    const rowsPerPage = Math.floor(windowHeight / (cardHeight + verticalGap));
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
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px 20px",
        height: "100%",
        overflowY: "auto",
        gap: "20px",
      }}
    >
      <FilterGamesPage />
      <HeaderGamesPage />
      <GamesList games={visibleGames} cardRef={cardRef} />
    </Box>
  );
};

export default GamesPage;

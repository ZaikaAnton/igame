import { useState, useEffect, useRef } from "react";
import Box from "@/shared/Box/Box";
import "./GamesPage.css";
import FilterGamesPage from "@/components/Filter/FilterGamesPage/FilterGamesPage";
import HeaderGamesPage from "@/components/Headers/HeaderGamesPage/HeaderGamesPage";

import { useGetGamesQuery } from "@/shared/api/api";
import GamesList from "@/components/Lists/GamesList/GamesList";

const GamesPage = () => {
  const { data: gamesResponse } = useGetGamesQuery();

  const [visibleCount, setVisibleCount] = useState(1);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateVisibleCount() {
      if (cardRef.current && gamesResponse) {
        const cardRect = cardRef.current.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const horizontalGap = 20;
        const verticalGap = 10;

        const cardsPerRow = Math.floor(
          windowWidth / (cardWidth + horizontalGap)
        );
        const rowsPerPage = Math.floor(
          windowHeight / (cardHeight + verticalGap)
        );
        const totalCardsVisible = cardsPerRow * rowsPerPage;

        setVisibleCount((prev) => Math.max(prev, totalCardsVisible));
      }
    }

    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [gamesResponse]);

  const visibleGames = gamesResponse
    ? gamesResponse.slice(0, visibleCount)
    : [];

  useEffect(() => {
    function onScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      ) {
        if (gamesResponse && visibleCount < gamesResponse.length) {
          setVisibleCount((prev) =>
            Math.min(prev + visibleCount, gamesResponse.length)
          );
        }
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [visibleCount, gamesResponse]);

  if (!gamesResponse || gamesResponse.length === 0) return null;

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px 20px",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <FilterGamesPage />
      <HeaderGamesPage />
      <GamesList games={visibleGames} cardRef={cardRef} />
      {visibleCount < (gamesResponse?.length ?? 0) && (
        <Box style={{ textAlign: "center" }}>Загрузка...</Box>
      )}
    </Box>
  );
};

export default GamesPage;

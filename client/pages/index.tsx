/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from "react";
import Pog from "./screens/Components&Constants/Pog";
import { useUser } from "@auth0/nextjs-auth0/client";
import CarouselSlider from "./screens/Components&Constants/Carousel";
import MarqueeCompenent from "./screens/IndexComponents/Marquee";
import PogsDisplay from "./screens/IndexComponents/PogsDisplay";
import UserSidebar from "./screens/IndexComponents/UserSidebar";
import LoginPage from "./screens/IndexComponents/LoginPage";

function index() {
  const { user, error, isLoading } = useUser();
  const [allPogs, setAllPogs] = useState<Pog[]>([]);
  const [randomPogs, setRandomPogs] = useState<Pog[]>([]);

  useEffect(() => {
    fetch("http://localhost:6969/api/pogs/read")
      .then((response) => response.json())
      .then((data) => {
        setAllPogs(data);
        const selectedPogs = getRandomPogs(data, 8);
        setRandomPogs(selectedPogs);
      })
      .catch((error) => console.error("Error fetching pogs:", error));
  }, []);

  function getRandomPogs(pogs: Pog[], limit: number): Pog[] {
    const shuffledPogs = pogs.sort(() => 0.5 - Math.random());
    return shuffledPogs.slice(0, limit);
  }

  function handleBuy(pogs_id: number) {}

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-white mb-[420px]">
        <MarqueeCompenent randomPogs={randomPogs} />
        <CarouselSlider />
        <PogsDisplay allPogs={allPogs} handleBuy={handleBuy} />
        <UserSidebar />
      </div>
    );
  }

  return <LoginPage />;
}

export default index;

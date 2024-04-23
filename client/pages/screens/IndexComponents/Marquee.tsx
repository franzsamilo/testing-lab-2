import React from "react";
import Marquee from "react-fast-marquee";
import Pog from "../Components&Constants/Pog";

interface MarqueeComponentInterface {
  randomPogs: Pog[];
}

function MarqueeCompenent(MarqueeComponentProps: MarqueeComponentInterface) {
  const { randomPogs } = MarqueeComponentProps;

  return (
    <Marquee
      speed={30}
      gradient={false}
      className="text-2xl font-bold text-blue-500"
    >
      {randomPogs.map((pog: Pog, index: any) => {
        const displayPercentageChange = pog.price_change
          ? pog.price_change.toFixed(2)
          : "N/A";

        const changeColor =
          pog.price_change > 0 ? "text-green-600" : "text-red-600";

        return (
          <div key={index} className="mr-5 inline-block">
            <div
              className={`max-w-sm overflow-hidden shadow-lg m-4 items-center justify-center rounded-md border-t-4 ${changeColor}`}
            >
              <div className="px-3 py-2 flex flex-row ">
                <p className={` text-lg font-extrabold ${changeColor}`}>
                  {pog.ticker_symbol}
                </p>
                <p className={`ml-2 text-lg font-medium ${changeColor}`}>
                  {pog.price_change > 0 ? "↑ " : "↓ "}
                  {displayPercentageChange}%
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </Marquee>
  );
}

export default MarqueeCompenent;

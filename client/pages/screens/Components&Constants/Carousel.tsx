import React from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function CarouselSlider() {
  return (
    <div>
      <Carousel className="mt-12 absolute left-0 ml-56">
        <div>
          <Image
            className="rounded-lg object-fill"
            src="/numberOne.png"
            alt=""
            width={100}
            height={150}
          />
        </div>
        <div>
          <Image
            className="rounded-lg object-fill"
            src="/numberTwo.png"
            alt=""
            width={100}
            height={150}
          />
        </div>
        <div>
          <Image
            className="rounded-lg object-fill"
            src="/numberThree.png"
            alt=""
            width={160}
            height={150}
          />
        </div>
      </Carousel>
    </div>
  );
}

export default CarouselSlider;

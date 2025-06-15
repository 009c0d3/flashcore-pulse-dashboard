
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { wallets } from "@/data/wallets";
import Icon from "@/components/Icon";

const CoinSliderSection = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Integrated with Your Favorite Wallets
        </h2>
      </div>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {[...wallets, ...wallets].map((wallet, index) => (
            <CarouselItem key={index} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
              <div className="p-1">
                <Card className="flex flex-col items-center justify-center p-6 bg-card/30 hover:bg-card/50 backdrop-blur-sm transition-colors duration-300 h-40">
                  <Icon name={wallet.icon} className={wallet.iconClassName} />
                  <p className="mt-4 font-semibold text-center text-sm">{wallet.name}</p>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default CoinSliderSection;

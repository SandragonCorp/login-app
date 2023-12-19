"use client"

import { useSession } from "next-auth/react";
import { FullContainer } from "../components/_full_container";
import { CAROUSEL_DURATION, CAROUSEL_EFFECTS, Carousel } from "../components/_carousel";
import { CarouselItem } from "../components/_carousel_item";


export default function Home() {
    const { data: session, status } = useSession();

	return (
	<>
		<FullContainer>
			<div className="w-full h-screen">
				<Carousel effect={CAROUSEL_EFFECTS.SLIDE} animationDuration={CAROUSEL_DURATION.HALF_SECOND} isLoop={true}>
					<CarouselItem>
						<div className="w-full h-full pt-32 text-center text-white bg-center bg-no-repeat bg-cover" style={{backgroundImage: `url(/images/home-carousel/1.jpg)`}}>
							<div className="text-9xl"><span className="bg-yellow-400/[.3]">1 Attack On Titan</span></div>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className="w-full h-full pt-32 text-center text-white bg-center bg-no-repeat bg-cover" style={{backgroundImage: `url(/images/home-carousel/2.jpg)`}}>
							<div className="text-9xl"><span className="bg-yellow-400/[.3]">2 Steins;Gate</span></div>
						</div>
					</CarouselItem>
					<CarouselItem>
						<div className="w-full h-full pt-32 text-center text-white bg-center bg-no-repeat bg-cover" style={{backgroundImage: `url(/images/home-carousel/3.png)`}}>
							<div className="text-9xl"><span className="bg-yellow-400/[.3]">3 Fate/Stay Night: Unlimited Blade Works</span></div>
						</div>
					</CarouselItem>
					<CarouselItem className="active">
						<div className="w-full h-full pt-32 text-center text-white bg-center bg-no-repeat bg-cover" style={{backgroundImage: `url(/images/home-carousel/4.jpg)`}}>
							<div className="text-9xl"><span className="bg-yellow-400/[.3]">4 Full Metal Alchemist: Brotherhood</span></div>
						</div>
					</CarouselItem>
				</Carousel>
			</div>
		</FullContainer>
	</>
	)
}

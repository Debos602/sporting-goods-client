import { Card, CardContent } from "../ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import sliderImage1 from "../../assets/images/image-1.jpeg";
import sliderImage2 from "../../assets/images/image-2.jpg";
import sliderImage3 from "../../assets/images/image-3.jpg";
import { Button } from "../ui/button";

const HeroSection = () => {
    const sliderImage = [
        {
            id: 1,
            image: sliderImage1,
        },
        {
            id: 2,
            image: sliderImage2,
        },
        {
            id: 3,
            image: sliderImage3,
        },
    ];

    return (
        <div className="relative w-full h-[596px]">
            <Carousel className="overflow-hidden rounded-lg shadow-lg">
                <CarouselContent className="flex">
                    {sliderImage.map((slider) => (
                        <CarouselItem
                            key={slider.id}
                            className="min-w-full relative"
                        >
                            <Card className="bg-transparent">
                                <CardContent className="flex items-center justify-center h-[596px] p-0">
                                    <img
                                        src={slider?.image}
                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                        alt=""
                                    />
                                    <div className="absolute  inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4">
                                        <h2 className="text-white font-semibold text-4xl mb-4 mt-28">
                                            Buy 1 Get 1, 25% OFF <br />
                                            <span className="uppercase font-bold text-orange-600">
                                                Sports Goods
                                            </span>
                                            !
                                        </h2>
                                        <p className="text-white text-lg mb-6 max-w-96 ">
                                            Grab the best deals on top-quality
                                            sports equipment. Limited time
                                            offer. Don't miss out on our
                                            exclusive sale featuring top-notch
                                            sports equipment at unbeatable
                                            prices!
                                        </p>
                                        <Button className="bg-orange-400 text-white font-semibold hover:bg-white hover:text-amber-600 uppercase  px-4 py-2 rounded-full transition-transform duration-300 hover:scale-105">
                                            Check Products Below
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
                    &#9664;
                </CarouselPrevious>
                <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
                    &#9654;
                </CarouselNext>
            </Carousel>
        </div>
    );
};

export default HeroSection;

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
    
    const sliderImages = [
        {
            id: 1,
            image: sliderImage1,
            title: "Buy 1 Get 1, 25% OFF",
            subtitle: "Sports Goods",
            description:
                "Grab the best deals on top-quality sports equipment. Limited time offer. Don't miss out on our exclusive sale featuring top-notch sports equipment at unbeatable prices!",
        },
        {
            id: 2,
            image: sliderImage2,
            title: "Summer Sale Extravaganza",
            subtitle: "Outdoor Gear",
            description:
                "Experience the thrill of the outdoors with our premium outdoor gear. Dive into summer with unbeatable discounts on all your favorite products!",
        },
        {
            id: 3,
            image: sliderImage3,
            title: "Flash Sale",
            subtitle: "Fitness Equipment",
            description:
                "Upgrade your fitness journey with our cutting-edge equipment. This flash sale won't last long - get fit with fantastic savings today!",
        },
    ];

    return (
        <div className="overflow-hidden h-screen relative z-30" >
            <Carousel>
                <CarouselContent>
                    {sliderImages.map((slider) => (
                        <CarouselItem
                            key={slider.id} 
                            className="min-w-full relative z-50"
                        >
                            <Card className="border-0">
                                <CardContent className="flex items-center justify-center p-0 bg-cover bg-no-repeat h-screen min-w-full relative" style={{ backgroundImage: `url(${slider.image})` }}>
                                   
                                    <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-center p-4 z-10">
                                        <h2 className="text-white font-semibold text-xl md:text-4xl mb-4 mt-28 animate__animated animate__fadeInUp animate__delay-1s">
                                            {slider.title} <br />
                                            <span className="uppercase font-medium text-orange-600 animate__animated animate__fadeInUp animate__delay-1s">
                                                {slider.subtitle}
                                            </span>
                                            !
                                        </h2>
                                        <p className="text-white text-sm md:text-lg mb-6 max-w-xl md:max-w-2xl  animate__animated animate__fadeInUp animate__delay-1s">
                                            {slider.description}
                                        </p>
                                        <Button className="bg-orange-400  text-white font-normal md:font-semibold hover:bg-white hover:text-amber-600 uppercase px-4 py-2 rounded-full transition-transform duration-300 hover:scale-105 animate__animated animate__fadeInUp animate__delay-1s">
                                            Check Products Below
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                       
                </CarouselContent>
                     <CarouselPrevious className="absolute left-5 top-[57%]  text-white bg-black p-2 rounded-full  cursor-pointer transition duration-300 ">
                            &#9664;
                    </CarouselPrevious>
                    <CarouselNext className="absolute right-5 top-[57%] text-white bg-black  p-2 rounded-full cursor-pointer  transition duration-300 ">
                            &#9654;
                    </CarouselNext>
             
            </Carousel>
                 
        </div>
    );
};

export default HeroSection;

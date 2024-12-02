
import image from "../../assets/images/Service image.jpg";

const Service = () => {
    return (
     <div className="bg-amber-200">
           <div className="container mx-auto py-16">
            {/* Section Header */}
           

            {/* Content Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Image Section */}
                <div className="border-2 border-amber-800">
                    <img
                        src={image}
                        className="object-cover w-full"
                        alt="Sporting Goods"
                    />
                </div>

                {/* Text Section */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-2xl font-thin text-amber-950 mb-4">
                       Service
                    </h2>
                    <h2 className="text-2xl md:text-3xl font-bold text-amber-950 mb-4">
                        Explore Premium Sporting Goods
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                        Discover a wide range of high-quality sporting goods
                        designed for both amateur and professional athletes. From
                        durable equipment to innovative accessories, our products
                        are tailored to enhance your performance and bring out the
                        best in your game. Whether you're into team sports,
                        fitness, or outdoor adventures, we have everything you
                        need to stay ahead of the competition.
                    </p>
                </div>
            </div>
        </div>
     </div>
    );
};

export default Service;

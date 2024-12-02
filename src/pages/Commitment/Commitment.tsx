
import image from "../../assets/images/E105TEW0-removebg-preview.png";

const Commitment = () => {
    return (
     <div className="bg-amber-300">
           <div className="container mx-auto py-16">
            {/* Section Header */}
           

            {/* Content Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Image Section */}
               

                {/* Text Section */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-lg font-medium text-amber-950 mb-2 uppercase tracking-wide">
                        Our Commitment
                    </h2>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-amber-950 mb-4">
                        Elevate Your Game 
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                        At the heart of our mission is a dedication to providing exceptional sporting gear for athletes of all levels. Whether you’re honing your skills, pushing limits, or simply enjoying the game, our products are designed to inspire and enhance your performance. Explore equipment crafted for durability, precision, and comfort—because you deserve the best to reach your goals.
                    </p>
                </div>

                <div className="border-2 border-amber-800 bg-white">
                    <img
                        src={image}
                        className="object-cover w-full"
                        alt="Sporting Goods"
                    />
                </div>
            </div>
        </div>
     </div>
    );
};

export default Commitment;

import HeroSection from "@/components/HeroSection/HeroSection";
import FeaturedProduct from "../featuredProduct/FeaturedProduct";
import ContactUs from "../contact/Contact";
import useNav from "@/hooks/UserNav";
import Service from "../Service/Service";
import Review from "../Review/Review";
import Commitment from "../Commitment/Commitment";

const Home = () => {
    useNav("Home");
    return (
        <div className="scroll-smooth focus:scroll-auto">
            <HeroSection />
            <FeaturedProduct />
            <Service />
            <Commitment />
            <Review />
            <ContactUs />
        </div>
    );
};

export default Home;

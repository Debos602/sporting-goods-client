import HeroSection from "@/components/HeroSection/HeroSection";
import FeaturedProduct from "../featuredProduct/FeaturedProduct";
import ContactUs from "../contact/Contact";
import useNav from "@/hooks/UserNav";

const Home = () => {
    useNav("Home");
    return (
        <div className="scroll-smooth focus:scroll-auto">
            <HeroSection />
            <FeaturedProduct />
            <ContactUs />
        </div>
    );
};

export default Home;

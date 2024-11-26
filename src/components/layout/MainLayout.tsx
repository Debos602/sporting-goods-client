import { useEffect, useRef } from "react";
import Footer from "@/pages/Shared/Footer";
import Navbar from "@/pages/Shared/Navbar";
import { Outlet, useLocation } from "react-router-dom"; // useLocation for scroll to top
import Lenis, { LenisOptions } from "@studio-freight/lenis";
import { Toaster } from "sonner";
import "animate.css/animate.css";
import "./MainLayout.css";

const MainLayout = () => {
    const lenisRef = useRef<Lenis | null>(null);
    const { pathname } = useLocation(); // To trigger scroll to top

    useEffect(() => {
        const options: LenisOptions = {
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            gestureOrientation: "vertical",
            infinite: false,
            touchMultiplier: 2,
        };

        const lenis = new Lenis(options);
        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    // Scroll to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0); // Reset scroll position
    }, [pathname]);

    return (
        <>
            <Navbar />

            <main data-lenis>
                <Outlet />
                <Toaster />
            </main>

            <Footer />
        </>
    );
};

export default MainLayout;

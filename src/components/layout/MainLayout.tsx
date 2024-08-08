import { useEffect, useRef } from "react";
import Footer from "@/pages/Shared/Footer";
import Navbar from "@/pages/Shared/Navbar";
import { Outlet } from "react-router-dom";
import Lenis, { LenisOptions } from "@studio-freight/lenis";
// Import the wrapper

import "animate.css/animate.css";
import "./MainLayout.css";
import AnimatedWrapper from "@/wrapper/AnimatedWrapper";

const MainLayout = () => {
    const lenisRef = useRef<Lenis | null>(null);

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

    return (
        <>
            <Navbar />
            <AnimatedWrapper
                animateIn="fadeIn"
                animateOut="fadeOut"
                animateInDuration={800}
                animateOutDuration={800}
            >
                <main data-lenis>
                    <Outlet />
                </main>
            </AnimatedWrapper>
            <Footer />
        </>
    );
};

export default MainLayout;

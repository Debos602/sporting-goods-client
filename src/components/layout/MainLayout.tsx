import { useEffect, useRef } from "react";
import Footer from "@/pages/Shared/Footer";
import Navbar from "@/pages/Shared/Navbar";
import { Outlet } from "react-router-dom";
import Lenis, { LenisOptions } from "@studio-freight/lenis";

import { Toaster } from "sonner";
import "animate.css/animate.css";
import "./MainLayout.css";

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

            <main data-lenis>
                <Outlet />

                <Toaster />
            </main>

            <Footer />
        </>
    );
};

export default MainLayout;

declare module "animate.css-react" {
    import { CSSProperties, ComponentType } from "react";

    // Define the available props for the Animate component
    export interface AnimateProps {
        animateIn?: string;
        animateOut?: string;
        animateInDuration?: number;
        animateOutDuration?: number;
        animateInDelay?: number;
        animateOutDelay?: number;
        initiallyVisible?: boolean;
        className?: string;
        style?: CSSProperties;
        onAnimationStart?: () => void;
        onAnimationEnd?: () => void;
        [key: string]: unknown; // Use unknown instead of any
    }

    const Animate: ComponentType<AnimateProps>;
    export default Animate;
}

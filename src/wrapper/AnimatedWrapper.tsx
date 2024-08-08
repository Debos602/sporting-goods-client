// src/components/AnimatedWrapper.tsx
import React from "react";
import Animate, { AnimateProps } from "animate.css-react";

interface AnimatedWrapperProps extends AnimateProps {
    children: React.ReactNode;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
    children,
    ...props
}) => {
    return <Animate {...props}>{children}</Animate>;
};

export default AnimatedWrapper;

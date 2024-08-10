declare module "react-rating" {
    import * as React from "react";

    type RatingSymbol = React.ReactNode | React.ReactNode[];

    interface ReactRatingProps {
        initialRating?: number;
        readonly?: boolean;
        emptySymbol?: RatingSymbol;
        fullSymbol?: RatingSymbol;
        placeholderSymbol?: RatingSymbol;
        fractions?: number;
        stop?: number;
        start?: number;
        step?: number;
        quiet?: boolean;
        direction?: "rtl" | "ltr";
        onChange?: (rate: number) => void;
        onHover?: (rate: number, index?: number) => void;
    }

    interface RatingComponent extends React.FC<ReactRatingProps> {
        clear: () => void;
    }

    const Rating: RatingComponent;

    export default Rating;
}

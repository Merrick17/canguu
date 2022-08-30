import {Heading} from "@chakra-ui/react";

export type HeadLineType = {
    title: string;
    size?: "4xl" | "3xl" | "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
    noOfLines?: number;
};

const HeadLine = ({title, size = "2xl", noOfLines = 1}: HeadLineType) => {
    return (
        <Heading size={size} noOfLines={noOfLines}>
            {title}
        </Heading>
    );
};

export default HeadLine;

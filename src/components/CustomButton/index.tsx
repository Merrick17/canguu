import React from "react";
import {Button, ButtonProps} from "@chakra-ui/react";

export type ButtonType = {
    text: string;
    onClick: () => void;
    color?: string; // add more if needed
    textColor?: string; // add more if needed
    variant?: "outline" | "solid"; // add more if needed
    loadingText?: string;
    isLoading?: boolean;
    options?: Partial<ButtonProps>,
};

const CustomButton = ({
                          isLoading = false,
                          color = "red",
                          textColor = "#fff",
                          loadingText = "Submitting",
                          variant = "solid",
                          text,
                          onClick,
                          options
                      }: ButtonType) => {
    return (
        <Button
            pr={"2.4rem"}
            pl={"2.4rem"}
            borderRadius={"2xl"}
            isLoading={isLoading}
            loadingText={loadingText}
            color={textColor}
            bg={color}
            variant={variant}
            onClick={onClick}
            _hover={{bg: "#333"}}
            {...options}
        >
            {text}
        </Button>
    )

};


export default CustomButton;

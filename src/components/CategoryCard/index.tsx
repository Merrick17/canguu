import {Badge, Box, Center, HStack, Image} from "@chakra-ui/react";
import React from "react";
import CustomButton from "../CustomButton";

export type CategoryType = {
    title: string,
    description: string,
    icon: string,
    link: string
}

const CategoryCard = (props: CategoryType) => {
    return (
        <Box
            shadow={"lg"}
            maxW="sm"
            borderWidth="1px"
            borderRadius="3xl"
            overflow="hidden"
            p={"8"}
        >
            <HStack>
                <Badge p={2} borderRadius={"lg"} bg={"rgba(47, 128, 237, 0.2)"}>
                    <Image src={props.icon}/>
                </Badge>
                <Box
                    ml="1"
                    fontWeight="600"
                    fontSize={"2xl"}
                    lineHeight="tight"
                    noOfLines={1}
                >
                    {props.title}
                </Box>
            </HStack>
            <Box
                display="flex"
                mt="1"
                noOfLines={2}
                fontSize={"sm"}
                fontWeight={"400"}
                maxW={"68%"}
                color={"text.200"}
                alignItems="center"
            >
                {props.description}
            </Box>

            <Box mt={4}>
                <Center flex={1}>
                    <CustomButton
                        text={"Explore more"}
                        options={{
                            boxShadow: "base",
                            _hover: {
                                bg: "rgba(33, 150, 83, 0.8)",
                                color: "#fff",
                            },
                        }}
                        textColor={"#219653"}
                        color={"rgba(33, 150, 83, 0.2)"}
                        onClick={() => {
                        }}
                    />
                </Center>
            </Box>
        </Box>
    );
};

export default CategoryCard;

import {Flex, Text} from "@chakra-ui/react";
import Link from "next/link";
import {useRouter} from "next/router";
import {menuItemType} from "../../constants/menu";

const MenuItem: any = (props: menuItemType) => {
    const router = useRouter();
    const isActive = router.asPath === props.url;
    let Icon = () => props.icon(isActive);
    return (
        <Link href={props.url}>
            <Flex
                shadow={isActive ? "base" : "none"}
                cursor={"pointer"}
                bg={isActive ? "brand.900" : "transparent"}
                alignItems={"center"}
                minW={180}
                py={"0.48rem"}
                pl={"1rem"}
                borderRadius={8}
                _hover={
                    isActive
                        ? {}
                        : {
                            background: "#F0EAE088",
                        }
                }
            >
                <Icon/>
                <Text
                    color={isActive ? "brand.200" : "#000"}
                    ml={"0.6rem"}
                    size={"1.4rem"}
                    fontWeight={"600"}
                >
                    {props.name}
                </Text>
            </Flex>
        </Link>
    );
};

export default MenuItem;

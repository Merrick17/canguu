import {Heading} from "@chakra-ui/react"
import Link from "next/link"
import {FC} from "react";

const Logo: FC = () => {
    return (
        <Link href={"/home"}>
            <a>
                <Heading cursor={"pointer"} size={"md"} color={"brand.200"}>
                    Canggu Properti
                </Heading>
            </a>
        </Link>
    )
};

export default Logo;
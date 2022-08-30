import {globalToast} from "../pages/_app";

type TToast = {
    message: string;
    type: "success" | "error" | "warning" | "info";
};
export const CustomToast = ({message, type}: TToast) => {
    globalToast({
        title: `${message}`,
        status: type,
        isClosable: true,
    });
};


import {
    AiOutlineHome,
    AiOutlineLogout,
    AiOutlineQuestionCircle,
    AiOutlineSetting,
    AiOutlineSliders,
    AiOutlineSwap,
    AiOutlineUser
} from "react-icons/ai";

export type menuItemType = {
    name: string,
    url: string,
    icon: (isActive: boolean) => JSX.Element;
};

const menuTop: menuItemType[] = [
    {
        name: "Home",
        url: '/home',
        icon: (isActive: boolean) => <AiOutlineHome  size={"1.2rem"} color={isActive ? '#D4AF73' : '#000'}/>
    },
    {
        name: "Markets",
        url: '/marketplace',
        icon: (isActive: boolean) => <AiOutlineSliders  size={"1.2rem"} color={isActive ? '#D4AF73' : '#000'}/>
    },
    {
        name: "Transactions",
        url: '/transactions',
        icon: (isActive: boolean) => <AiOutlineSwap  size={"1.2rem"} color={isActive ? '#D4AF73' : '#000'}/>
    },
    {
        name: "Wallet",
        url: '/wallet',
        icon: (isActive: boolean) => <AiOutlineUser  size={"1.2rem"} color={isActive ? '#D4AF73' : '#000'}/>
    },
    {
        name: "Setting",
        url: '/setting',
        icon: (isActive: boolean) => <AiOutlineSetting  size={"1.2rem"} color={isActive ? '#D4AF73' : '#000'}/>
    },
];


const menuBottom = [
    {
        name: "Help",
        url: '/home/help',
        icon: (isActive: boolean) => <AiOutlineQuestionCircle size={"1.2rem"} color={isActive ? 'brand.200' : '#000'}/>
    },
    {
        name: "Log Out",
        url: '/home/logout',
        icon: (isActive: boolean) => <AiOutlineLogout size={"1.2rem"} color={isActive ? 'brand.200' : '#000'}/>
    },
];


export {menuTop, menuBottom}
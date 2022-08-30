import {useSettingState} from "../../store/setting";
import {Input, InputGroup, InputRightElement} from "@chakra-ui/input";
import {
    AiOutlineSearch,
} from "react-icons/ai";

const SearchBar = () => {
    const search = useSettingState(state => state.search);
    const onChange = useSettingState(state => state.onSearchChange);


    return (
        <InputGroup size={"md"} maxW={'32rem'}>
            <InputRightElement
                pointerEvents='none'
                children={<AiOutlineSearch color='gray.300'/>}
            />
            <Input
                borderWidth={2}
                borderRadius={"full"}
                value={search}
                onChange={(e) => onChange(e.target.value)}
                type='search' placeholder='Search...'/>
        </InputGroup>
    );
};

export default SearchBar;
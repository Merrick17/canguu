import CategoryCard from "../../components/CategoryCard";

const nft = {
    name: "loreaez ermùezlrùz",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    price: "120.5",
    owner: "56464674qs98dq7d98s7d9",
    nft: "https://bit.ly/2Z4KKcF",
};

const Test = () => {
    return (
        <>
            {/*<NftCard nft={nft}/>*/}
            <CategoryCard icon={"/assets/vector.png"} title={"Deals"} link={"/hi-there"}
                          description={"Lorem eepmmkdf dfksdflmsdf dsfsf"}/>
        </>
    );
};


export default Test
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

type CarouselCustomProps = {
    images: string[],
    className?: string
}

const CarouselCustom = ({className, images}: CarouselCustomProps) => {
    return (
        <Carousel
            className={className}
            dynamicHeight={true}
            showIndicators={false}
            showThumbs={false}
        >
            {images.map((it, i) => {
                return (
                    <div key={"carousel-" + i}>
                        <img src={it}/>
                    </div>
                )
            })}
        </Carousel>
    )
};


export default CarouselCustom;
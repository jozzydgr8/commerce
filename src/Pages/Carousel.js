
export const Carousel = ()=>{
    return (
        <>
            <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel" >
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner header-carousel">
                <div className="carousel-item active header-carousel-item1"data-bs-interval="8000">
                <img src="..." className="d-block w-100" alt="..."/>
                hello
                </div>
                <div className="carousel-item header-carousel-item2"data-bs-interval="3000">
                <img src="..." className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item header-carousel-item3"data-bs-interval="3000">
                <img src="..." className="d-block w-100" alt="..."/>
                </div>
            </div>
            </div>
        </>
    )
}
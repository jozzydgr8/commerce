
export const Carousel = ()=>{
    return (
        <>
            <div id="carouselExampleIndicators" className="carousel slide " data-bs-ride="carousel" >
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner header-carousel">
                <div className="carousel-item header-carousel-item1 active"data-bs-interval="8000">
                    <div className='container-fluid row backdrop'>
                        <div className="col-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida felis eget nisl mollis,
                        molestie posuere ante bibendum. Suspendisse gravida fermentum ipsum at vestibulum
                        . Integer non eros odio. Curabitur euismod mauris at orci porttitor, vitae rhoncus ante vulputate.
                        </div>

                        <div className="col-6">

                                <div>
                                    <em className="sacramento">everything slick and cool</em>
                                </div>
                                <div >
                                    <button className="full-btn">shop now</button>
                                </div>
                            
                        </div>
                    </div> 
                </div>
                <div className="carousel-item header-carousel-item2"data-bs-interval="3000">
                <div className='container-fluid row backdrop'>
                        <div className="col-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida felis eget nisl mollis,
                        molestie posuere ante bibendum. Suspendisse gravida fermentum ipsum at vestibulum
                        . Integer non eros odio. Curabitur euismod mauris at orci porttitor, vitae rhoncus ante vulputate.
                        </div>

                        <div className="col-6">

                                <div>
                                    <em className="sacramento">everything slick and cool</em>
                                </div>
                                <div >
                                    <button className="full-btn">shop now</button>
                                </div>
                            
                        </div>
                    </div>
                </div>
                <div className="carousel-item header-carousel-item3"data-bs-interval="3000">
                <div className='container-fluid row backdrop'>
                        <div className="col-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut gravida felis eget nisl mollis,
                        molestie posuere ante bibendum. Suspendisse gravida fermentum ipsum at vestibulum
                        . Integer non eros odio. Curabitur euismod mauris at orci porttitor, vitae rhoncus ante vulputate.
                        </div>

                        <div className="col-6">

                                <div>
                                    <em className="sacramento">everything slick and cool</em>
                                </div>
                                <div >
                                    <button className="full-btn">shop now</button>
                                </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>


    )
}


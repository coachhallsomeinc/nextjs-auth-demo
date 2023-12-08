import React from 'react'
import Image from 'next/image'
import styles from '@/styles/global.module.css';

function CarouselHomepage() {
  return (
    <div className='container'>
        <div className='row'>
            <div className='col-12'>
                <div id="carouselExampleCaptions" className="carousel slide m-5">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div id={styles.carouselinner} className="carousel-inner border rounded-5 shadow">
                        <div className="carousel-item active">
                        <Image id={styles.carouselimage} src="/img/carousel-1-doctor.jpg" className="d-block w-100" height={300} width={300} alt="..." />
                        </div>
                        <div className="carousel-item">
                        <Image id={styles.carouselimage} src="/img/carousel-2-calendar.jpg" className="d-block w-100" height={300} width={300} alt="..." />
                        </div>
                        <div className="carousel-item">
                        <Image id={styles.carouselimage} src="/img/carousel-3-medicine.jpg" className="d-block w-100" height={300} width={300} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CarouselHomepage
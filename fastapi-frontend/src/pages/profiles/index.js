import React from 'react'
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
import styles from '@/styles/global.module.css';

function ProfilesPage() {
  return (
    <>
    <div id={styles.page}>
    <div className='container my-5'>
      <div className='row'>
        <Navbar />
      </div>
      <div className='row mt-5'>
        <div className='col'>
          <div>
            <div className="accordion mt-5" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Parent's Name Here
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
                    <div className="accordion-body">
                        Parent Profile Information here
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        Child 1 Name here
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                    <div className="accordion-body">
                        Child 1 profile information here
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                        Child 2 profile (if a child 2 exists)
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                    <div className="accordion-body">
                        Child 2 profile information here
                    </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default ProfilesPage
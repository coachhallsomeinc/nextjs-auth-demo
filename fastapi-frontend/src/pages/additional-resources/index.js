import Navbar from "@/components/navbar";
import React from "react";
import Footer from "@/components/Footer";
import styles from "@/styles/global.module.css";

function additionalResources() {
  return (
    <div className="d-flex flex-col">
      <div id={styles.page} className="flex-grow-1">
        <div className="container">
          <div className="row">
            <Navbar />
          </div>
        </div>
        <div className="container py-5"></div>
        <div className="container mt-5 min-vh-100">
          <div
            id={styles.componentcolor}
            className="col-md-12 text-center border rounded-5 shadow"
          >
            <div className="ms-4">
              <h1 className="m-4">Additional Resources</h1>
              <ul>
                <li className="mt-2">
                  Poison Control Center: Hotline: 1-800-222-1222 (USA)
                </li>
                <li className="mt-2">
                  National Suicide Prevention Lifeline: Hotline 1-800-273-TALK
                  (1-800-273-8255) (USA)
                </li>
                <li className="mt-2">
                  Childhelp National Child Abuse Hotline: Hotline
                  1-800-4-A-CHILD (1-800-422-4453) (USA)
                </li>
                <li className="mt-2">
                  National Domestic Violence Hotline: Hotline 1-800-799-SAFE
                  (1-800-799-7233) (USA)
                </li>
                <li className="mt-2">
                  Substance Abuse and Mental Health Services Administration
                  (SAMHSA) National Helpline: Hotline 1-800-662-HELP
                  (1-800-662-4357) (USA)
                </li>
                <li className="mt-2">
                  National Eating Disorders Association (NEDA) Helpline: Hotline
                  1-800-931-2237 (USA)
                </li>
                <li className="mt-2">
                  National Alliance on Mental Illness (NAMI) Helpline: Helpline
                  1-800-950-NAMI (1-800-950-6264) (USA)
                </li>
                <li className="mt-2">
                  National Runaway Safeline: Hotline 1-800-RUNAWAY
                  (1-800-786-2929) (USA)
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default additionalResources;

import React,{useEffect} from "react";
import "../Styles/Home.css";

const Header = () => {
  useEffect(() => {
    // Add class to the body when the component mounts
    document.body.classList.add('home-page');

    // Remove class when the component unmounts
    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);
  return (
    <div>
      <div className="header">
        <div className="sides"></div>
        <div className="info">
          <h1>Sarvodayam Vhss, Aryampadam</h1>
          <div className="meta">
            <br />
          </div>
        </div>
      </div>
      <section className="content">
        <p>
        Sarvodayam Vocational Higher Secondary School, Aryampadam was established in 1955 by Peeyar Mundathicode, a poet.  Although Sarvodayam was initially a UP School, it was upgraded to a High School in 1983 and a Vocational Higher Secondary School in 2000.  Along with a good pass percentage, Sarvodayam also excels in extra-curricular activities.  Also, units like ATL (Atal Tinkering Lab), JRC (Junior Red Cross), NSS (National Service Scheme), SPC (Student Police Cadet), Little Kites, Scouts & Guides add to the education.
        </p>
      </section>
    </div>
  );
};

export default Header;

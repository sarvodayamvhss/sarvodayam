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
      <div class="header">
        <div class="sides"></div>
        <div class="info">
          <h1>Sarvodayam Vhss, Aryampadam</h1>
          <div class="meta">
            <br />
          </div>
        </div>
      </div>
      <section class="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisl
          turpis, porttitor et finibus id, viverra a metus. Praesent non ante
          sed orci posuere varius quis sit amet dui. Cras molestie magna orci,
          id gravida dolor molestie in. Duis sollicitudin turpis quis tortor
          egestas, ut ultrices nisl elementum. Vestibulum sed ipsum eget nulla
          laoreet cursus in ac sem. Integer a suscipit justo, quis aliquam
          sapien. Maecenas et tellus nibh. Vivamus tincidunt eros id commodo
          pellentesque.
        </p>
      </section>
    </div>
  );
};

export default Header;

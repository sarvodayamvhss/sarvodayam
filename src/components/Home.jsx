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
        1955 ൽ കവിയായിരുന്ന പീയാർ മുണ്ടത്തിക്കോടാണ് സർവ്വോദയം വൊക്കേഷണൽ ഹയർ സെക്കൻ്ററി സ്കൂൾ, 
        ആര്യംപാടത്ത് സ്ഥാപിച്ചത്.  തുടക്കത്തിൽ  സർവ്വോദയം U P സ്കൂളായിരുന്നുവെങ്കിലും, 1983 ൽ ഹൈ സ്കൂളായും, 
        2000-ൽ വൊക്കേഷണൽ ഹയർ സെക്കൻ്ററി സ്കൂളായും ഉയർത്തപ്പെട്ടു. നല്ല വിജയശതമാനത്തോടൊപ്പം, 
        പാഠ്യേതര പ്രവർത്തനങ്ങളിലും സർവ്വോദയം മികവു പുലർത്തുന്നു.  കൂടാതെ, ATL (Atal Tinkering Lab) , 
        JRC (Junior Red Cross) , NSS ( National Service Scheme), SPC (Student Police Cadet), Little Kites, Scouts & Guides
         തുടങ്ങിയ യൂണിറ്റുകൾ സർവ്വോദയത്തിന് മാറ്റു കൂട്ടുന്നു.
        </p>
      </section>
    </div>
  );
};

export default Header;

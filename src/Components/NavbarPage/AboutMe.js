import React from 'react';
import AboutPic from '../../Assets/AboutPic.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import NavbarPage from '../../Layouts/NavbarPage';
import '../Style/Aboutme.css';  

const About = () => {
    return (
        <>
            <NavbarPage />
            <div className="grey-background">
                <div>
                    <h1 style={{ color: "orange",fontSize:"70px" }}>About Me</h1>
                </div>
                <img src={AboutPic} alt="my Profile pic" className="aboutimg" />
                <p className="loremstyle">
              <p style={{fontSize:"20px"}}><b>Email:</b> <br />
              <span>mrymahmdyan712@gmail.com</span>
              </p>
              <p style={{fontSize:"20px"}}><b>Role:</b>
              <p>Lead Designer :<br/> Mr HassanPour <br/>Performed By:<br/> Maryam Ahmadiyan</p>
              </p>
              <p style={{fontSize:"20px"}}><b>Phone For Questions:</b>
                <p>09114755524</p>

              </p>
                </p>
            </div>
        </>
    );
}

export default About;



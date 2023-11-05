import { useState } from "react";
import "./Login.css";
import "./forgot.css";
import Navbar from "../Navbar/Navbar";
import { auth } from "../firebaseAuth/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import darkbg4 from '../../images/darkBg4.jpg'
import Tilt from "react-parallax-tilt";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Prompt messaage has been sent successfully to the user");
        alert('An Email has been sent to your mail!')
        navigate("/login");
      })
      .catch(() => {
        console.log("Error in resetting");
      });
  };

  return (
    <div className="mt-4">
      <Navbar />

      <div className="login-container login-container-custom" style={{background:`url(${darkbg4})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-12"></div>
            <Tilt  tiltMaxAngleX={4}  
        tiltMaxAngleY={4} perspective={1000}  
      //  style={{position:'absolute'}}
        > 
         <div className='tiltComponent'> 
            <div className="col my-5">
              <div
                className="card p-5 auth-card content-container"
              >
                <div className="card-body custom-card-body">
                  <center>
                    <h5 className="card-title card-title-custom mb-5 text-white" >
                      RESET PASSWORD
                    </h5>
                  </center>
                  <form>
                    <div className="mb-3 input-container">
                      <label
                        for="exampleInputEmail1"
                        className="form-label"
                      ></label>
                      <input
                        type="email"
                        className="form-control text-white white-text"
                        id="exampleInputEmail1"
                        placeholder="Enter Email"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          borderBottom: '2px solid #fff' ,
                          outline:'none'
                         
                        }}
                      ></input>
                    </div>
                  </form>
                  <div className="mb-3 d-flex align-items-center justify-content-between">
                    <button
                      type="button"
                      className="btn m-2 glow-on-hover"
                      onClick={handleSubmit}
                      // style={{ color: "white" }}
                    >
                      Submit
                    </button>
                    <div className="mb-3">
                      <a
                        href="/register"
                        className="text-muted text-decoration-none"
                      >
                        <p style={{ color: "white", paddingTop: "20px" }}>
                          {" "}
                          New User? Signup
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12"></div>
            </div>
            </Tilt>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

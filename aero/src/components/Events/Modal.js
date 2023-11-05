import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCalendar2DateFill } from "react-icons/bs";
import { AiFillTrophy } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillTelephoneFill } from "react-icons/bs";
import "./Modal.css"
import { Zoom } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../firebaseAuth/authContext";
import axios from "axios";
import darkbg5 from '../../images/shady.jpg';
import A from '../../images/arrow.png'
import {
    collection,
    doc,
    getDoc,
    getFirestore,
    onSnapshot,
    setDoc,
  } from "firebase/firestore";
  import { auth } from "../firebaseAuth/auth";

const Modal = ({ data, closeModal }) => {
  

  const hideAlert = () => {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
  }

  const showAlert = (type, msg) => {
      hideAlert();
      const markup = `<div class="alert alert--${type}">${msg}</div>`;
      document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
      setTimeout(hideAlert, 3000);
  }

  const navigate = useNavigate();
  const { userid, currentUser } = useAuth();
  const [drop, setDrop] = useState(false);
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(1);

  const [team, setTeam] = useState({
    "Member 1": "",
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const teamDetailsRef = useRef(null);
  const handleRegister = async () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      if (data.subtype == "solo") {
        try {
          console.log(currentUser);
        } catch (error) {
          console.error("Error creating order:", error);
        }
        
      } else {
        setDrop(true);
        // setVisible(false);
        // teamDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (teamDetailsRef.current) {
            teamDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
          } else {
            console.error('Team Details section is not rendered yet');
          }
        }, 0);
      }
    }
  };

  const handlewhilepay = async () => {
    try {
      // Create an order for Razorpay payment
      const orderResponse = await axios.post(`http://localhost:3000/api/create/orderid`, {
        name: data.name, userId:userid,
      });
      console.log(data.name);

      if (orderResponse.data && orderResponse.data.id) {
        // Initialize Razorpay
        const options = {
          key: "rzp_live_kDqZUwqGe9Q48L", // Replace with your Razorpay key
          amount: 100,
          currency: "INR",
          name: "Aerophilia 2023",
          description: "Event Registration",
          order_id: orderResponse.data.id,
          handler: async function (response) {
            const paymentData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: userid, // Replace with the user's ID
              eventName: data.name, // Replace with the event name
              teamMembers: team,
            };

            // Verify the payment with your backend
            const verifyResponse = await axios.post(`http://localhost:3000/api/payment/verify`, paymentData);

            if (verifyResponse.data && verifyResponse.data.success) {
              // Payment was successful
              setPaymentSuccess(true);
              alert("Online payment")
            } else {
              // Handle payment verification failure
            }
          },
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      } else {
        // Handle order creation failure
      }
    } catch (error) {
      // Handle any errors that occur during payment initiation
      console.error("Error creating order or processing payment:", error);
    }
  };

  
    const handlewhilenotpay = async () => {
      try {
        // Prepare the payment data
        const paymentData = {
          userId: userid,
          eventName: data.name,
          teamMembers: team,
           // Indicate that it's an offline payment
        };
  
        // Make a POST request to the /payment/offline route
        const response = await axios.post("http://localhost:3000/api/payment/offline", paymentData);
  
        if (response.data && response.data.success) {
          // Payment was successful
          // You can show a success message or perform any other actions
          alert("Offline registration successful!");
        } else {
          // Handle payment verification failure
          // You can show an error message or perform other error handling actions
          alert("Offline payment verification failed.");
        }
      } catch (error) {
        console.error("Error processing offline payment:", error);
        // Handle any errors that occur during the payment process
        alert("Error processing offline payment.");
      }
    };
    const handleChange = (e) => {
      setTeam({
        ...team,
        [e.target.name]: e.target.value,
      });
    };
  
    const increaseCount = (e) => {
      setTeam({
        ...team,
        [`Member ${count + 1}`]: "",
      });
      setCount(count + 1);
    };
    const decreaseCount = (e) => {
      const newTeam = team;
      if (count > 1) {
        delete newTeam[`Member ${count}`];
        setTeam(newTeam);
        setCount(count - 1);
      }
    };

  
    

  return (
    <>
      <Zoom className=" overlay w-100 h-100 position-fixed" duration={500} >
        <div className="modal-container  mt-5" style={{ backgroundImage:`url(${darkbg5})`,backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', maxWidth: '100%' }}>
                
                <AiOutlineClose
                onClick={() => closeModal(false)}
                className="close "
              />
             
          <div className="modal-content ">
            <div>
              <div id="head" className="border p-1 text-center">
              <h5 className="fs-3">{data.name}</h5>
                <div>
                  <AiOutlineClose
                    onClick={() => closeModal(false)}
                    className="closeres"
                  />
                </div>
              </div>
              <div className="mt-3">
              
                <div>
                  <img src={data.image} className="img" alt="" style={{height:'160px', width:'200px'}}/>
                </div>

                <div className="quick-info ">
                  <div>
                    <AiFillTrophy /> <h2 >{data.prize}</h2>
                  </div>
                  <div>
                    <BsCalendar2DateFill/> <h2> {data.date}</h2>
                  </div>
                </div>
                <div className="contact-info">
                  <h2>ORGANIZER DETAILS:</h2>

                  {data.contactDetails.map((e, i) => (
                    <div key={i} className="organizer border p-2 mt-3">
                      <div className="fs-6">
                        <BsFillPersonFill /> <span>{e.name}</span>
                      </div>
                      <div className="tele">
                        <BsFillTelephoneFill />{" "}
                        <span>
                          <a href={`tel:${e.phoneNumber}`} className="text-decoration-none fs-6 text-white">{e.phoneNumber}</a>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-relative p-4">
            

              <div className="mt-2">
                <h5>DESCRIPTION:</h5>
                <p>{data.desc}</p>
              </div>
              {data.rules && (
                <div className="">
                  <h5>RULES:</h5>
                  <p>
                    <ul>
                      {data.rules.map((value, index) => (
                        <li key={index} className="fs-5">{value}</li>
                      ))}
                    </ul>
                  </p>
                </div>
              )}
              {data.registrations && (
                <div className="">
                  <h5>REGISTRATION DETAILS:</h5>
                  <p className=" ">
                    <ul>
                      {data.registrations.map((value, index) => (
                        <li key={index} className="fs-5">{value}</li>
                      ))}
                    </ul>
                  </p>
                </div>
              )}
              {data.judgingCriteria && (
                <div className="">
                  <h5>JUDGING CRITERIA:</h5>
                  <p className="   ">
                    <ul className=" ">
                      {data.judgingCriteria.map((value, index) => (
                        <li key={index} className="fs-5">{value}</li>
                      ))}
                    </ul>
                  </p>
                </div>
              )}

              {data.format && (
                <div>
                  <h5>FORMAT:</h5>
                  {Object.keys(data.format).map((key, index) => {
                    return (
                      <div key={index} className="round">
                        {key && <h4 className="fs-5">{key}</h4>}
                        <p>
                          <ul>
                            {data.format[key].map((value, index) => (
                              <li key={index} className="fs-5">{value}</li>
                            ))}
                          </ul>
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {data.teamReq && (
                <div className="">
                  <h5>TEAM REQUIREMENTS:</h5>
                  <p className="   ">
                    <ul className=" ">
                      {data.teamReq.map((value, index) => (
                        <li key={index} className="fs-5">{value}</li>
                      ))}
                    </ul>
                  </p>
                </div>
              )}
              <div className="note ">
                <p className="display-6  p-1">
                  <span>NOTE:</span> Rules are subjected to changes.
                </p>
              </div>
              <div className="buttons">
                <div>
                  <a href={data.link}>
                  <button className="btn btn-primary fs-6 "><span>Download Rulebook</span></button>
                  </a>
                </div>
                <div>
                  {data.mode == "online" && visible && (
                    <button className="btn btn-primary fs-6 " onClick={handleRegister}>
                      <span>Register</span>
                    </button>
                  )}
                  {/* {data.mode == "online" && !visible && (
                    <img src={A} alt="Description of the image" style={{ width: '50px', height: '50px' }} />
                  )} */}
                </div>
              </div>
              {drop && (
                <React.Fragment>
                  <div  ref={teamDetailsRef} className="drop-container">
                    <h1
                      className="drop-head"
                      style={{ color: "rgba(250, 163, 76, 0.982)" }}
                    >
                      TEAM DETAILS
                    </h1>
                    <form className="sign-form">
                      {/* <input type="text" name="teamName" className="input-field" placeholder="Team Name" required onChange={(e)=>handleChange(e)}/> */}

                      {Object.keys(team).map((key, index) => {
                        return (
                          <div className="input-container " >
                          <input
                            type="text"
                            key={key}
                            name={key}
                            className="input-field text-white white-text border p-2 m-2"
                            placeholder={`Member ${index + 1}`}
                            required
                            onChange={handleChange}
                            style={{
                              backgroundColor: 'transparent',
                            }}
                          />
                          </div> 
                        );
                      })}
                    </form>
                    <div className="button-list">
                      {count < data.maxlimit ? (
                        <button
                          className="glow-on-hover p-2 fs-4" style={{width: '15rem'}}
                          onClick={(e) => increaseCount(e)}
                        >
                          Add Member
                        </button>
                      ) : (
                        <button className="glow-on-hover p-2 fs-4">Max limit reached</button>
                      )}
                      <button
                        className="glow-on-hover p-2 fs-4" style={{width: '15rem'}}
                        onClick={(e) => decreaseCount(e)}
                      >
                        Remove Member
                      </button>
                      <button
                        className="glow-on-hover p-2 fs-4" style={{width: '15rem'}}
                        id="rzp-button1"
                        onClick={handlewhilepay }
                       
                      >
                      Pay Online
                      </button>
                      <button
                        className="glow-on-hover p-2 fs-4" style={{width: '15rem'}}
                        id="rzp-button1"
                        onClick={handlewhilenotpay }
                       
                      >
                      Pay Offline
                      </button>
                      {console.log(count)}
                    </div>
                  </div>
                  <div ></div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </Zoom>
    </>
  );
};

export default Modal;
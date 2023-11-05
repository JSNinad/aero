// import React, { useRef, useState } from "react";
// import { AiOutlineClose } from "react-icons/ai";
// import { BsCalendar2DateFill } from "react-icons/bs";
// import { AiFillTrophy } from "react-icons/ai";
// import { BsFillPersonFill } from "react-icons/bs";
// import { BsFillTelephoneFill } from "react-icons/bs";
// import "./Modal.css"
// import { Zoom } from "react-awesome-reveal";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useAuth } from "../firebaseAuth/authContext";
// import axios from "axios";
// import logo from "./aeroLogo.png"
// import {
//     collection,
//     doc,
//     getDoc,
//     getFirestore,
//     onSnapshot,
//     setDoc,
//   } from "firebase/firestore";
//   import { auth } from "../firebaseAuth/auth";

// const Modal = ({ data, closeModal }) => {
  
  
//   return (
//     <div className="overlay">
//       <Zoom className="zoom-out" duration={500}>
//         <div className="modal-container ">
//           <div className="modal-content">
//             <div className="modal-fixed">
//               <div id="head">
//                 <h5>{data.name}</h5>
//                 <div>
//                   <AiOutlineClose
//                     onClick={() => closeModal(false)}
//                     className="closeres"
//                   />
//                 </div>
//               </div>
//               <div className="info">
//                 <div>
//                   <img src={data.image} className="img" alt="" />
//                 </div>

//                 <div className="quick-info">
//                   <div>
//                     <AiFillTrophy /> <h2>{data.prize}</h2>
//                   </div>
//                   <div>
//                     <BsCalendar2DateFill /> <h2> {data.date}</h2>
//                   </div>
//                 </div>
//                 <div className="contact-info">
//                   <h2>ORGANIZER DETAILS:</h2>

//                   {data.contactDetails.map((e, i) => (
//                     <div key={i} className="organizer">
//                       <div>
//                         <BsFillPersonFill /> <span>{e.name}</span>
//                       </div>
//                       <br></br>
//                       <div className="tele">
//                         <BsFillTelephoneFill />{" "}
//                         <span>
//                           <a href={`tel:${e.phoneNumber}`} className="text-decoration-none"
//                           style={{color:"white"}}>{e.phoneNumber}</a>
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="modal-relative">
//               <AiOutlineClose
//                 onClick={() => closeModal(false)}
//                 className="close"
//               />

//               <div>
//                 <h5>DESCRIPTION:</h5>
//                 <p>{data.desc}</p>
//               </div>
//               {data.rules && (
//                 <div className="">
//                   <h5>RULES:</h5>
//                   <p className=" ">
//                     <ul>
//                       {data.rules.map((value, index) => (
//                         <li key={index}>{value}</li>
//                       ))}
//                     </ul>
//                   </p>
//                 </div>
//               )}
//               {data.registrations && (
//                 <div className="">
//                   <h5>REGISTRATION DETAILS:</h5>
//                   <p className=" ">
//                     <ul>
//                       {data.registrations.map((value, index) => (
//                         <li key={index}>{value}</li>
//                       ))}
//                     </ul>
//                   </p>
//                 </div>
//               )}
//               {data.judgingCriteria && (
//                 <div className="">
//                   <h5>JUDGING CRITERIA:</h5>
//                   <p className="   ">
//                     <ul className=" ">
//                       {data.judgingCriteria.map((value, index) => (
//                         <li key={index}>{value}</li>
//                       ))}
//                     </ul>
//                   </p>
//                 </div>
//               )}

//               {data.format && (
//                 <div>
//                   <h5>FORMAT:</h5>
//                   {Object.keys(data.format).map((key, index) => {
//                     return (
//                       <div key={index} className="round">
//                         {key && <h4>{key}</h4>}
//                         <p>
//                           <ul>
//                             {data.format[key].map((value, index) => (
//                               <li key={index}>{value}</li>
//                             ))}
//                           </ul>
//                         </p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}

//               {data.teamReq && (
//                 <div className="">
//                   <h5>TEAM REQUIREMENTS:</h5>
//                   <p className="   ">
//                     <ul className=" ">
//                       {data.teamReq.map((value, index) => (
//                         <li key={index}>{value}</li>
//                       ))}
//                     </ul>
//                   </p>
//                 </div>
//               )}
//               <div className="note">
//                 <p>
//                   <span>NOTE:</span> Rules are subjected to changes.
//                 </p>
//               </div>
//               <div className="buttons">
//                 <div>
//                   <a href={data.link}>
//                     <button className="glow-on-hover p-2">Download Rulebook</button>
//                   </a>
//                 </div>
//                 <div>
//                   {data.mode == "online" && visible && (
//                     <button className="button-62 glow-on-hover p-2" onClick={handleRegister}>
//                       Click to register
//                     </button>
//                   )}
//                 </div>
//               </div>
//               {drop && (
//                 <React.Fragment>
//                   <div className="drop-container">
//                     <h1
//                       className="drop-head"
//                       style={{ color: "rgba(250, 163, 76, 0.982)" }}
//                     >
//                       TEAM DETAILS
//                     </h1>
//                     <form className="sign-form">
//                       {/* <input type="text" name="teamName" className="input-field" placeholder="Team Name" required onChange={(e)=>handleChange(e)}/> */}

//                       {Object.keys(team).map((key, index) => {
//                         return (
//                           <input
//                             type="text"
//                             key={key}
//                             name={key}
//                             className="input-field"
//                             placeholder={`Member ${index + 1}`}
//                             required
//                             onChange={handleChange}
//                           />
//                         );
//                       })}
//                       <br></br>
//                     </form>
//                     <div className="button-list">
//                       {count < data.maxlimit ? (
//                         <button
//                           className="glow-on-hover p-2"
//                           onClick={(e) => increaseCount(e)}
//                         >
//                           Add Member
//                         </button>
//                       ) : (
//                         <button className="glow-on-hover p-2">Max limit reached</button>
//                       )}
//                       <button
//                         className="glow-on-hover p-2"
//                         onClick={(e) => decreaseCount(e)}
//                       >
//                         Remove Member
//                       </button>
//                       <button
//                         className="glow-on-hover p-2"
//                         id="rzp-button1"
//                         onClick={(e) => proceedPay(e)}
                       
//                       >
//                       Pay Online
//                       </button>
//                       <button
//                         className="glow-on-hover p-2"
//                         id="rzp-button1"
//                         onClick={ handleUserNotPay}
                       
//                       >
//                       Pay Offline
//                       </button>
//                       {console.log(count)}
//                     </div>
//                   </div>
//                   <div ></div>
//                 </React.Fragment>
//               )}
//             </div>
//           </div>
//         </div>
//       </Zoom>
//     </div>
//   );
// };

// export default Modal;
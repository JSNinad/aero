import React from "react";
import "./popup.css";

export default function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          <span className="text-white">Close</span>
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}
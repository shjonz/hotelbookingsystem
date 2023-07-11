import React from "react";
import "./emailList.css";

const EmailList = () => {
    return (
        <div className="emailList">
            <div className="emailListItem">
                <h1 className="emailListTitle">Save time, save money!</h1>
                <span>Sign up and we'll send the best deals to you</span>
                <div className="emailListInputContainer">
                    <input className="emailListInput" placeholder="Your email"></input>
                    <button className="emailListButton">Subscribe</button>
                    
                </div>           
            </div>
        </div>
    );
};

export default EmailList
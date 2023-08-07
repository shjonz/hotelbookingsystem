import React from "react";
import "./emailList.css";

const background = `https://media.istockphoto.com/id/969085876/photo/soft-wave-lapped-the-sandy-beach-summer-background.jpg?s=612x612&w=0&k=20&c=GCi6UvQwxiW1Cy78et_5jBpRTkWIYxAKVTTU5qid3Vg=`

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
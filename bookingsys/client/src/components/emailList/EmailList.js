import React, {useEffect} from "react";
import "./emailList.css";

const background = `https://media.istockphoto.com/id/969085876/photo/soft-wave-lapped-the-sandy-beach-summer-background.jpg?s=612x612&w=0&k=20&c=GCi6UvQwxiW1Cy78et_5jBpRTkWIYxAKVTTU5qid3Vg=`

const EmailList = () => {

    useEffect(() => {
        const headerTitle = document.querySelector(".emailListTitle");
    
        const handleScroll = () => {
          const rect = headerTitle.getBoundingClientRect();
          const isInViewport = rect.top <= window.innerHeight && rect.bottom >= 0;
          
          if (isInViewport) {
            headerTitle.classList.add("animate__fadeIn");
          } else {
            headerTitle.classList.remove("animate__fadeIn");
          }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);
    return (
        <div className="emailList">
            <div className="emailListItem">
                <h1 className="emailListTitle animate__animated animate__fadeIn">Save time, save money!</h1>
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
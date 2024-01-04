import { useState } from "react";
import PropTypes from 'prop-types';
import { ActionBtn } from "./Buttons";
import server from "../../config/Server";
import Loading from "../static/Loading";
import { FaStar } from "react-icons/fa";

export const AdvertReview = ({item}) => {
     const [active, setActive] = useState("");
     return(
          <div className="advert-review-container">
               {active === "" && <RateAdvert item={item} />}
               {active === "message" && <MessageReview item={item} />}
               {active === "comment" && <CommentReview item={item} />}
               {active === "report" && <ReportReview item={item} />}
               <div className="advert-review-footer">
                    <span className={`${active === "" && 'active-review'}`} onClick={()=> setActive("")}>Rate Ad</span>
                    <span className={`${active === "message" && 'active-review'}`} onClick={()=> setActive("message")}>Message</span>
                    <span className={`${active === "comment" && 'active-review'}`} onClick={()=> setActive("comment")}>Comment</span>
                    <span className={`${active === "report" && 'active-review'}`} onClick={()=> setActive("report")}>Report Advert</span>
               </div>
          </div>
     )
}

export const RateAdvert = ({item}) => {
     const [rating, setRating] = useState(0);
     const [responce, setResponce] = useState(false);
     const [loading, setLoading] = useState(false);
     const handleStarClick = (starValue) => {
          setRating(starValue);
        };
     const submitRating = async () => {
          if(rating !== 0) {
               try {
                    setLoading(true);
                    const data = {
                         rating: rating * 20,
                         userId: item.user_id
                    }
                    const info = await server.reviews.addRating(data);
                    if(info.status === "pass"){
                         setResponce(true);
                    }else{
                         console.log(info);
                    }
               } catch (error) {
                    console.log(error);
               }finally{
                    setLoading(false);
               }
          }
     }
     return(
          !responce ?
          <div className="message-review-container">
               <div className="message-review-header">
                    <h4>Rate this advert</h4>
               </div>
               {
                    !loading ?
                    <div className="message-review-body">
                         <div className="row">
                         <div className="rating-div">
                                   <div className="rating-icons">
                                   {[1, 2, 3, 4, 5].map((starValue) => (
                                   <FaStar
                                        key={starValue}
                                        onClick={() => handleStarClick(starValue)}
                                        style={{ cursor: 'pointer', color: starValue <= rating ? 'gold' : 'gray' }}
                                   />
                                   ))}
                              </div>
                              
                              <b>Your Rating: {`${rating}/5`}</b>
                         </div>
                              <ActionBtn action={async() => await submitRating()} title="Rate Ad"/>
                         </div>
                    </div>
                    :
                    <div className="message-review-body">
                         <Loading />
                    </div>
               }
          </div>
          : <div className="message-review-body">
               <p>Rating has been recorded successfully!</p>
          </div>
     )
}

export const MessageReview = ({item}) => {
     const [message, setMessage] = useState({});
     const [responce, setResponce] = useState(false);
     const [loading, setLoading] = useState(false);
     const submitMessage = async () => {
          if(message.contact && message.message) {
               try {
                    setLoading(true);
                    const formData = new FormData();
                    formData.append('name', message.contact);
                    formData.append('message', message.message);
                    formData.append('user_id', item.user_id);
                    formData.append('ad_id', item.ad_id);
                    formData.append('review_type', "message");

                    const info = await server.reviews.addAdReview(formData);
                    if(info.status === "pass"){
                         setResponce(true);
                    }
               } catch (error) {
                    console.log(error)
               }finally{
                    setLoading(false);
               }
               
          }
     }   
     return(
          !responce ? 
          <div className="message-review-container">
               <div className="message-review-header">
                    <h4>Contact {item.full_name}</h4>
               </div>
               {
                    !loading ? 
                    <div className="message-review-body">
                         <div className="row">
                              <label htmlFor="contact">Contact:</label>
                              <input type="text" name="contact" id="contact" placeholder="phone or email" onChange={(e) => setMessage(prev => ({...prev, contact: e.target.value}))} />
                         </div>
                         <div className="row">
                              <label htmlFor="message">Message:</label>
                              <textarea name="message" id="message" cols="30" rows="4" placeholder="Type your message here..." onChange={(e) => setMessage(prev => ({...prev, message: e.target.value}))}></textarea>
                         </div>
                         <div className="row">
                              <ActionBtn action={async() => await submitMessage()} title="Submit"/>
                         </div>
                    </div>
                    :
                    <div className="message-review-body">
                         <Loading />
                    </div>
               }    
               
          </div>
          : <div className="message-review-body">
               <p>The message has been sent successfully!</p>
          </div>
          
     )
}

export const CommentReview = ({item}) => {
     const [message, setMessage] = useState({});
     const [responce, setResponce] = useState(false);
     const [loading, setLoading] = useState(false);
     const submitMessage = async () => {
          if(message.contact && message.message) {
               try {
                    setLoading(true);
                    const formData = new FormData();
                    formData.append('name', message.contact);
                    formData.append('message', message.message);
                    formData.append('user_id', item.user_id);
                    formData.append('ad_id', item.ad_id);
                    formData.append('review_type', "comment");

                    const info = await server.reviews.addAdReview(formData);
                    if(info.status === "pass"){
                         setResponce(true);
                    }
               } catch (error) {
                    console.log(error);
               }finally{
                    setLoading(false);
               }
               
          }
     }   
     return(
          !responce ?
          <div className="message-review-container">
               <div className="message-review-header">
                    <h4>Leave a comment</h4>
               </div>
               {
                    !loading ? 
                    <div className="message-review-body">
                         <div className="row">
                              <label htmlFor="contact">Contact:</label>
                              <input type="text" name="contact" id="contact" placeholder="phone or email" onChange={(e) => setMessage(prev => ({...prev, contact: e.target.value}))} />
                         </div>
                         <div className="row">
                              <label htmlFor="message">Message:</label>
                              <textarea name="message" id="message" cols="30" rows="4" placeholder="Type your message here..." onChange={(e) => setMessage(prev => ({...prev, message: e.target.value}))}></textarea>
                         </div>
                         <div className="row">
                              <ActionBtn action={async() => await submitMessage()} title="Submit"/>
                         </div>
                    </div>
                    :
                    <div className="message-review-body">
                         <Loading />
                    </div>
               }
          </div>
          :
          <div className="message-review-body">
               <p>Your review has been recorded successfully</p>
          </div>
     )
}

export const ReportReview = ({item}) => {
     const [message, setMessage] = useState({});
     const [responce, setResponce] = useState(false);
     const [loading, setLoading] = useState(false);
     const submitMessage = async () => {
          if(message.contact && message.message) {
               try {
                    setLoading(true);
                    const formData = new FormData();
                    formData.append('name', message.contact);
                    formData.append('message', message.message);
                    formData.append('user_id', item.user_id);
                    formData.append('ad_id', item.ad_id);
                    formData.append('review_type', "report");

                    const info = await server.reviews.addAdReview(formData);
                    if(info.status === "pass"){
                         setResponce(true);
                    }
               } catch (error) {
                    console.log(error);
               }finally{
                    setLoading(false);
               }
               
          }
     }   
     return(
          !responce ? 
          <div className="message-review-container">
               <div className="report-review-header">
                    <h4>Report Ad -- {item.ad_name}</h4>
               </div>
               {
                    !loading ? 
                         <div className="message-review-body">
                         <div className="row">
                              <label htmlFor="contact">Contact:</label>
                              <input type="text" name="contact" id="contact" placeholder="phone or email" onChange={(e) => setMessage(prev => ({...prev, contact: e.target.value}))} />
                         </div>
                         <div className="row">
                              <label htmlFor="message">Message:</label>
                              <textarea name="message" id="message" cols="20" rows="4" placeholder="Type your message here..." onChange={(e) => setMessage(prev => ({...prev, message: e.target.value}))}></textarea>
                         </div>
                         <div className="row">
                              <ActionBtn action={async() => await submitMessage()} title="Submit"/>
                         </div>
                    </div> :
                    <div className="message-review-body">
                         <Loading />
                    </div>
               }
          </div>
          : <div className="message-review-body">
               <p>The ad has been reported successfully</p>
          </div>
     )
}

MessageReview.propTypes = {
     item: PropTypes.any
}

AdvertReview.propTypes = {
     item: PropTypes.object,
}

CommentReview.propTypes = {
     item: PropTypes.any
}

ReportReview.propTypes = {
     item: PropTypes.any
}

RateAdvert.propTypes = {
     item: PropTypes.any
}
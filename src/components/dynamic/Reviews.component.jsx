import { useState } from "react";
import PropTypes from 'prop-types';
import { ActionBtn } from "./Buttons";
import server from "../../config/Server";
import Loading from "../static/Loading";
import { FaStar } from "react-icons/fa";

export const AdvertReview = ({item}) => {
     const [active, setActive] = useState("message");
     return(
          <div className="w-full flex flex-col items-center gap-[5px] ">
               {active === "message" && <MessageReview item={item} />}
               {active === "comment" && <CommentReview item={item} />}
               {active === "report" && <ReportReview item={item} />}
               <div className="advert-review-footer">
                    <span className={`${active === "message" && 'active-review'}`} onClick={()=> setActive("message")}>Chat now</span>
                    <span className={`${active === "comment" && 'active-review'}`} onClick={()=> setActive("comment")}>Add Comment</span>
                    <span className={`${active === "report" && 'active-review'}`} onClick={()=> setActive("report")}>Report this Ad</span>
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
          <div className="w-full">
               <div className="w-full rounded-[5px] px-[5px] ">
                    <h4 className="text-[1.2] font-bold text-main-blue-700">Rate {item.users.full_name}</h4>
               </div>
               {
                    !loading ?
                    <div className="w-full p-[10px]">
                         <div className="w-full flex items-center justify-center gap-[10px]">
                              <div className="w-auto flex items-center gap-[5px]">
                                   <div className="w-auto flex items-center ga-[4px]">
                                        {[1, 2, 3, 4, 5].map((starValue) => (
                                        <FaStar
                                             key={starValue}
                                             onClick={() => handleStarClick(starValue)}
                                             style={{ cursor: 'pointer', fontSize: "1.2rem",color: starValue <= rating ? '#E5931D' : 'gray' }}
                                        />
                                        ))}
                                        <b className="text-[0.9rem] text-gray-600 "> : {`${rating}/5`}</b>
                                   </div>
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
          : <div className="w-full flex items-center justify-center p-[5px]">
               <p className="text-[0.9rem] text-green-700 font-semibold">Rating has been recorded successfully!</p>
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
                    const data = {
                         name: message.contact,
                         message: message.message,
                         user_id: item.user_id,
                         ad_id: item.ad_id,
                         review_type: "message"
                    }

                    const info = await server.reviews.addAdReview(data);
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
          <div className="message-review-container p-[2.5px]">
               <div className="w-full bg-main-blue-700 rounded-[5px] py-[5px] ">
                    <h4 className="text-[1.3rem] font-bold text-center text-white">Chat with {item.full_name}</h4>
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
                    const data = {
                         name: message.contact,
                         message: message.message,
                         user_id: item.user_id,
                         ad_id: item.ad_id,
                         review_type: "comment"
                    }

                    const info = await server.reviews.addAdReview(data);
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
          <div className="message-review-container p-[2.5px]">
               <div className="w-full bg-main-blue-700 rounded-[5px] py-[5px]">
                    <h4 className="text-[1.3rem] font-bold text-center text-white">Add a comment</h4>
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
                    const data = {
                         name: message.contact,
                         message: message.message,
                         user_id: item.user_id,
                         ad_id: item.ad_id,
                         review_type: "report"
                    }

                    const info = await server.reviews.addAdReview(data);
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
               <div className="w-full bg-red-700 rounded-[5px] py-[5px]">
                    <h4 className="text-[1.3rem] font-bold text-center text-white">Report this ad</h4>
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
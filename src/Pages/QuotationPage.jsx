import { Helmet } from "react-helmet"
import { Link, useLocation } from "react-router-dom"
import { getItemUrlName } from "../utils/urlFunctions";
import { capitalizeString } from "../utils/otherFunctions";
import { useEffect, useState } from "react";
import { SubmitButton } from "../components/dynamic/Buttons";
import Loading from "../components/static/Loading";
import { getTimeNow } from "../utils/dateFunctions";
import server from "../config/Server";

const QuotationPage = () => {
     const location = useLocation();
     const quoteName = getItemUrlName(location.search)
     const [message, setMessage] = useState('');
     const [name, setName] = useState('');
     const [quotation, setQuotation] = useState(null);
     const [submitted, setSubmitted] = useState(false);
     const [loading, setLoading] =  useState(false);
     useEffect(() => {
          if(quoteName === 'request quotation') {
               setMessage('Get multiple quotes from different vendors. Your Request for Quotation (RFQ) will be shared to the different trusted sellers, and you receive your responses with 24 hours.');
               setQuotation(prev => ({...prev, quote_type: "quotation-request"}));
               setName("quotation");
          }
          else if(quoteName === 'find room') {
               setMessage('Whether you are looking for hotel , lodge , apartment or to rent a house, please complete the below information ');
               setQuotation(prev => ({...prev, quote_type: "find-room"}));
               setName("quotation");
          }
          else if(quoteName === 'buy house') {
               setMessage('If you are looking for buying a house, a plot or land in Rwanda, please complete the below information.');
               setQuotation(prev => ({...prev, quote_type: "buy-house"}));
               setName("quotation");
          }
          else if(quoteName === 'buy car') {
               setMessage('If you are looking for buying or renting a car in Rwanda, please complete the below information ');
               setQuotation(prev => ({...prev, quote_type: "buy-car"}));
               setName("quotation");
          }
          else if(quoteName === 'find job') {
               setMessage('If you are looking for a job in Rwanda, Please Fill out the below form.');
               setQuotation(prev => ({...prev, quote_type: "find-job"}));
               setName("job details");
          }
     }, [location.search]);

     const handleSubmit =  async (e) => {
          e.preventDefault();
          try {
               setLoading(true);
               const formData = new FormData();
               if(quotation.file) formData.append('file', quotation.file);
               formData.append('email', quotation.email);
               formData.append('phone', quotation.phone);
               formData.append('description', quotation.description);
               formData.append('quote_date', getTimeNow());
               formData.append('quote_type', quotation.quote_type);

               const res = await server.addQuotation(formData);
               if(res.status === "pass" ){
                    setSubmitted(true);
               } 
          } catch (error) {
               console.log(error);
          }finally{
               setLoading(false);
          }

     }
  return (
     <>
          <Helmet>
               <meta name="description" content="Discover the best sellers on Click Rwanda to deliver on time the best quality products. " />
               <title>Send A quotation | Click Rwanda</title>
          </Helmet>
          <div className="page">
               <div className="quotation-page-header">
                    <h2>{quoteName ? `${capitalizeString(quoteName)}` : ''}</h2>
                    <p>{message}</p>
               </div>
               <div className="quotation-page-body">
                    
                    {
                         loading ? <Loading /> :
                         submitted ? <p className="form-submitted">You have successfully submitted the request</p> :
                         <>
                              <p>Complete the following form or call <a href="tel:+250788490887">+250 788490887</a> / <a href="tel:+250 727559173">+250 727559173</a></p>
                              <form onSubmit={async (e) => await handleSubmit(e)}>
                              <div className="group">
                                   <label htmlFor="email-03">Email:</label>
                                   <input className="input" type="email" placeholder="ex, example@..." id="email-03" name="email-03" required onChange={e => setQuotation(prev => ({...prev, email:e.target.value}))} />
                              </div>
                              <div className="group">
                                   <label htmlFor="phone-03">Contact Number: </label>
                                   <input className="input" placeholder="ex, 0789..." type="text" id="phone-03" name="phone-03" required onChange={e => setQuotation(prev => ({...prev, phone:e.target.value}))} />
                              </div>
                              <div className="group">
                                   <label htmlFor="description-03">Description:</label>
                                   <textarea className="input" name="description-03" id="description-03" cols="30" rows="15" placeholder="I am looking for..." required onChange={e => setQuotation(prev => ({...prev, description:e.target.value}))}></textarea>
                              </div>
                              {
                                   quoteName === "request quotation" ? 
                                   <div className="group">
                                        <label htmlFor="quote-detail">Upload File</label>
                                        <input type="file" name="quote-file" id="quote-file"  required onChange={e => setQuotation(prev => ({...prev, file:e.target.files[0]}))} />
                                   </div>
                                   :
                                   null
                              }
                              <div className="group">
                                   { quoteName === "request quotation" ? <p><input type="checkbox" required /> I agree to share my Request For Quotaion (RFQ) document with the quoted suppliers </p> : null}
                                   <p><input type="checkbox" required /> I have read, understood and agreed <Link to='/terms-&-conditions'>Terms and Conditions </Link> of Click Rwanda</p>
                              </div>
                              <div className="group">
                                   <SubmitButton content={{title:"Submit"}} />
                              </div>
                         </form>
                         </>
                         
                    }
                    
               </div>
          </div>
     </>
    
  )
}

export default QuotationPage
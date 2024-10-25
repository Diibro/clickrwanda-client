import PropTypes from 'prop-types';
import { useEffect } from 'react';

const JobSeekerPageContainer = ({user}) => {
     
     useEffect(() => {
          console.log(user);
     }, [user]);
     return (
          <div className='job-seeker-page-container'>
               <div className="row">
                    <div className="col">
                         <img src={user?.profile_image} alt="job seeker profile image" className="profile-image" /> 
                         <div className="profile-info">
                              <p><b>Name:</b> <span>{user?.full_name}</span></p>
                              <p><b>Email:</b> <span>{user?.user_email}</span></p>
                              <p><b>Phone:</b> <span>{user?.user_phone}</span></p>
                              <p><b>Field of Work:</b> <span>{user?.sub_name}</span></p>
                              {
                                   user?.description?.userCv?.value ? 
                                   <p><b>User CV: </b><a href={user?.description?.userCv.value} target='_blank' rel='noopener noreferrer'>View Document</a></p>
                                   : null
                              }
                         </div>
                    </div>
                    <div className="col">
                         <div className="description">
                              <b className='description-title'>About {user?.full_name}</b>
                              <p>{user?.description.desc.value}</p>
                         </div>
                    </div>
               </div>
               {/* {
                    user?.description.userCv ? 
                    <div className="row">
                         <div className="doc-container">
                              <PdfContainer file={user?.description.userCv} />
                         </div>
                    </div>
                    :null
               } */}
               
          </div>
     )
}

JobSeekerPageContainer.propTypes = {
     user: PropTypes.object
}
export default JobSeekerPageContainer
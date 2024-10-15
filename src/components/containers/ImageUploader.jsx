import PropTypes from 'prop-types';
import { useState } from 'react';
import { ActionBtn } from '../dynamic/Buttons';
import { s3Folders } from '../../config/s3Config';
import { showMainNotification } from '../../utils/AdminFunctions';
import uploadFile from '../../utils/aws-upload-functions';


const ImageUploader = ({content}) => {
     const [imageFile, setImageFile] = useState(null);
     const [uploadProgress, setUploadProgress] = useState(0);
     const [isUploading, setIsUploading] = useState(false);

     const chooseImage = () => {
          const ele = document.getElementById('image-upload-input');
          ele.click();
     }

     const uploadImage = async() => {
          if(imageFile){
               setIsUploading(true);
               const res = await uploadFile(imageFile,s3Folders.adverts, progress => {
                    setUploadProgress(progress);
               });
               setIsUploading(false);
               if(res){
                    showMainNotification('pass', 'image successfully upload', () => {
                         content.cb(res);
                    });  
               }else{
                    showMainNotification('fail', 'error uploading the image', () => {});
               }
          }else{
               showMainNotification('fail', 'Image not selected. please select a file', () => {});
          }
     };
     return (
          <div className="image-uploader-container">
               <div className="container">
               <i className='close-btn' onClick={() => content.cb()}>close</i>
                    {
                         imageFile 
                         ? 
                              <div className="image-preview">
                                   {content.allowed === 'image/*'? 
                                        <img src={URL.createObjectURL(imageFile)} alt="image preview" />
                                   : content.allowed === '.pdf' ?
                                        // <iframe src={URL.createObjectURL(imageFile)} onLoad={() => URL.revokeObjectURL(imageFile)} aria-controls='0' style={{width:'100%', height:'400px'}} />
                                        // <object data={URL.createObjectURL(imageFile)} style={{width:'100%', height:'auto'}} type="application/pdf"><p>Your browser does not support this file</p></object>
                                        <embed src={URL.createObjectURL(imageFile)} type='application/pdf' width="100%" height={'500px'} />
                                   :null}
                                   <div className="upload-progress">
                                        <ActionBtn title='Upload' type={'button'} action={uploadImage} />
                                        <ActionBtn title='Cancel' type={'button'} action={() => setImageFile(null)} />
                                        <div className="upload-bar">
                                             {isUploading ? 
                                                  <p className={`${uploadProgress < 100 ? 'uploading-text' : 'done-uploading'}`}>Uploading image....: {uploadProgress}%</p>
                                             :null}
                                        </div>
                                   </div>
                              </div>
                         : <div className='upload-btn-container'>
                              <button onClick={chooseImage} className='image-upload-btn' >Upload file</button>
                              <input type="file" onChange={(e) => setImageFile(e.target.files[0])} id='image-upload-input' accept={content.allowed} />
                         </div>
                         
                    }
               </div>
          </div>
     )
}

ImageUploader.propTypes = {
     content: PropTypes.object
}

export default ImageUploader

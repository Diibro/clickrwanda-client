import PropTypes from 'prop-types'
import { EditButton } from '../buttons/ActionButtons'
import { useEffect, useState } from 'react'
import { DashAdvertCardLoad } from './DashAdvertCard';
import { showMainNotification } from '../../../utils/AdminFunctions';
import uploadFile from '../../../utils/aws-upload-functions';
import { s3Folders } from '../../../config/s3Config';
import CategoryService from '../../../services/Category'

const AdminCategoryCard = ({item}) => {
     const [catImage, setCatImage] = useState(null);
     const [loading,setLoading] = useState(false);

     const updateCat = async () => {
          try {
               setLoading(true);
               if(catImage instanceof Blob) {
                    // const newCatIcon = await uploadFile(catImage, s3Folders.categories);
                    const newCatIcon = await uploadFile(catImage, s3Folders.temp);
                    const newCat = {
                         category_icon: newCatIcon,
                         category_name: item.category_name,
                         category_rank: item.category_rank,
                         category_id: item.category_id
                    }

                    const res = await CategoryService.update(newCat);
                    if(res.status === 'pass'){
                         showMainNotification('pass', 'Successfully updated the category', () => {});
                    }else {
                         showMainNotification('fail', res.message, () => {});
                    }
               }
               
          } catch (error) {
               console.log(error);
               showMainNotification('fail', 'error updating the Category.',() => {})
          }finally{
               setLoading(false);
          }
     }

     const changeImage = () => {
          const ele = document.getElementById(`cat-icon-input-${item.category_id}`);
          if(ele){
               ele.click();
          }
     }

     useEffect(() => {
          if(item.category_icon){
               setCatImage(item.category_icon);
          }
     },[item]);
     return (
          <div className='admin-category-card'>
               <div className="img-container">
                    <img
                         className='img'
                         width={80}
                         src={catImage instanceof Blob ? URL.createObjectURL(catImage) : catImage}
                         alt={item?.category_name}
                    />
                    <button className='btn' onClick={changeImage}>Change Image</button>
                    <input type="file" name="cat-icon" style={{display: 'none'}} id={`cat-icon-input-${item.category_id}`} onChange={(e) => setCatImage(e.target.files[0])} />
               </div>
               <div className="content">
                    <h4><span>Name:</span> {item.category_name}</h4>
                    <p><span>Rank:</span> {item.category_rank}</p>
                    <EditButton title={'Update'} action={updateCat} />
               </div>
               <DashAdvertCardLoad loading={loading} message={'updating'} />
          </div>
     )
}

AdminCategoryCard.propTypes = {
     item: PropTypes.object
}

export default AdminCategoryCard
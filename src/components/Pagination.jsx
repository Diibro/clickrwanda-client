import PropTypes from 'prop-types';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const Pagination = ({content}) => {
     const {total, perPage, currentPage, fetchMore } = content;
     let pagesNo = total / perPage;

     if(total % perPage !== 0 ) pagesNo = Math.floor(pagesNo + 1);
     const pages = [];
     for (let i = 1; i <= pagesNo; i++){
          pages.push(i);
     }


     return (
          <div className='w-full flex items-center justify-center gap-[5px] bg-white p-[2.5px] rounded-[5px] '>
               { currentPage > 1 ?
                    <i className='text-[22px] cursor-pointer text-gray-600 p-[2.5px] bg-gray-100 rounded-[2px] hover:text-orange-800 hover:bg-orange-200 ' onClick={() => fetchMore(currentPage - 1)}><GrFormPrevious /></i> : 
                    <i className='text-[22px] cursor-pointer text-gray-300 p-[2.5px] bg-gray-100 rounded-[2px] '><GrFormPrevious /></i>
               }
               <div className='w-auto flex items-center justify-center gap-[2.5px]'>
                    <span className='text-[0.9rem] font-bold text-orange-600'> - {currentPage} - </span>
                    <span className='text-[0.8rem] text-gray-600 '>({pagesNo})</span>
               </div>
               {
                    currentPage < pages.length ?
                    <i className='text-[22px] cursor-pointer text-gray-600 p-[2.5px] bg-gray-100 rounded-[2px]  hover:text-orange-800 hover:bg-orange-200 ' onClick={() => fetchMore(currentPage + 1)}><GrFormNext /></i> :
                    <i className='text-[22px] cursor-pointer text-gray-300 p-[2.5px] bg-gray-100 rounded-[2px] ' ><GrFormNext /></i>
               }
          </div>
     )
}

Pagination.propTypes = {
     content: PropTypes.shape({
          total: PropTypes.number,
          perPage: PropTypes.number,
          fetchMore: PropTypes.func,
          currentPage: PropTypes.number
     })
}

export default Pagination
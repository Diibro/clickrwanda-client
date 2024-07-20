
import PropTypes from "prop-types";

const PdfContainer = ({file}) => {
     return (
          <div className='pdf-container'>
               <object data={file} width="100%" height={600}></object>
          </div>
     )
}

PdfContainer.propTypes = {
     file: PropTypes.string
}


export default PdfContainer

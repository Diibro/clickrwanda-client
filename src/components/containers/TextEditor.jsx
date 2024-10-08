import PropTypes from 'prop-types';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

const TextEditor = ({cb}) => {
     const [editorContent, setEditorContent] = useState('');

     const handleChange = (value) => {
          setEditorContent(value);
          cb(value);
     }    
     return (
          <div className='text-editor-container'>
               <ReactQuill 
                    theme="snow"
                    value={editorContent}
                    onChange={handleChange}
                    modules={{
                         toolbar: [
                         [{ 'header': [1, 2, false] }],
                         ['bold', 'italic', 'underline', 'strike'],
                         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                         ['link'],
                         ['clean'] // remove formatting
                         ]
                    }}
               />
          </div>
     )
}

TextEditor.propTypes = {
     content: PropTypes.object,
     cb: PropTypes.func.isRequired
}

export default TextEditor
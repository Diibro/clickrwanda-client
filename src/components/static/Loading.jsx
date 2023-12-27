import { useContext} from 'react';
import Loader from '../../assets/loader2.gif';
import AppData from '../../Contexts/AppContext';
const Loading = () => {
  return (
    <div className='loading'>
      <img src={Loader} alt="loading gif" />
    </div>
  )
}

export const Loadingv2 = () => {
  const [data] = useContext(AppData);
  const {loading} = data

  if(loading){
    return(<div className='loading loading-absolute'>
        <img src={Loader} alt="loading gif" />
      </div>
  )
  }else{
    return null;
  }
  
}

export default Loading
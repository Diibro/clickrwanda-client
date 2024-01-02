import { useContext} from 'react';
import Loader from '../../assets/loader2.gif';
import AppData from '../../Contexts/AppContext';
import Loader2 from '../../assets/loader3.gif';

const Loading = () => {
  return (
    <div className='loading'>
      <img src={Loader} alt="loading gif" />
    </div>
  )
}

export const LoadingV1 = () => {
  const [data] = useContext(AppData);
  const {loading} = data;
  if(loading){
    return(
      <div className="initial-loader">
        <img src={Loader2} alt="clickrwanda loader" />
      </div>
    )
  }else{
    return null;
  }
  
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
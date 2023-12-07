import Loader from '../../assets/loader.gif';
const Loading = () => {
  return (
    <div className='loading'>
      <img src={Loader} alt="loading gif" />
    </div>
  )
}

export const Loadingv2 = () => {
  return(
    <div className='loading loading-absolute'>
      <img src={Loader} alt="loading gif" />
    </div>
  )
}

export default Loading
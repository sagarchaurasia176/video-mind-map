import {Triangle} from 'react-loader-spinner'

export default function Loader() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height:"100vh", justifyContent: 'center'}}>
    <Triangle
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
      <span>Topic flow</span>
    </div>
  );
}

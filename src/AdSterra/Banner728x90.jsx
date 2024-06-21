import { useEffect } from "react";

const Banner728x90 = () => {
     useEffect(() => {
          window.atOptions = {
            'key': '23f775579d6afec6f2df87f3e4a54efc',
            'format': 'iframe',
            'height': 90,
            'width': 728,
            'params': {}
          };
      
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = '//www.topcreativeformat.com/23f775579d6afec6f2df87f3e4a54efc/invoke.js';
          script.async = true;
      
          const container = document.getElementById('adsterra-container');
          container.appendChild(script);
        }, []);
      
        return (
          <div className="adsterra-h-banner">
               <div id="adsterra-container" style={{ width: '728px', height: '90px' }}></div>
          </div>
        );
}

export default Banner728x90
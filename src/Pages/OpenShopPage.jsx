import { Helmet } from "react-helmet"
import { GetStartedV1 } from "../components/dynamic/Special.components"

const OpenShopPage = () => {
  return (
     <>
          <Helmet>
               <meta name="keywords" content="Open a shop on Click Rwanda" />
               <meta name="description" content="Click Rwanda is one of the best Classified ads Website in Rwanda. It is easy, fast and simple to open a shop on Click Rwanda in a single click. Get started and start selling and increasing your productivity in Rwanda." />
               <title>Open a shop | Click Rwanda</title>
          </Helmet>
          <div  className="page">
               <GetStartedV1 />
          </div>
     </>
    
  )
}

export default OpenShopPage
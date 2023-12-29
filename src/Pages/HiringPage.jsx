import { useState } from "react";

const HiringPage = () => {
     const [language, setLanguage] = useState("eng");

  return (
    <div className="static-page hiring-page">
     <div className="language-row">
          <span className={`${language === "eng" ? 'active' : ''}`} onClick={() => setLanguage("eng")}>English</span>
          <span className={`${language === "kiny" ? 'active' : ''}`}  onClick={() => setLanguage('kiny')}>Kinyarwanda</span>
     </div>
     {
          language === "eng" ?
          <>
               <h2>We are hiring/Akazi</h2>
               <h3>POSITION: Sales Agents</h3>
               <p>Sales agents are professionals that will sell and advertise our products and services. </p>
               <h4>REQUIREMENTS</h4>
               <ul>
                    <li>High School Diploma</li>
                    <li>Outstanding sales skills.</li>
                    <li>Should have a Smartphone.</li>
                    <li>Sales Experience is an added Advantage.</li>
               </ul>
               <h4>JOB ROLE</h4>
               <ul>
                    <li>Advise our customers on different products.</li>
                    <li>Register and start selling on our website.</li>
                    <li>Register and manage sellers. </li>
                    <li>Sell our Subscription packages.</li>
                    <li>Ensuring you Meet and exceed monthly sales targets.</li>
               </ul>
               <h4>JOB BENEFITS</h4>
               <ul>
                    <li>Bestselling agents steadily get 200,000Rwf - 500,000Rwf per month.</li>
                    <li>Sales Agents receive commissions between 50%-100% on their total sales.</li>
                    <li>Sales agents receive monthly Bonuses.</li>
                    <li>Sales agents receive from the Company support and assistance to achieve their Sales targets.</li>
                    <li>Career Growth Opportunities: Sales Agents &gt; Sales Team Leader &gt; Sales Manager</li>
               </ul>
               <p>If you are intereseted contact us via:</p>
               <ul>
                    <li>Call/Whatsapp: <a href="tel:+250 727 559 173">+250 727 559 173</a> / <a href="https://wa.me/+250732474510">+250732474510</a></li>
                    <li>Email: <a href="mailto:clickrwanda.huza@gmail.com">clickrwanda.huza@gmail.com</a></li>
                    <li>Office Location: Remera , Prince House 4th Floor,  Kigali, Rwanda</li>
               </ul>
          </>
          :
          <>
               <h2>AKAZI</h2>
               <h3>UMWANYA: Abacuruzi</h3>
               <p>Abacuruzi, ni abantu bakenewe kugirango badufashe gushaka abakiliya bacururiza k’urubuga rwacu ndetse nabo bahambe Konti zabo bacururizaho. </p>
               <h4>IBIKENEWE</h4>
               <ul>
                    <li>Kuba afite Smartphone, azi no kuyikoresha neza</li>
                    <li>Ubumenyi mu gucuruza byaba ari akarusho</li>
                    <li>Amashuri yisumbuye atandatu no kuzamura byaba ari akarusho</li>
               </ul>
               <h4>AKAZI UZAKORA</h4>
               <ul>
                    <li>Kwiyandikisha no gutangira gucuruza k&apos;urubuga rwacu (www.clickrwanda.com)</li>
                    <li>Gushishikariza abacuruzi kwiyandikisha no gukoresha urubuga rwacu..</li>
               </ul>
               <h4>INYUNGU YO GUKORANA NATWE</h4>
               <ul>
                    <li>Abacuruzi beza bashobora kwinjiza hagati ya 200.000Rwf- 500.000Rwf</li>
                    <li>Abacuruzi bacu bose babona komisiyo iri hagati ya 50%-100% y&apos;ibyo bacuruje byose</li>
                    <li>Abacuruzi bitwaye neza bahabwa bonus buri kwezi.</li>
                    <li>Abacuruzi bacu bahabwa ubufasha na Kampani, harimo kwamamaza ndetse n&apos;amahugurwa ajyanye no gucuruza kuri internet.</li>
                    <li>Abacuruzi bacu baba bafite amahirwe yo kuzamuka mu ntera bakaba abacuruzi bakomeye muri Kampani aho bava kuri rwego rw&apos;aba Agents bakaba ba Managers.</li>
               </ul>
               <p>Ababishaka baduhamagara cyangwa bakatwandikira:</p>
               <ul>
                    <li>Guhamagara/Whatsapp: <a href="tel:+250 727 559 173">+250 727 559 173</a> / <a href="https://wa.me/+250732474510">+250732474510</a></li>
                    <li>Email: <a href="mailto:clickrwanda.huza@gmail.com">clickrwanda.huza@gmail.com</a></li>
                    <li>Aho dukorera: I Remera , Prince House Kuri Etage ya 4,  Kigali, Rwanda</li>
               </ul>
          </>
     }
     
     
    </div>
  )
}

export default HiringPage;
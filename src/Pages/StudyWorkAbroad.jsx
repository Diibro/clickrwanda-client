
const StudyWorkAbroad = () => {
     return (
          <div className="w-full flex flex-col items-center justify-start">
               <section className="w-full bg-gray-200 px-[2%] py-16">
                    <div className="container mx-auto text-center">
                         <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Study and Work Abroad with ClickRwanda</h1>
                         <p className="text-[0.9rem] font-semibold text-gray-600">
                         Unlock global opportunities! Let us guide you through your journey to study or work abroad with ease and confidence.
                         </p>
                    </div>
               </section>

               <section className="w-full py-16 bg-white px-[2%]">
                    <div className="container mx-auto grid gap-8 md:grid-cols-2 items-center">
                    <div>
                         <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Expertise</h2>
                         <ul className="space-y-4 text-gray-600">
                         <li>✅ Guidance on visa applications and documentation.</li>
                         <li>✅ Assistance with choosing the right educational institution or job opportunities.</li>
                         <li>✅ Support in preparing for language proficiency tests.</li>
                         <li>✅ Expert advice on scholarships and financial aid programs.</li>
                         </ul>
                    </div>
                    <div>
                         <img src="/study-abroad.jpg" alt="Study and Work Abroad" className="rounded-lg shadow-lg w-full" />
                    </div>
                    </div>
               </section>

               <section className="py-16 bg-main-blue-700 w-full px-[2%] grid gap-8 md:grid-cols-2 items-center">
                    <div>
                         <img src="/why-choose-us.jpg" alt="Why Choose Us" className="rounded-lg shadow-lg w-full" />
                    </div>
                    <div className="w-full bg-gray-50 px-[2%] py-5 h-full rounded-lg">
                              <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose ClickRwanda?</h2>
                              <ul className="space-y-4 text-gray-600">
                                   <li>🌟 <strong>Experience:</strong> Over 10 years of helping students and professionals achieve their dreams.</li>
                                   <li>🌟 <strong>Global Network:</strong> Partnerships with top universities and employers worldwide.</li>
                                   <li>🌟 <strong>Personalized Guidance:</strong> Tailored advice to suit your goals and background.</li>
                                   <li>🌟 <strong>Success Stories:</strong> Hundreds of satisfied clients who have successfully transitioned abroad.</li>
                              </ul>
                    </div>
               </section>

               <section className="bg-blue-50 py-16 w-full px-[2%]">
                    <div className="container mx-auto">
                         <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Success Stories</h2>
                         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                   <div className="p-6 bg-white rounded-lg shadow-md">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Marie from Kigali</h3>
                                        <q className="text-gray-600">ClickRwanda helped me secure a scholarship in Canada. Their guidance was invaluable!</q>
                                   </div>
                                   <div className="p-6 bg-white rounded-lg shadow-md">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">John from Musanze</h3>
                                        <q className="text-gray-600">With ClickRwanda, I found a great job opportunity in Germany and settled with ease.</q>
                                   </div>
                                   <div className="p-6 bg-white rounded-lg shadow-md">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Grace from Huye</h3>
                                        <q className="text-gray-600">The team was with me every step of the way. I now study at a top university in Australia!</q>
                                   </div>
                         </div>
                    </div>
               </section>


               <section className="w-full bg-gray-200 py-16 px-[2%]">
                    <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start?</h2>
                    <p className="text-lg text-gray-600 mb-6">Our specialist is here to help you every step of the way.</p>
                    <a target="_blank" rel="noreferrer"  href={`https://wa.me/+250795015120?text=${encodeURIComponent("Hello clickrwanda work and study abroad specialist. I would like to get started with program.")}`} className="w-auto inline-block bg-main-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-main-blue-500">
                         Contact Our Specialist
                    </a>
                    </div>
               </section>


          </div>
     )
}

export default StudyWorkAbroad
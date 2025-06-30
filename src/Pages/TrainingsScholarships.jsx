
const TrainingsScholarships = () => {
  return (
     <div className="w-full flex flex-col items-center justify-start">
          <section className="bg-main-blue-700 py-16 px-[2%] w-full">
               <div className="container mx-auto text-center bg-transparent">
                    <h1 className="text-4xl font-extrabold text-white mb-4">Trainings and Scholarships</h1>
                    <p className="text-lg text-gray-200">
                         Empower your institution or yourself with tailored training programs and exclusive scholarship opportunities.
                    </p>
               </div>
          </section>
          <section className="py-16 bg-white w-full px-[2%]">
               <div className="container mx-auto grid gap-8 md:grid-cols-2 items-center">
                    <div>
                         <h2 className="text-3xl font-bold text-gray-800 mb-6">What We Offer</h2>
                         <ul className="space-y-4 text-gray-600">
                              <li>✅ Connecting institutions with qualified trainees and training professionals.</li>
                              <li>✅ Providing fully equipped spaces to host training sessions.</li>
                              <li>✅ Partnering with organizations to develop custom training programs.</li>
                              <li>✅ Curating scholarship opportunities and assisting applicants with the process.</li>
                         </ul>
                    </div>
                    <div>
                              <img src="/trainings-scholarships.jpg" alt="Trainings and Scholarships" className="rounded-lg shadow-lg w-full" />
                    </div>
               </div>
          </section>
          <section className="py-16 bg-main-blue-700 px-[2%] w-full">
               <div className="container mx-auto bg-transparent">
                    <h2 className="text-3xl font-bold text-center text-gray-100 mb-10">Available Training Programs</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                              <div className="p-6 bg-white rounded-lg shadow-md">
                                   <h3 className="text-xl font-semibold text-gray-800 mb-2">Digital Marketing</h3>
                                   <p className="text-gray-600">Enhance your online presence with expert-led sessions on SEO, social media, and content strategy.</p>
                              </div>
                              <div className="p-6 bg-white rounded-lg shadow-md">
                                   <h3 className="text-xl font-semibold text-gray-800 mb-2">Project Management</h3>
                                   <p className="text-gray-600">Master project planning, execution, and leadership with practical workshops.</p>
                              </div>
                              <div className="p-6 bg-white rounded-lg shadow-md">
                                   <h3 className="text-xl font-semibold text-gray-800 mb-2">IT and Software Development</h3>
                                   <p className="text-gray-600">Learn programming, app development, and more from industry professionals.</p>
                              </div>
                    </div>
               </div>
          </section>

          <section className="bg-white py-16 px-[2%] w-full ">
               <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">How to Apply for Scholarships</h2>
                    <div className="grid gap-8 md:grid-cols-2 items-center rounded-lg shadow-lg overflow-hidden ">
                              <div>
                                   <img src="/apply-scholarships.jpg" alt="Apply for Scholarships" className=" w-full" />
                              </div>
                              <div>
                                   <ol className="space-y-4 text-gray-600 list-decimal list-inside">
                                        <li>Check the eligibility criteria for available scholarships.</li>
                                        <li>Gather all necessary documents, including academic transcripts and recommendation letters.</li>
                                        <li>Submit your application through our user-friendly portal.</li>
                                        <li>Prepare for interviews or additional assessments if required.</li>
                                        <li>Receive your acceptance and get guidance on next steps from our team.</li>
                                   </ol>
                              </div>
                    </div>
               </div>
          </section>

          <section className="bg-main-blue-700 py-16 w-full px-[2%] mb-4 rounded-b-[8px]">
               <div className="container mx-auto text-center bg-transparent flex flex-col items-center justify-start gap-1">
                    <h2 className="text-3xl font-bold text-gray-100 mb-4">Get Started now</h2>
                    <p className="text-lg text-gray-200 mb-6">
                         Interested in partnering with us for training or applying for scholarships? Reach out to us today!
                    </p>
                    <a target="_blank" rel="noreferrer" href={`https://wa.me/+250795015120?text=${encodeURIComponent("Hello clickrwanda Trainings  & scholarships scpecialist, I would like to work ith you.")}`} className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700">
                              Contact Us Now
                    </a>
               </div>
           </section>

     </div>
  )
}

export default TrainingsScholarships
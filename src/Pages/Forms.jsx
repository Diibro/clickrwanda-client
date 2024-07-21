import { Route, Routes } from "react-router-dom"
import UserForms, { AgentLoginForm, AgentSignUpForm, InfluencerLoginForm, InfluencerSignUpForm, JobSeekerLogin, JobSeekerSignUp, LoginForm, PasswordResetResponce, SignUpForm } from "../components/static/UserForms"
import { AddAdvertForm } from "../components/dynamic/Adverts.component"
import { PaymentPlanForm } from "../components/static/PaymentPlans.component"

const Forms = () => {
     return (
     <div className="user-forms hide-scroll">
          <Routes>
               <Route path="/" element={<UserForms />} />
               <Route path="/login" element={<LoginForm />} />
               <Route path="/signup" element={<SignUpForm/>} />
               <Route path="/add-advert" element={<AddAdvertForm/>} />
               <Route path="/reset-password" element={<PasswordResetResponce />} />
               <Route path="/payment-plan-form" element={<PaymentPlanForm />} />
               <Route path="/agent-login" element={<AgentLoginForm />} />
               <Route path="/agent-signup" element={<AgentSignUpForm />} />
               <Route path="/job-seeker-signup" element={<JobSeekerSignUp />} />
               <Route path="/job-seeker-login" element={<JobSeekerLogin />} />
               <Route path="/influencer-login" element={<InfluencerLoginForm />} />
               <Route path="/influencer-signup" element={<InfluencerSignUpForm />} />
          </Routes>
     </div>
     )
}

export default Forms
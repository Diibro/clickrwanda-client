import { Route, Routes } from "react-router-dom"
import UserForms, { AgentLoginForm, AgentSignUpForm, LoginForm, PasswordResetResponce, SignUpForm } from "../components/static/UserForms"
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
          </Routes>
     </div>
     )
}

export default Forms
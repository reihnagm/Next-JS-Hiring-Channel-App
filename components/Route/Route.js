import React from "react"
import { Route, Switch } from "react-router-dom"
import Register from "../../pages/register"
import Login from "../../pages/login"
import Page404 from "../Layouts/Page404"
import Engineer from "../../pages/engineer"
import EngineerProfile from "../Engineer/EngineerProfile/EngineerProfile"
import EngineerProfileShow from "../Engineer/EngineerProfile/ProfileShow/ProfileShow"
import EngineerProfileEdit from "../Engineer/EngineerProfile/ProfileEdit/ProfileEdit"
import Company from "../../pages/company"
import CompanyProfile from "../Company/CompanyProfile/CompanyProfile"
import AddJob from "../Company/CompanyProfile/AddJob/AddJob"
import EditJob from "../Company/CompanyProfile/EditJob/EditJob"
import CompanyProfileDetail from "../Company/CompanyProfile/ProfileDetail/ProfileDetail"
import CompanyProfileEdit from "../Company/CompanyProfile/ProfileEdit/ProfileEdit"
import Private from "./Private/Private"

const Routes = () => {
  return (
    <Switch>
      {/* Auth Route */}
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      {/* Company Route */}
      <Route path="/companies" exact component={Company} />
      <Route path="/companies/add-job" exact component={AddJob} />
      <Route path="/companies/detail/:slug" exact component={CompanyProfileDetail} />
      <Route path="/companies/:slug/edit-job" exact component={EditJob} />
      {/* Private Company Route */}
      <Private path="/companies/profile" exact component={CompanyProfile} />
      <Private path="/companies/profile/me/edit" exact component={CompanyProfileEdit} />
      {/* Engineer Route */}
      <Route path="/engineers" exact component={Engineer} />
      <Route path="/engineers/profile/:slug" exact component={EngineerProfileShow} />
      {/* Private Engineer Route  */}
      <Private path="/engineers/profile" exact component={EngineerProfile} />
      <Private path="/engineers/profile/me/edit" exact component={EngineerProfileEdit} />
      {/* 404 Page */}
      <Route component={Page404} />
    </Switch>
  )
}

export default Routes

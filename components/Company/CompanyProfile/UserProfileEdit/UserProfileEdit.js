import "date-fns"
import React, { useEffect } from "react"
import dynamic from "next/dynamic"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentProfileCompany, updateProfileCompany } from "../../../../redux/actions/company"
import Spinner from "../../../Spinner/Spinner"
const UserProfileEditItem = dynamic(() => import("./UserProfileEditItem/UserProfileEditItem"))

const UserProfileEdit = () => (
  <>
    <div className="backdrop-bottom"></div>
    <UserProfileEditItem update={updateProfileCompany} />
  </>
)

export default UserProfileEdit

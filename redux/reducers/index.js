import { combineReducers } from "redux"
import alert from "./alert"
import auth from "./auth"
import engineer from "./engineer"
import company from "./company"
import postjob from "./postjob"
import skill from "./skill"
import jobtype from "./jobtype"
import message from "./message"

const createRootReducer = () =>
  combineReducers({
    alert,
    auth,
    engineer,
    company,
    postjob,
    skill,
    jobtype,
    message
  })
export default createRootReducer

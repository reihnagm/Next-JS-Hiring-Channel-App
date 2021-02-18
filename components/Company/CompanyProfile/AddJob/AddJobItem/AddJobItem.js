import React, { useState } from "react"
import { Container, Grid, Chip, Button, TextField, makeStyles } from "@material-ui/core"
import { API_KEY_TINYMCE } from "../../../../../configs/constants"
import { Editor } from "@tinymce/tinymce-react"
import { Toast } from "../../../../../utils/helper"
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp"
import NumberFormat from "react-number-format"
import Autocomplete from "@material-ui/lab/Autocomplete"

const AddJobItem = ({ company, storeAddJob, allSkills, allJobTypes }) => {
  const [formData, setFormData] = useState({
    title: "",
    salary: ""
  })
  const { title, salary } = formData
  const [skills, setSkills] = useState([])
  const [jobtypes, setJobTypes] = useState([])
  const [content, setContent] = useState("")
  const useStyles = makeStyles(theme => ({
    chip: {
      "& > *": {
        margin: theme.spacing(0.5)
      }
    }
  }))
  const classes = useStyles()
  const renderedSkills = skills && skills.map((option, i) => {
      return (
        <span className={classes.chip} key={i}>
          <Chip
            label={option.name}
            deleteIcon={<RemoveIcon />}
            onDelete={() => {
              setSkills(skills.filter(entry => entry !== option))
              // setSkillsDeleted(oldArray => [...oldArray, skills.filter(entry => entry === option)])
            }}
          />
        </span>
      )
    })
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const onEditorChange = content => {
    setContent(content)
  }
  const onSubmit = ev => {
    ev.preventDefault()
    try {
      let payload = {
        title: title,
        content: content,
        salary: salary,
        skills: skills,
        jobtypes: jobtypes,
        companyUid: company.uid
      }
      if (title.trim() === "") {
        throw new Error("Title Required")
      }
      if (content.trim() === "") {
        throw new Error("Content Required")
      }
      if (salary.trim() === "") {
        throw new Error("Salary Required")
      }
      if (skills.length === 0) {
        throw new Error("Skills Required")
      }
      if (jobtypes.length === 0) {
        throw new Error("Job Type Required")
      }
      dispatch(storeAddJob(payload))
    } catch (err) {
      Toast.fire({
        icon: "error",
        title: err.message
      })
    }
  }
  return (
    <>
      <div className="backdrop-bottom"></div>
      <Container fixed>
        <Grid container className="my-5" direction="row" justify="center" alignItems="center">
          <Grid className="p-5 white rounded" item md={8} xs={12}>
            <form onSubmit={onSubmit}>
              <TextField onChange={onChange} value={title ?? ""} name="title" margin="normal" variant="outlined" label="Title" fullWidth />
              <p className="text-gray mb-3">Job Description</p>
              <Editor
                value={content ?? ""}
                apiKey={API_KEY_TINYMCE}
                init={{
                  height: 400,
                  menubar: false,
                  valid_classes: {
                    "*": ""
                  },
                  image_title: true,
                  image_caption: true,
                  plugins: ["advlist autolink lists link image charmap print preview anchor", "searchreplace visualblocks code fullscreen", "insertdatetime media table paste code help wordcount"],
                  toolbar: "table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | undo redo | formatselect | link image | code | bold italic backcolor |  alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent | removeformat | help",
                  file_picker_callback: function (cb, value, meta) {
                    var input = document.createElement("input")
                    input.setAttribute("type", "file")
                    input.setAttribute("accept", "image/*")
                    input.onchange = function () {
                      var file = this.files[0]
                      var reader = new FileReader()
                      reader.onload = function (e) {
                        cb(e.target.result, {
                          title: file.name,
                          alt: file.name
                        })
                      }
                      reader.readAsDataURL(file)
                    }
                    input.click()
                  }
                }}
                onEditorChange={onEditorChange}
              />
              <Autocomplete
                multiple
                filterSelectedOptions
                freeSolo
                renderTags={() => {}}
                value={skills ?? ""}
                options={allSkills}
                onChange={(_, value) => {
                  setSkills(value)
                }}
                getOptionLabel={allSkills => allSkills.name ?? ""}
                getOptionSelected={(option, value) => {
                  return option.uid === value.uid
                }}
                renderInput={params => <TextField {...params} margin="normal" label="Skill Requirements" placeholder="Skill Requirements" variant="outlined" fullWidth />}
              />
              <div>{renderedSkills}</div>
              <Autocomplete
                multiple
                filterSelectedOptions
                freeSolo
                value={jobtypes ?? ""}
                options={allJobTypes}
                onChange={(_, value) => {
                  if (jobtypes.length > 0) {
                    setJobTypes(value.splice(1))
                  } else {
                    setJobTypes(value)
                  }
                }}
                getOptionLabel={allJobTypes => allJobTypes.name ?? ""}
                getOptionSelected={(option, value) => {
                  return option.uid === value.uid
                }}
                renderInput={params => <TextField {...params} margin="normal" label="Job Types" placeholder="Job Types" variant="outlined" fullWidth />}
              />
              <NumberFormat onChange={onChange} value={salary ?? ""} name="salary" margin="normal" variant="outlined" label="Salary" decimalSeparator="," thousandSeparator="." prefix="IDR " allowNegative={false} customInput={TextField} fullWidth />
              <Grid container direction="row" justify="center" alignItems="center">
                <Button type="button" variant="contained" color="primary" to="/companies">
                  Back
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Create
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default AddJobItem

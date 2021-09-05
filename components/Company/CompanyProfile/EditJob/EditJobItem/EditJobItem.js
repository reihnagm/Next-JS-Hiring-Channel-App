import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { Container, Grid, Chip, Button, TextField, makeStyles } from "@material-ui/core"
import { API_KEY_TINYMCE } from "@configs/constants"
import { Editor } from "@tinymce/tinymce-react"
import { Toast } from "@utils/helper"
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp"
import NumberFormat from "react-number-format"
import Autocomplete from "@material-ui/lab/Autocomplete"

const EditJobItem = ({ postJob, updatePostJob, allSkills, allJobTypes }) => {
  const [formData, setFormData] = useState({
    title: "",
    salary: ""
  })
  const router = useRouter() 
  const dispatch = useDispatch()
  const { title, salary } = formData
  const [content, setContent] = useState("")
  const [jobtypesSelectedMask, setJobTypes] = useState("")
  const [skillsSelectedMask, setSkills] = useState([])
  const [skillsSelectedDestroy, setSkillsDestroy] = useState([])
  useEffect(() => {
    setFormData({
      title: postJob.title === null ? "" : postJob.title,
      salary: postJob.salary === null ? "" : postJob.salary
    })
    postJob.content === null ? setContent("") : setContent(postJob.content)
    postJob.skills === null ? setSkills([]) : setSkills(postJob.skills)
    postJob.jobtypes === null ? setJobTypes([]) : setJobTypes(postJob.jobtypes)
  }, [postJob])
  const useStyles = makeStyles(theme => ({
    chip: {
      "& > *": {
        margin: theme.spacing(0.5)
      }
    }
  }))
  const classes = useStyles()
  const renderedSkills = skillsSelectedMask && skillsSelectedMask.map((option, i) => {
      return (
        <span className={classes.chip} key={i}>
          <Chip
            label={option.name}
            deleteIcon={<RemoveIcon />}
            onDelete={() => {
              setSkills(skillsSelectedMask.filter(entry => entry !== option))
              setSkillsDestroy(prevArray => [...prevArray, skillsSelectedMask.filter(entry => entry === option)])
            }}
          />
        </span>
      )
    })
  const onChange = ev => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value })
  }
  const onEditorChange = content => {
    setContent(content)
  }
  const onSubmit = async ev => {
    ev.preventDefault()
    try {
      let payload = {
        title: title,
        content: content,
        salary: salary,
        skillsStore: { skillsSelectedMask },
        skillsDestroy: { skillsSelectedDestroy },
        jobtypes: { jobtypesSelectedMask } ,
        postJobUid: postJob.uid
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
      if (skillsSelectedMask.length == 0) {
        throw new Error("Skills Required")
      }
      if (jobtypesSelectedMask.length === 0) {
        throw new Error("Job Type Required")
      }
      dispatch(updatePostJob(payload, router))
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
              <TextField onChange={onChange} value={title} name="title" margin="normal" variant="outlined" label="Title" fullWidth />
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
                value={skillsSelectedMask ?? ""}
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
                value={jobtypesSelectedMask ?? ""}
                options={allJobTypes}
                onChange={(_, value) => {
                  if (jobtypesSelectedMask.length > 0) {
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
              <NumberFormat onChange={onChange} value={salary} name="salary" margin="normal" variant="outlined" label="Salary" decimalSeparator="," thousandSeparator="." prefix="IDR " allowNegative={false} customInput={TextField} fullWidth />
              <Grid container direction="row" justify="center" alignItems="center">
                <Button type="button" variant="contained" color="primary" onClick={() => router.replace(`/companies/profile?job-title=${router.query.slug}`)}>
                  Back
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Update
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default EditJobItem

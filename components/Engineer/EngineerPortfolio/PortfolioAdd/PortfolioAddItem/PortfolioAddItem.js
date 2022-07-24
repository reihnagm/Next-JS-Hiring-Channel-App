import React, { useState } from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { Container, Grid, TextField, makeStyles, Button, Radio, FormControlLabel } from "@material-ui/core"
import { addPortfolioEngineer } from "@redux/actions/engineer"
import { Toast } from "@utils/helper"
import ImageUploading from "react-images-uploading"

const PortfolioAddItem = ({ engineer }) => {

  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(0.5)
      }
    },
    marginNormal: {
      marginTop: "16px",
      marginBottom: "8px"
    }
  })) 

  const router = useRouter()
  const dispatch = useDispatch()
  const classes = useStyles()
  const [selectedValuePortfolio, setSelectedValuePortfolio] = useState()
  const [files, setFiles] = useState([])
  const [images, setImages] = useState([])
  const [formData, setFormData] = useState({
    title:"",
    description: ""
  })

  const { title, description } = formData

  const onChange = ev => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value })
  }

  const handleChange = (ev) => {
    setSelectedValuePortfolio(ev.target.value);
  }

  const onChangeImages = (imageList, addUpdateIndex) => {
    if(imageList.length > 4) {
      Toast.fire({
        icon: "warning",
        title: "Max 4 Images"
      })     
      return
    }
    let fileAssign = []
    for (let i = 0; i < imageList.length; i++) {
      fileAssign.push(imageList[i].file)
    }
    setFiles(fileAssign)
    setImages(imageList)
  };
  
  const onSubmit = (ev) => {
    ev.preventDefault()
    if(title.trim() === "") {
      Toast.fire({
        icon: "error",
        title: "Title is Required"
      })   
      return 
    }
    if(description.trim() === "") {
      Toast.fire({
        icon: "error",
        title: "Description is Required"
      })   
      return 
    }
    if(files.length === 0) {
      Toast.fire({
        icon: "error",
        title: "Images is Required"
      })   
      return 
    }
    let fd = new FormData()
    for (let i = 0; i < files.length; i++) {
      fd.append("portfolios", files[i])
    }
    fd.set("engineerUid", engineer.uid)
    fd.set("title", title),
    fd.set("desc", description)
    fd.set("type", selectedValuePortfolio)
    dispatch(addPortfolioEngineer(fd, router))
  }

  return ( 
    <>
      <Container fixed>
        <Grid container className="my-5" direction="row" justifyContent="center" alignItems="center">
          <Grid className="p-5 white rounded" item md={8} xs={12}> 
            <form onSubmit={onSubmit}>
              
              <span style={{ fontSize: "16px", margin: "10px 10px 0 10px" }}> Type : </span>
              <FormControlLabel value="end" control={<Radio
                checked={selectedValuePortfolio === 'web'}
                onChange={handleChange}
                value="web"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'Web' }}
              />} label="Web" />
              <FormControlLabel value="end" control={<Radio
                checked={selectedValuePortfolio === 'mobile'}
                onChange={handleChange}
                value="mobile"
                name="radio-button-demo"
                inputProps={{ 'aria-label': 'Mobile' }}
              />} label="Mobile" />
              <TextField onChange={onChange} value={title} name="title" margin="normal" variant="outlined" label="Title*" fullWidth />
              <TextField onChange={onChange} value={description} name="description" margin="normal" variant="outlined" label="Description*" rows={4} multiline fullWidth />
              <ImageUploading
                multiple
                value={images}
                onChange={onChangeImages}
                dataURLKey="data_url"
              >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div className={classes.marginNormal}>
                  <div 
                    {...dragProps}
                    onClick={ imageList.length == 0 ? onImageUpload : null}
                    id="uploadImages"
                  >
                  { imageList.length == 0 ? <p>Browse Files or Drop here <br /> Max : 4 Images </p> : <div> </div> }
                  </div>
                    <div style={{ display: "flex", alignItems: "stretch" }} >
                    {imageList.map((img, i) => (
                      <div key={i} style={{ marginLeft: `${i == 0 ? "0" : "10px" }` }}>
                        <div style={{ margin: "12px 0", width: "100px", height: "160px" }}>
                          <img style={{ width:"100%", height:"100%", objectFit: "cover",  borderRadius: "5px" }} src={img['data_url']} alt={img['data_url']}/>
                        </div>
                        <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => onImageUpdate(i)}>Update</span>
                        <span style={{ margin: "0 6px"}} />
                        <span style={{ textDecoration: "underline", cursor: "pointer"  }} onClick={() => onImageRemove(i)}>Remove</span>
                      </div>
                    ))}
                    </div>
                  { imageList.length > 0 
                  ? <div style={{ 
                      textDecoration: "underline",
                      margin: "10px 0 0 0",
                      cursor: "pointer" 
                    }} onClick={onImageRemoveAll}>
                    Remove All Images
                    </div> 
                  : <p></p> 
                  } 
                  <div style={{ margin: "15px 0 0 0"}}>
                    <Button  type="button" variant="contained" color="primary" onClick={() => router.back()} >
                      Back
                    </Button> 
                    <Button type="button" variant="contained" color="primary" onClick={onSubmit}>
                      Submit
                    </Button>
                  </div>
                </div>
              )}
              </ImageUploading>
            </form>
          </Grid>
        </Grid>
      </Container>
    </> 
  )
}

export default PortfolioAddItem
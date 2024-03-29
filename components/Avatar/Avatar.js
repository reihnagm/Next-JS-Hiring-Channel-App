import React, { useEffect, useState } from "react"
import { Avatar } from "@material-ui/core"
const AvatarComponent = ({ imageSource, type, altName, width, height, spaceBottom }) => {
  const [image, setImage] = useState(null)
  useEffect(() => {
    if (type === "engineers") {
      setImage(`${process.env.NEXT_PUBLIC_IMAGES_ENGINEER}/${imageSource}`)
    }
    if (type === "companies") {
      setImage(`${process.env.NEXT_PUBLIC_IMAGES_COMPANY}/${imageSource}`)
    }
  }, [imageSource, type, setImage])
  return (
    <Avatar
      src={image}
      alt={altName}
      style={{
        width: parseInt(width),
        height: parseInt(height),
        marginBottom: parseInt(spaceBottom || "0")
      }}
    />
  )
}
export default AvatarComponent

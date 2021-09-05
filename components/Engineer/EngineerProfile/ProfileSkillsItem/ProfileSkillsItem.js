import React from "react"

const ProfileSkillsItem = ({ items }) => {
  return (
    typeof items !== "undefined" && items &&
    items.map(skill => (
      <span className={`tag-${skill.color} margin-tag`} key={skill.uid}>
        {skill.name}
      </span>
    ))
  )
}

export default ProfileSkillsItem

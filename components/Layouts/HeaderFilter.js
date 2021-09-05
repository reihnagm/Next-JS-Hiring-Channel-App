import React from "react"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { InputLabel, makeStyles, FormControl, MenuItem, Select } from "@material-ui/core"

const FilterByComponentE = ({ handleFilterBy, filterByE }) => {
  return (
    <FormControl margin="normal" variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-filterby">Filter By</InputLabel>
      <Select
        inputProps={{
          name: "filterby",
          id: "outlined-filterby"
        }}
        label="Filter By"
        value={filterByE}
        onChange={event => handleFilterBy(event.target.value)}
      >
        <MenuItem value="latest-update">Latest Update</MenuItem>
        <MenuItem value="fullname">Name</MenuItem>
      </Select>
    </FormControl>
  )
}
const FilterByComponentC = ({ handleFilterBy, filterByC }) => {
  return (
    <FormControl margin="normal" variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-filterby">Filter By</InputLabel>
      <Select
        inputProps={{
          name: "filterby",
          id: "outlined-filterby"
        }}
        label="Filter By"
        value={filterByC}
        onChange={event => handleFilterBy(event.target.value)}
      >
        <MenuItem value="latest-update">Latest Update</MenuItem>
        <MenuItem value="fullname">Name</MenuItem>
      </Select>
    </FormControl>
  )
}
const SortByComponentE = ({ handleSort, sortE }) => {
  return (
    <FormControl margin="normal" variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-sortby">Sort By</InputLabel>
      <Select
        inputProps={{
          name: "sortby",
          id: "outlined-sortby"
        }}
        label="Sort By"
        value={sortE}
        onChange={event => handleSort(event.target.value)}
      >
        <MenuItem value="older">Older</MenuItem>
        <MenuItem value="newer">Newer</MenuItem>
      </Select>
    </FormControl>
  )
}
const SortByComponentC = ({ handleSort, sortC }) => {
  return (
    <FormControl margin="normal" variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-sortby">Sort By</InputLabel>
      <Select
        inputProps={{
          name: "sortby",
          id: "outlined-sortby"
        }}
        label="Sort By"
        value={sortC}
        onChange={event => handleSort(event.target.value)}
      >
        <MenuItem value="older">Older</MenuItem>
        <MenuItem value="newer">Newer</MenuItem>
      </Select>
    </FormControl>
  )
}
const HandleShowComponentE = ({ handleShow, showE }) => {
  return (
    <FormControl margin="normal" variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-show">Show</InputLabel>
      <Select
        inputProps={{
          name: "Show",
          id: "outlined-show"
        }}
        label="Show"
        value={showE}
        onChange={ev => handleShow(ev.target.value)}
      >
        <MenuItem value="5">5</MenuItem>
        <MenuItem value="10">10</MenuItem>
        <MenuItem value="15">15</MenuItem>
        <MenuItem value="20">20</MenuItem>
        <MenuItem value="25">25</MenuItem>
      </Select>
    </FormControl>
  )
}
const HandleShowComponentC = ({ handleShow, showC }) => {
  return (
    <FormControl margin="normal" variant="outlined" fullWidth>
      <InputLabel htmlFor="outlined-show">Show</InputLabel>
      <Select
        inputProps={{
          name: "Show",
          id: "outlined-show"
        }}
        label="Show"
        value={showC}
        onChange={ev => handleShow(ev.target.value)}
      >
        <MenuItem value="5">5</MenuItem>
        <MenuItem value="10">10</MenuItem>
        <MenuItem value="15">15</MenuItem>
        <MenuItem value="20">20</MenuItem>
        <MenuItem value="25">25</MenuItem>
      </Select>
    </FormControl>
  )
}
const HeaderFilter = ({ handleFilterBy, handleSort, handleShow }) => {
  const router = useRouter()
  const { showN, sortN, filterByN } = useSelector(state => state.engineer)
  const { showC, sortC, filterByC } = useSelector(state => state.company)
  return (
    <div id="header-filter" className="columns my-5 justify-c-around">
      {router.pathname === "/engineers" && (
        <>
          <div className="column is-one-fifth">
            <FilterByComponentE handleFilterBy={handleFilterBy} filterByE={filterByN} />
          </div>
          <div className="column is-one-fifth">
            <SortByComponentE handleSort={handleSort} sortE={sortN} />
          </div>
          <div className="column is-one-fifth">
            <HandleShowComponentE handleShow={handleShow} showE={showN} />
          </div>
        </>
      )}
      {router.pathname === "/companies" && (
        <>
          <div className="column is-one-fifth">
            <FilterByComponentC handleFilterBy={handleFilterBy} filterByC={filterByC} />
          </div>
          <div className="column is-one-fifth">
            <SortByComponentC handleSort={handleSort} sortC={sortC} />
          </div>
          <div className="column is-one-fifth">
            <HandleShowComponentC handleShow={handleShow} showC={showC} />
          </div>
        </>
      )}
    </div>
  )
}
export default HeaderFilter

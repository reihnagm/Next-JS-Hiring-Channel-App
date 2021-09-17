import EditorJs from "react-editor-js"
import { EDITOR_JS_TOOLS  } from "@utils/tools"

const EditorJsComponent = ({ description }) => {
  return (
    <div>
      { description !== "" ?
      <EditorJs 
        tools={EDITOR_JS_TOOLS}
        autofocus
        readOnly
        data={JSON.parse(description)}
        minHeight={150}
      /> : <EditorJs 
      tools={EDITOR_JS_TOOLS}
      autofocus
      readOnly
      minHeight={60}/> }
    </div>
  )
}


export default EditorJsComponent
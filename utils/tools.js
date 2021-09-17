import EditorJs from 'react-editor-js';

import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'

// const CustomEditor = () => {

  export const EDITOR_JS_TOOLS = {
    image: {
      class: Image,
      config: {
        endpoints: {
          byFile: 'http://localhost:5000/api/v1/editorjs/uploadFile', 
          byUrl: 'http://localhost:5000/images/engineer-desc',
        }
      }
    },
    header: {
      class: Header,
      inlineToolbar: true,
    },
    checkList: CheckList,
    embed: Embed,
    table: Table,
    delimiter: Delimiter,
    marker: Marker,
    quote: Quote, 
    warning: Warning,
    list: List,
    raw: Raw,
    paragraph: {
      class: Paragraph,
      config: { 
        placeholder: 'Description Here' 
      }
    },
    inlineCode: InlineCode,
    code: Code,
    simpleImage: SimpleImage
  }

//   return (
//     <EditorJs key={`1`} holder={`1`} tools={EDITOR_JS_TOOLS}>
//       <div id={`1`} />
//     </EditorJs>
//   );

// }

// export default CustomEditor
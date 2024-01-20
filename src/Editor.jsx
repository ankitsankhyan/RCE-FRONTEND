import React, { useRef, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/javascript"

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/snippets/c_cpp";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/snippets/java";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/snippets/python";


// Import only the necessary parts of the ace library for this file
import ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-github";

export default function Editor(data) {
  const editorRef = useRef(null);
  
  const handleEditorLoad = (editor) => {
    // Save the editor reference
    editorRef.current = editor;
  
    // Set selection range
    const Range = ace.require("ace/range").Range;
    editorRef.current.selection.setRange(new Range(4, 0, 6, 5));

    // Add marker
    const markerRange = new Range(0, 0, 1, 5);
    const markerId = editorRef.current.session.addMarker(markerRange, "blue", "text");

    // Cleanup marker when component unmounts
    return () => {
      editorRef.current.session.removeMarker(markerId);
    };
  };

  return (
    AceEditor && (
      <AceEditor
        mode={data.mode}
        width="100%"
        height="100%"
        theme={data.dark ? "chaos" : "github"}
        onChange={data.onChange}
        fontSize={16}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={data.value}
        wrapEnabled={true}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          enableMultiselect: false,
          showLineNumbers: true,
          tabSize: 2
        }}
        onLoad={handleEditorLoad} // Callback when the editor is loaded
      />
    )
  );
}

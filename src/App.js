import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import "./style.css";

const body = document.getElementsByTagName("body");
function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
// function addStyle(styleString) {
//   const style = document.createElement("style");
//   style.textContent = styleString;
//   document.head.append(style);
// }
function App() {
  const [value, updateValue] = useState("");
  const [jsvalue, updatejsValue] = useState("");

  const [javaValue, updatejavaValue] = useState("");
  const [pythonValue, updatepythonValue] = useState("");
  const [cppValue, updatecppValue] = useState("");
  const [Cvalue, updateCValue] = useState("");
  const [preview, updatePreview] = useState("");
  const [dark, updateDark] = useState(false);
  const [selected, updateSelected] = useState("HTML");
  console.log(selected);
  

  return (
    <div>
      <div className="navbar">
        <i
          title="save"
          className={`material-icons ${dark ? "colorWhite" : ""}`}
          onClick={() => {
            download(
              "download.txt",
              selected === "JS" ? jsvalue : selected === "C++" ? cppValue : selected === "java" ? javaValue : selected === "python" ? pythonValue : Cvalue
            );
          }}
        >
       <button>Save</button>
        </i>
        <i
          title={dark ? "go light" : "go dark"}
          className={`material-icons ${dark ? "colorWhite" : ""}`}
          onClick={() => {
            body[0].style.background = dark ? "lightgrey" : "#616161";
            updateDark(!dark);
          }}
        >
         Code Editor
        </i>
        <div
          className={`run ${dark ? "darkRun" : ""}`}
          onClick={() => {
            updatePreview(value);
            try {
              eval(jsvalue);
            } catch (e) {
              alert("Please verify your JS");
            }
           
          }}
        >
          Run
        </div>
      </div>
      <div className="playground">
        <select
          className={`dropdown ${dark ? "darkDD" : ""}`}
          value={selected}
          onChange={(e) => {
            updateSelected(e.target.value);
          }}
        >
          <option value="C">C</option>
          <option value="C++">C++</option>
          <option value="JS">JS</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
        <div className={`editor mr-0 ${dark ? "colorDark" : ""}`}>
          {selected === "C" && (
            <Editor
              mode="c_cpp"
              dark={dark}
              onChange={(e) => {
                updateCValue(e);
              }}
              value={Cvalue}
            />
          )}
          {selected === "JS" && (
            <Editor
              mode="javascript"
              dark={dark}
              onChange={(e) => {
                updatejsValue(e);
              }}
              value={jsvalue}
            />
          )}
          {selected === "C++" && (
            <Editor
              mode="c_cpp"
              dark={dark}
              onChange={(e) => {
                updatecppValue(e);
              }}
              value={cppValue}
            />

          )}
          {selected === 'java' &&(
           <Editor
           mode="java"
           dark={dark}
           onChange={(e) => {
             updatejavaValue(e);
           }}
           value={javaValue}
         />
          )}

      {selected === 'python' &&(
           <Editor
           mode="python"
           dark={dark}
           onChange={(e) => {
             updatepythonValue(e);
           }}
           value={pythonValue}
         />
          )}
        
        </div>
        <div className={`editor ${dark && !preview ? "colorDark" : ""}`}>
          <div dangerouslySetInnerHTML={{ __html: preview }} />
        </div>
      </div>
    </div>
  );
}

export default App;

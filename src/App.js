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
function addStyle(styleString) {
  const style = document.createElement("style");
  style.textContent = styleString;
  document.head.append(style);
}
function App() {
  const [value, updateValue] = useState("");
  const [jsvalue, updatejsValue] = useState("");
  const [cssvalue, updatecssValue] = useState("");
  const [preview, updatePreview] = useState("");
  const [dark, updateDark] = useState(false);
  const [selected, updateSelected] = useState("HTML");
  console.log(selected);
  useEffect(() => {
    try {
     eval(jsvalue);
    } catch (e) {
      alert("Please verify your JS");
    }
    addStyle(cssvalue);
  }, []);

  return (
    <div>
      <div className="navbar">
        <i
          title="save"
          className={`material-icons ${dark ? "colorWhite" : ""}`}
          onClick={() => {
            download(
              "download.txt",
              selected === "JS" ? jsvalue : selected === "CSS" ? cssvalue : value
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
            addStyle(cssvalue);
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
          <option value="HTML">C</option>
          <option value="CSS">C++</option>
          <option value="JS">JS</option>
          <option value="Java">Java</option>
        </select>
        <div className={`editor mr-0 ${dark ? "colorDark" : ""}`}>
          {selected === "HTML" && (
            <Editor
              mode="html"
              dark={dark}
              onChange={(e) => {
                updateValue(e);
              }}
              value={value}
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
          {selected === "CSS" && (
            <Editor
              mode="css"
              dark={dark}
              onChange={(e) => {
                updatecssValue(e);
              }}
              value={cssvalue}
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

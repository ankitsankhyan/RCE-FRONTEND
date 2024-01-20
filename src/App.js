import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import "./style.css";
import client from "./client";
import { MdOutlineSaveAlt } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";
import { FaRegFileCode } from "react-icons/fa";

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

function App() {
  const [input, updateInput] = useState("");
  const [value, updateValue] = useState(`#include <stdio.h>
  int main() {
      // Write C code here
      printf("Hello world");
  return 0;
  }`);
  const [language, updateLanguage] = useState("C");
  const [jsvalue, updatejsValue] = useState(`
  console.log("Welcome to Online Program");`);

  const [javaValue, updatejavaValue] = useState(`class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Hello, World!");
      }
  }`);


  const [pythonValue, updatepythonValue] = useState(`print("Hello world")`);
  const [cppValue, updatecppValue] = useState(`#include <iostream>
  int main() {
      // Write C++ code here
      std::cout << "Hello world!";
      return 0;
  }`);
  const [Cvalue, updateCValue] = useState(`#include <stdio.h>
  int main() {
      // Write C code here
      printf("Hello world");
  return 0;
  }`);
  

  const [preview, updatePreview] = useState("");
  const [dark, updateDark] = useState(false);
  const [selected, updateSelected] = useState("C");

  return (
    <div>
      <div className="navbar">
      
        <div
          title={dark ? "go light" : "go dark"}
          className={`material-icons ${dark ? "colorWhite" : ""}`}
          onClick={() => {
            body[0].style.background = dark ? "lightgrey" : "#616161";
            updateDark(!dark);
          }}
        >
           <FaRegFileCode />
           Pro Editor

        </div>
      <div className="options">
      <button
          title="save"
          className={`save ${dark ? "darkRun" : "colorWhite"}`}
          onClick={() => {
            download(
              "download.txt",
              selected === "JS" ? jsvalue : selected === "C++" ? cppValue : selected === "java" ? javaValue : selected === "python" ? pythonValue : Cvalue
            );
          }}
        >
          <MdOutlineSaveAlt style={{transform:"scale(1.5)"}}  />
        </button>
        <button
          className={`save ${dark ? "darkRun" : "colorWhite"}`}
          onClick={() => {
            
             let data = {value, language,input};
             console.log(data);
              client.post("/run", data);
          }}
        >
        <FaPlay style={{transform:"scale(1.5)"}} />
        </button>
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
        <div className={`editor1 mr-0 ${dark ? "colorDark" : ""}`}>
          
 
    
   {selected === "C" && (
            <Editor
              mode="c_cpp"
              dark={dark}
              onChange={(e) => {
                updateCValue(e);
                updateValue(e);
                updateLanguage("C")
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
                updateValue(e);
                updateLanguage("JS");
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
                updateValue(e);
                updateLanguage("C++");
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
             updateValue(e);
             updateLanguage("java");
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
             updateValue(e);
             updateLanguage("python");
           }}
           value={pythonValue}
         />
          )}
          

  </div>
          
  <div className={`editor ${dark ? "colorDark" : ""}`}>
    <div className="extra">
    
    <h4 style={{margin:"0px"}}>Input</h4>
    <div className="input">
          
          <textarea type="text" onChange={(e)=>{updateInput(e.target.value)}}/>
        </div>
        <h4 style={{marginTop:"50px", marginBottom:"0px"}}>Output</h4>
         <div className="output">
         
         </div>
    </div>
        
        
        </div>
       
       
        
      
       
          
      
      </div>
    </div>
  );
}

export default App;
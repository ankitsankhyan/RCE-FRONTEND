import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import "./style.css";
import client from "./client";
import { MdOutlineSaveAlt } from "react-icons/md";
import { FaPlay } from "react-icons/fa6";
import { FaRegFileCode } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
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
  //state variable needed to fetch input and output
  const [runButtonPressed, setRunButtonPressed] = useState(false);

  const [input, updateInput] = useState("");
  const [output, updateOutput] = useState("");
  const [value, updateValue] = useState(`print("Hello World")`);
  const [language, updateLanguage] = useState("python");
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
  const [dark, updateDark] = useState(false);
  const [selected, updateSelected] = useState("python");
  const handleSave = () => {
    download(
      "download.txt",
      selected === "JS" ? jsvalue : selected === "C++" ? cppValue : selected === "java" ? javaValue : selected === "C" ? Cvalue : pythonValue
    );
  };

  const handleRun = () => {
    let data = { value, language, input };
    console.log(data);
    setRunButtonPressed(true); //important step to make the fetch the input and output
    client.post("/api/code", data)
      .then(response => {
        console.log(response);
        // console.log(response.data);
        updateOutput(response.data.output);
        toast.success("Code run successfully!");
      })
      .catch(error => {
        console.log(error.message, 'is error');
        //  console.log(error.response.data);
        //  updateOutput(error.message || error.response.data.output || error.response.data.error || "Error running code. Please check output for details.");
        if(error.message === "Network Error"){
          updateOutput("Code execution timed out or Internet connection lost. Please try again.");
        }
        toast.error("Error running code. Please check output for details.");
      });
  };

  //fetch input.txt and output.txt content after making the API request,
  useEffect(() => {
     
    if(selected === "C"){
      updateValue(Cvalue);
      updateLanguage("C");
      
    }
    if(selected === "JS"){
      updateValue(jsvalue);
      updateLanguage("JS");
    }
    if(selected === "C++"){
      updateValue(cppValue);
      updateLanguage("C++");
    }
    if(selected === 'python'){
       updateValue(pythonValue)
       updateLanguage('python');
    }
    if(selected === 'java'){
       updateValue(javaValue);
       updateLanguage('java');
    }

  },[selected])


  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
      />
      <div className="navbar">
        <div
          title={dark ? "go light" : "go dark"}
          className={`material-icons ${dark ? "colorWhite" : ""}`}
          onClick={() => {
            body[0].style.background = dark ? "lightgrey" : "#616161";
            updateDark(!dark);
          }}
        > 
      
       <FaRegFileCode className="logo"/>
      
         
         <div className="title">
           Pro Editor
         </div>
        </div>
        <div className="options">
          <button
            title="save"
            className={`save ${dark ? "darkRun" : "colorWhite"}`}
            onClick={handleSave}
          >
            <MdOutlineSaveAlt style={{ transform: "scale(1.5)" }} />
          </button>
          <button
            className={`save ${dark ? "darkRun" : "colorWhite"}`}
            onClick={handleRun}
            id = "runButton"
            name = "run"
          >
            <FaPlay style={{ transform: "scale(1.5)" }} />
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
          {/* <option value="C">C</option> */}
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
                updateLanguage("C");
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
          {selected === 'java' && (
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
          {selected === 'python' && (
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
            <h4 style={{ margin: "0px" }}>Input</h4>
            <div className="input">
              <textarea type="text" onChange={(e) => { updateInput(e.target.value) }} value={input} />
            </div>
            <h4 style={{ marginTop: "50px", marginBottom: "0px" }}>Output</h4>
            <div className="output">
            <div style={{padding:'10px', overflowY:'scroll', height:"95%"}} dangerouslySetInnerHTML={{ __html: output.replace(/\r\n/g, '<br/>') }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

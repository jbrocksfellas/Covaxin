import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import district from "./all_data.json";
import { Collapse } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export const Alerts = ({ states }) => {
  const [email, setEmail] = useState("")
  const [pinCode, setpinCode] = useState("")
  const [currentAge, setcurrentAge] = useState("");
  const [currentDistrict, setcurrentDistrict] = useState("");
  const [currentDate, setcurrentDate] = useState("");
  const [currentState, setcurrentState] = useState("");
  const [successMsg, setsuccessMsg] = useState("");
  const [errorMsg, seterrorMsg] = useState("");

  const [district_data, setdistrictdata] = useState([]);
  function setDistrict(value) {
    let id;
    if (value === "default") {
      id = [];
    } else {
      id = district[value];
    }

    setdistrictdata(id);
  }


  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

  function addToDatabase(e) {
    e.preventDefault();
    let data = {
      email: email,
      pinCode: pinCode,
      age: currentAge,
      state: currentState,
      district: currentDistrict,
    };
    if(data.email !== "" && data.pinCode !== "" && data.age !== "" && data.state !== "" && data.district !== ""){

    console.log(data);
    let url = '/save-data'
    let params = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(data),
    }

    
    fetch(url, params)
    .then((response)=>{
      if(response.ok){
        setsuccessMsg("Added Successfully")
        setEmail("");
        setpinCode("");
        setcurrentState("");
        setcurrentDistrict("");
        setcurrentAge("");
      }
      else {
        seterrorMsg("Failed! Email already exists.")
      }
     }).then((data) => console.log(data));
    }else{
      seterrorMsg("Please fill all the fields.")
    }
  }

  return (
    <div className="container mt-5">
      <h2 className="my-4">Alerts</h2>
      <Form onSubmit={addToDatabase}>
      <Collapse
            in={errorMsg != "" || successMsg != ""}
          >
            {successMsg != "" ? (
              <>
              <Alert
                severity="success"
                onClose={() => {
                  setsuccessMsg("");
                }}
              >
                {successMsg}
              </Alert>
              <br/>
              </>
            ) : (
              <>
              <Alert
                severity="error"
                onClose={() => {
                  seterrorMsg("");
                }}
              >
                {errorMsg}
              </Alert>
              <br/>
              </>
            )}
          </Collapse>
        <Form.Group className="mb-4" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Form.Text className="text-muted" />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">
          <Form.Control type="number" placeholder="Pincode" value={pinCode} onChange={(e) => setpinCode(e.target.value)} />
        </Form.Group>

        <select
          className="form-select" 
          value={currentState}
          onChange={(e) => {
            setDistrict(e.target.value);
            setcurrentState(e.target.value);
          }}
          id="state"
          aria-label="Default select example"
        >
          <option value="default" selected>
            Choose a State
          </option>
          {states.map((e) => {
            return <option value={e.state_id}>{e.state_name}</option>;
          })}
        </select>
        <br />
        <select
          className="form-select"
          id="district"
          value={currentDistrict}
          onChange={(e) => {
            setcurrentDistrict(e.target.value);
            console.log(currentDistrict);
          }}
          aria-label="Default select example"
        >
          <option value="default" selected>
            Choose a District
          </option>
          {district_data.map((e) => {
            return <option value={e.district_id}>{e.district_name}</option>;
          })}
        </select>
        <br />
        <select
          className="form-select"
          id="age"
          value={currentAge}
          onChange={(e) => {
            setcurrentAge(e.target.value);
          }}
          aria-label="Default select example"
        >
          <option value="default" selected>
            Select age group
          </option>
          <option value="18">18-44</option>
          <option value="45">45+</option>
        </select>
        <br />
        <Button className="my-3" type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
};

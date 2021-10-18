import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import district from './all_data.json'
import { Detail } from './Detail'

export const InputDetail = ({ states }) => {

    const days_list = () => {
        let days_list = []
        for (let j = 0; j < 5; j++) {
            let d = new Date()
            d.setDate(d.getDate() + j)
            days_list.push(d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear())
        }
        return days_list
    }


    const [date, setDate] = useState(days_list)
    const [district_data, setdistrictdata] = useState([])
    const [distDetails, setdistDetails] = useState([])

    const [currentAge, setcurrentAge] = useState("")
    const [currentDistrict, setcurrentDistrict] = useState("")
    const [currentDate, setcurrentDate] = useState("")

    function setDistrict(value) {
        let id;
        if (value === "default") {
            id = []
        } else {
            id = district[value]
        }

        setdistrictdata(id)
    }

    function renderData(e) {
        e.preventDefault();
        console.log(e);
        if (!currentDistrict || !currentAge || !currentDate) {
            alert("please fill them all")
        } else {
            let url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict' + '?' + new URLSearchParams({
                'district_id': currentDistrict,
                'date': currentDate
            })
            console.log(url)
            console.log(typeof currentDistrict)
            fetch(url).then((response) => {
                return response.json();
            }).then((data) => {
                var final_data = data['sessions']
                // console.log(final_data)
                var filtered_age = filterObj(final_data)
                console.log(filtered_age)
                inputAge(filtered_age, currentAge)



            })
            console.log("HI")
            // setdistDetails([1,2,3])
        }
    }


    function inputAge(filtered_age, age_group) {

        var final_data;
        if (age_group == "18") {
            final_data = filtered_age["age18_list"]
        } else {
            final_data = filtered_age["age45_list"]
        }

        for (let j of final_data) {

            // console.log(`Minumum Age: ${j["min_age_limit"]}`)
            // console.log(`Name: ${j["name"]}`)
            // console.log(`Pin Code: ${j["pincode"]}({j["district_name"]})`)
            // console.log(`Fee Type: ${j["fee_type"]}`)
            // console.log(`Dose 1: ${j["available_capacity_dose1"]}`)
            // console.log(`Dose 2: ${j["available_capacity_dose2"]}`)
            // console.log("")
        }
        setdistDetails(final_data)

    }

    function filterObj(Object_List) {
        var age45_list = []
        var age18_list = []
        for (let obj of Object_List) {
            if (obj["min_age_limit"] == 45) {
                age45_list.push(obj)
            } else {
                age18_list.push(obj)
            }
        }
        // console.log(age18_list)
        // console.log(age45_list)
        return { "age45_list": age45_list, "age18_list": age18_list }
    }

    return (
        <>
            <div className="container">
                <h2 className="my-3">Details</h2>
                <Form onSubmit={renderData}>
                    <select className="form-select" onChange={(e) => { setDistrict(e.target.value) }} id="state" aria-label="Default select example">
                        <option value="default" selected>Choose a State</option>
                        {states.map((e) => {
                            return <option value={e.state_id}>{e.state_name}</option>
                        })}
                    </select><br />
                    <select className="form-select" id="district" value={currentDistrict} onChange={(e) => { setcurrentDistrict(e.target.value) }} aria-label="Default select example">
                        <option value="default" selected>Choose a District</option>
                        {district_data.map((e) => {
                            return <option value={e.district_id}>{e.district_name}</option>
                        })}
                    </select><br />
                    <select className="form-select" id="age" value={currentAge} onChange={(e) => { setcurrentAge(e.target.value) }} aria-label="Default select example">
                        <option value="default" selected>Select age group</option>
                        <option value="18">18-44</option>
                        <option value="45">45+</option>
                    </select><br />
                    <select className="form-select" id="date" value={currentDate} onChange={(e) => { setcurrentDate(e.target.value) }} aria-label="Default select example">
                        <option value="default" selected>Select Date</option>
                        {date.map((e) => {
                            return <option value={e}>{e}</option>
                        })}
                    </select>
                    <Button className="my-3" type="submit" variant="success">Submit</Button>
                </Form>
            </div>
            <Detail distDetails={distDetails} />
        </>
    )
}


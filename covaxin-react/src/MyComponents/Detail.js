import React, { useState } from 'react'

export const Detail = ({ distDetails }) => {
    return (
        <div className="container mt-3">
            {distDetails.map((e)=>{
                return (
            <ul class="list-group mb-4">
                <li class="list-group-item list-group-item-dark">Name: {e["name"]}</li>
                <li class="list-group-item list-group-item-success">Address: {e["address"]}</li>
                <li class="list-group-item list-group-item-success">Date: {e["date"]}</li>
                <li class="list-group-item list-group-item-success">Minumum Age: {e["min_age_limit"]}</li>
                <li class="list-group-item list-group-item-success">Pin Code: {e["pincode"]} ({e["district_name"]})</li>
                <li class="list-group-item list-group-item-success">Fee Type: {e["fee_type"]}</li>
                <li class="list-group-item list-group-item-success">Fee: {e["fee"]}</li>
                <li class="list-group-item list-group-item-success">Dose 1: {e["available_capacity_dose1"]}</li>
                <li class="list-group-item list-group-item-success">Dose 2: {e["available_capacity_dose2"]}</li>
                {/* <li class="list-group-item">Minumum Age: {e["min_age_limit"]}</li> */}
            </ul>
                )
            })}
            
        </div>
    )
}

const districtSelect = document.getElementById('district_options')
const districtSelectModel = document.getElementById('district_options_model')
const districtSel = document.getElementById('district_select')
const stateSelect = document.getElementById('state_select')
const btn = document.querySelector('button.btn');
const details = document.querySelector('div.details')
const para = document.querySelector('p.para')
const selectAge = document.getElementById('age_select')
const selectDate = document.getElementById('date_select')
const dotDate = document.querySelector('option.dot_date')
const dotAge = document.querySelector('option.dot_age')


// console.log(allDistOpt)

function filterObj(Object_List){
    var age45_list = []
    var age18_list = []
    for (obj of Object_List){
        if(obj["min_age_limit"] == 45){
            age45_list.push(obj)
        }else{
            age18_list.push(obj)
        }
    }
    console.log(age18_list)
    console.log(age45_list)
    return {"age45_list": age45_list, "age18_list": age18_list}
}

function inputAge(filtered_age, age_group){
    var final_data;
    if(age_group == "18"){
        final_data = filtered_age["age18_list"]
    }else{
        final_data = filtered_age["age45_list"]
    }
    // print(final_data)

    for (j of final_data){

        console.log(`Minumum Age: ${j["min_age_limit"]}`)
        console.log(`Name: ${j["name"]}`)
        console.log(`Pin Code: ${j["pincode"]}({j["district_name"]})`)
        console.log(`Fee Type: ${j["fee_type"]}`)
        console.log(`Dose 1: ${j["available_capacity_dose1"]}`)
        console.log(`Dose 2: ${j["available_capacity_dose2"]}`)
        console.log("")
        pa = document.createElement('p')
        pa.setAttribute("class", "detail")
        pa.innerHTML = `Minumum Age: ${j["min_age_limit"]} <br> Name: ${j["name"]} <br> Pin Code: ${j["pincode"]}(${j["district_name"]}) <br> Date: ${j["date"]} <br> Fee Type: ${j["fee_type"]} <br> Fee: ${j["fee"]} <br> Vaccine: ${j["vaccine"]} <br> Dose 1: ${j["available_capacity_dose1"]} <br> Dose 2: ${j["available_capacity_dose2"]} <br>`
        para.appendChild(pa)
    }

}

function getData2(district_id, age_group, date){
    url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict' + '?' + new URLSearchParams({
        'district_id': district_id,
        'date': date
    })
    console.log(url)

    fetch(url).then((response) =>{
        return response.json();
    }).then((data)=>{
        var final_data = data['sessions']
        console.log(final_data)      
        var filtered_age = filterObj(final_data)
        console.log(filtered_age)
        inputAge(filtered_age, age_group)

        
            
    })


}


function getData(arg) {
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36'}
    // district_details = requests.get(f'https://cdn-api.co-vin.in/api/v2/admin/location/districts/{inp_state}', headers=headers)
    url = 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + arg;

    
        
    // district_list = district_details.json()['districts']

    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {

        var dist_data = data['districts'];
        // console.log(dist_data);

        var al = 0
        var dst_list = {}
        for (k of dist_data){
            al += 1
            dst_list[al] = {"district_id": k['district_id'], "district_name": k['district_name']}
        }
        // console.log(dst_list)
        dist_length = Object.keys(dst_list).length

        
        var leng = 0

        for (var key in dst_list){
            leng +=1
            // console.log(`${leng} ${dst_list[leng]["district_name"]}`)
            var element = document.createElement("OPTION");
            var elementNode = document.createTextNode(dst_list[leng]["district_name"]);
            element.setAttribute("value", dst_list[leng]["district_id"])
            element.appendChild(elementNode)
            districtSelect.appendChild(element)

            // inp_district = input("Please Enter District no.")

            // access_key = dst_list[int(inp_district)]['district_id']

            // print(access_key)

        }
        const allDistOpt = document.querySelectorAll('.district_select option')
        // console.log(allDistOpt)
        
        
        
    })

    // var district_list = data.json()['districts']

    // console.log(district_list)
    
}

function getDataModel(arg) {
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36'}
    // district_details = requests.get(f'https://cdn-api.co-vin.in/api/v2/admin/location/districts/{inp_state}', headers=headers)
    url = 'https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + arg;

    
        
    // district_list = district_details.json()['districts']

    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {

        var dist_data = data['districts'];
        // console.log(dist_data);

        var al = 0
        var dst_list = {}
        for (k of dist_data){
            al += 1
            dst_list[al] = {"district_id": k['district_id'], "district_name": k['district_name']}
        }
        // console.log(dst_list)
        dist_length = Object.keys(dst_list).length

        
        var leng = 0

        for (var key in dst_list){
            leng +=1
            // console.log(`${leng} ${dst_list[leng]["district_name"]}`)
            var element = document.createElement("OPTION");
            var elementNode = document.createTextNode(dst_list[leng]["district_name"]);
            element.setAttribute("value", dst_list[leng]["district_id"])
            element.appendChild(elementNode)
            districtSelectModel.appendChild(element)

            // inp_district = input("Please Enter District no.")

            // access_key = dst_list[int(inp_district)]['district_id']

            // print(access_key)

        }
        const allDistOpt = document.querySelectorAll('.district_select option')
        // console.log(allDistOpt)
        
        
        
    })

    // var district_list = data.json()['districts']

    // console.log(district_list)
    
}


function state_ftn(){
    selectDate.value = "dot"
    const allData = document.querySelectorAll('.detail')
    console.log(allData)
    for(var a = 0; a < (allData.length); a++){
        para.removeChild(para.lastChild)
    }
    const allDistOpt = document.querySelectorAll('.district_select option')
    // console.log(allDistOpt)
    for(var a = 0; a < (allDistOpt.length - 1); a++){
        districtSelect.removeChild(districtSelect.lastChild)
    }
    
    getData(stateSelect.value);
}

function model_state_ftn() {
    const inp_mod_fld = document.querySelector('.model_select')
    const allDistOpt = document.querySelectorAll('.district_options_model option')
    // console.log(allDistOpt)
    for(var a = 0; a < (allDistOpt.length); a++){
        district_options_model.removeChild(district_options_model.lastChild)
    }
    
    getDataModel(inp_mod_fld.value);
}

stateSelect.addEventListener('change', state_ftn)

// btn.addEventListener('click', ()=>{
    
//     para.innerHTML = "hello"
// })

// console.log(districtSelect.childNodes)

districtSel.addEventListener('change', ()=>{
    const allData = document.querySelectorAll('.detail')
    // console.log(allData)
    for(var a = 0; a < (allData.length); a++){
        para.removeChild(para.lastChild)
    }      
    selectDate.value = 2ata)
    for(var a = 0; a < (allData.length); a++){
        para.removeChild(para.lastChild)
    }    
    selectDate.value = "dot"
})

selectDate.addEventListener('change', ()=>{
    const allData = document.querySelectorAll('.detail')
    // console.log(allData)
    for(var a = 0; a < (allData.length); a++){
        para.removeChild(para.lastChild)
    }
    getData2(districtSel.value, selectAge.value, selectDate.value)
    console.log(selectAge.value)
})

function dates(){
    days_list = []
    for(let j=0; j<10; j++){
        let d = new Date()
        d.setDate(d.getDate() + j)
        days_list.push(d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear())
    }
    console.log(days_list)

    days_list.forEach((value, index)=>{
        let element = document.createElement("OPTION");
        let elementNode = document.createTextNode(value);
        element.setAttribute("value", value)
        element.appendChild(elementNode)
        selectDate.appendChild(element)
    })

}

dates();


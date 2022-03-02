
const loadingPhoneData = () =>{

    document.getElementById('spin').style.display = 'block'// for spinner
    const serachText = document.getElementById('input-field');
    const searchValue = serachText.value;
    const dataUrl = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(dataUrl)
    .then(res => res.json())
    .then(data => loadingData(data.data))

    // input Erro Handling

    if(serachText.value != ''){
        document.getElementById('error').style.display='none'
   
    serachText.value = ''
    document.getElementById('phoneDetail').textContent ='';
    document.getElementById('phone-container').textContent ='';
    document.getElementById('display-cont').style.display ='none';
    }
    else if(serachText.value ==''){
        
        document.getElementById('error').style.display='block'
        document.getElementById('errorMsg').style.display='block'
        document.getElementById('phoneDetail').textContent ='';
        document.getElementById('phone-container').textContent ='';
        document.getElementById('display-cont').style.display ='none';
    }
    
}


// Display data quantity handling

const loadingData = data4 => {
    // console.log(data4)
    const totalItem = data4.length;
    if(data4.length > 21){
        const Data5 = data4.slice(0,21);
    //    console.log(Data5)
    quantity(data4,Data5)
    displayData(Data5,data4)
    }
    else if(data4.length>=1)
    { const Data5= data4;
        quantity(data4,Data5)
        displayData(Data5,data4)
    }
    else if(data4.length ===0){
        // alert('not matched')
        document.getElementById('error').style.display='block'
        document.getElementById('notMatch').style.display='block'
        document.getElementById('errorMsg').style.display='block'
        document.getElementById('phoneDetail').textContent ='';
        document.getElementById('phone-container').textContent ='';
        document.getElementById('display-cont').style.display ='none';
    
    }
}
// Item quanty Displaying
const quantity = (item1,item2)=>{
    if(item1.length!=0){
    document.getElementById('display-cont').style.display ='block';
    const totalData = item1.length
    const displayItemQuantity = item2.length;
    // console.log(mobile);
    const displayContainer = document.getElementById('display-cont');
    displayContainer.textContent ='';
    const h5 = document.createElement('h5');
    h5.classList.add('p-3')
    h5.innerHTML = ` 
    <span>Display Item: ${displayItemQuantity}</span>
    <span> where total Items Found : ${totalData} !!</span>`
   
    displayContainer.appendChild(h5)
    }
    
}


// Display List

const displayData =(mobile) =>{
    const displayItems = document.getElementById('phone-container');
    mobile.forEach(data1 =>{
        const name = data1.phone_name;
        const brand = data1.brand;
        const img = data1.image;
        const id = data1.slug;

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =`
        <div class="card p-3 shadow  bg-light rounded">
                <img src="${img}" class="card-img-top" alt="...">
                <div class="card-body">
                  <p class="card-title fw-bold">${brand} , ${name}</p>
                 <div class="d-flex justify-content-center rounded">
                
                 <button class="btn btn-warning text-white fw-bold" onclick="loadDetail('${id}')">READ MORE</button></div>
                </div>
              </div>`
        displayItems.appendChild(div)

        document.getElementById('spin').style.display = 'none' //spinner display close.
    })
}

// Display  Detail of single Item 

const loadDetail = (id) =>{
    // console.log(id);
    const detailUrl = `https://openapi.programming-hero.com/api/phone/${id}`
    // console.log(detailUrl);
    fetch(detailUrl)
    .then(res => res.json())
    .then(outPut => displayDetail(outPut.data));
}

const displayDetail = (data2) =>{
    const SingleDisplay = document.getElementById('phoneDetail')
    SingleDisplay.textContent ='';
    // console.log(data2);
        const pic = data2.image;
        const brand = data2.brand;
        const name = data2.name;
        const rlease = data2.releaseDate;
        if(rlease!=''){ date = rlease}
        else{ date ='Not found'}
        const storage = data2.mainFeatures.storage;
        
         const div1 = document.createElement('div');
         div1.classList.add('row');
           div1.innerHTML = `
           <div class=" border w-50 p-3 shadow bg-light rounded col">
            <img src="${pic}" class="card-img-top img-fluid  alt="picture">
            <figcaption class="figure-caption text-center"><strong>${name}</strong> </figcaption>
            </div>`
            const displaySize = data2.mainFeatures.displaySize;
            const memory = data2.mainFeatures.memory;
            const chip = data2.mainFeatures.chipSet;
            const div2 = document.createElement('div');
            div2.innerHTML= `
            <div class=" border p-2 h-100 rounded text-dark col">
                        <h4 class="text-center"> SPECIFICATION</h4>
                        <p class="card-title fw-bold">${brand} , ${name}</p>
                        <small class="text-danger">${date}</small>
                        <p class=""> <strong> Storage:</strong>${storage}</p>
                        <p><strong>Memory:</strong> ${memory}</p>
                         <p><strong> Display:</strong> ${displaySize}</p>
                         <p><strong> Chip:</strong> ${chip}</p> 
                         <div class="d-flex justify-content-center rounded">
                
                 <button class="btn btn-warning text-white fw-bold">BUY NOW</button></div>
                </div>

            </div>
            `
            const other  = data2.others;
             const div3 = document.createElement('div');
            div3.classList.add('border')
            div3.innerHTML = `
            <h5 class="p-2 rounded text-dark col"> More Info</h5>`
            for(const prop in other){
                const div4 = document.createElement('div');
                
                div4.innerHTML= `
                <div class="text-dark ps-2">
                <p> ${prop} :  ${other[prop]}</p>
                </div>
                `
                div3.appendChild(div4)
            }
  SingleDisplay.appendChild(div1)
  SingleDisplay.appendChild(div2)
  SingleDisplay.appendChild(div3)

}


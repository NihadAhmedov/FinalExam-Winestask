const burgerBtn = document.getElementById('burgerBtn')
const ul = document.querySelector('ul')
let toggle = true

function navBurger() {
    if (toggle) {
        ul.classList.add('menu')
    } else {
        ul.classList.remove('menu')
    }

    toggle = !toggle
}

burgerBtn.addEventListener('click', navBurger)


// post for form

const titleInp = document.getElementById('titleInp')
const priceInp = document.getElementById('priceInp')
const imageInp = document.getElementById('imageInp')
const form = document.getElementById('form')
const formProducts = document.getElementById('formProducts')


function myForm(e) {
    e.preventDefault()

    axios.post(`https://655c84d425b76d9884fd7251.mockapi.io/product`, {

        title: titleInp.value,
        price: priceInp.value,
        image: imageInp.value
    }).then(res => {
        console.log(res.data);
        form.reset();
        renderProduct();
        tableFunc();
    })

}

form.addEventListener('submit', myForm)

/// table

const tbody = document.getElementById('tbody')

function tableFunc() {
    tbody.innerHTML = ''
    axios.get('https://655c84d425b76d9884fd7251.mockapi.io/product')
        .then(res => {
            pro = res.data
            pro.map(item => {
                const tr = document.createElement('tr')
                tr.className = 'tableList'
                tr.innerHTML = `
            
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td><div class="photo">${item.image}</div></td>
            <td>${item.price}$</td>
            <td><button id="delete" onclick="deleteProduct(${item.id})">Delete <i class="fa-solid fa-trash"></i></button></td>
            `
                tbody.appendChild(tr)
            })
        })
}

tableFunc()
/// 

function renderProduct() {
    formProducts.innerHTML = ''
    axios.get('https://655c84d425b76d9884fd7251.mockapi.io/product')
        .then(res => {
            pro = res.data
            pro.map(item => {
                const myDiv = document.createElement('div')
                myDiv.className = 'box col-xl-4 col-md-6 col-12'
                myDiv.innerHTML = `
            <div class="productDiv">
               <img src="${item.image}" alt="">
              <div class="boxText">
                <h6>${item.title}</h6>
                <p>${item.price}$</p>
            <div class="twoBtn">
               <button id="add" onclick="deleteProduct(${item.id})">Delete <i class="fa-solid fa-trash"></i></button>
             
              </div>
              </div>
         </div>
            
            `
                formProducts.appendChild(myDiv)
            })
        })
}

renderProduct()

/// delete func


function deleteProduct(id) {
    axios.delete(`https://655c84d425b76d9884fd7251.mockapi.io/product/${id}`)
        .then(res => {
            console.log(res.data);
            renderProduct();
            tableFunc();
        })
}


/// search

const inp = document.getElementById('inp')
const srchBtn = document.getElementById('srchBtn')

function findByName() {
    formProducts.innerHTML = ''
    axios.get('https://655c84d425b76d9884fd7251.mockapi.io/product')
        .then(res => {
            pro = res.data
            let filterData = pro.filter(item => item.title.toLowerCase().startsWith(inp.value.toLowerCase()))
            filterData.forEach(item => {
                const myDiv = document.createElement('div')
                myDiv.className = 'box col-xl-4 col-md-6 col-12'
                myDiv.innerHTML = `
               <div class="productDiv">
                <img src="${item.image}" alt="">
              <div class="boxText">
               <h6>${item.title}</h6>
               <p>${item.price}$</p>
      
              </div>
               </div>
        
             `
             formProducts.appendChild(myDiv)
            })
        })
}

srchBtn.addEventListener('click', findByName)


// sort

function sortDefault(){
    formProducts.innerHTML = ''
    let sortList = selectValue.value
    if(sortList === '1'){
        axios.get('https://655c84d425b76d9884fd7251.mockapi.io/product')
        .then(res =>{
            pro = res.data
            renderProduct()
        })
    }
}
selectValue.addEventListener('change', sortDefault)


function sortProductA(){
    formProducts.innerHTML = ''
    let sortList = selectValue.value

    if(sortList === "2"){
        axios.get('https://655c84d425b76d9884fd7251.mockapi.io/product')
        .then(res =>{
            pro = res.data
            let sortData = pro.sort((a, b) => (a.title.localeCompare(b.title)))
            sortData.map(item =>{
                const myDiv = document.createElement('div')
                myDiv.className = 'box col-xl-4 col-md-6 col-12'
                myDiv.innerHTML = `
            <div class="productDiv">
               <img src="${item.image}" alt="">
              <div class="boxText">
                <h6>${item.title}</h6>
                <p>${item.price}$</p>
           
              </div>
         </div>
            
            `
                formProducts.appendChild(myDiv)
            })
        })
    }
}

selectValue.addEventListener('change', sortProductA)



function sortProductZ(){
    formProducts.innerHTML = ''
    let sortList = selectValue.value

    if(sortList === "3"){
        axios.get('https://655c84d425b76d9884fd7251.mockapi.io/product')
        .then(res =>{
            pro = res.data
            let sortData = pro.sort((a, b) => (b.title.localeCompare(a.title)))
            sortData.map(item =>{
                const myDiv = document.createElement('div')
                myDiv.className = 'box col-xl-4 col-md-6 col-12'
                myDiv.innerHTML = `
            <div class="productDiv">
               <img src="${item.image}" alt="">
              <div class="boxText">
                <h6>${item.title}</h6>
                <p>${item.price}$</p>
          
              </div>
         </div>
            
            `
                formProducts.appendChild(myDiv)
            })
        })
    }
}

selectValue.addEventListener('change', sortProductZ)


function sortPrice(){
    formProducts.innerHTML = ''
    let sortList = selectValue.value

    if(sortList === "4"){
        axios.get('https://655c84d425b76d9884fd7251.mockapi.io/product')
        .then(res =>{
            pro = res.data
            let sortData = pro.sort((a, b) => (b.price - a.price))
            sortData.map(item =>{
                const myDiv = document.createElement('div')
                myDiv.className = 'box col-xl-4 col-md-6 col-12'
                myDiv.innerHTML = `
            <div class="productDiv">
               <img src="${item.image}" alt="">
              <div class="boxText">
                <h6>${item.title}</h6>
                <p>${item.price}$</p>
         
              </div>
         </div>
            
            `
                formProducts.appendChild(myDiv)
            })
        })
    }
}

selectValue.addEventListener('change', sortPrice)



function sortPriceTwo(){
    formProducts.innerHTML = ''
    let sortList = selectValue.value

    if(sortList === "5"){
        axios.get('https://655c84d425b76d9884fd7251.mockapi.io/product')
        .then(res =>{
            pro = res.data
            let sortData = pro.sort((a, b) => (a.price - b.price))
            sortData.map(item =>{
                const myDiv = document.createElement('div')
                myDiv.className = 'box col-xl-4 col-md-6 col-12'
                myDiv.innerHTML = `
            <div class="productDiv">
               <img src="${item.image}" alt="">
              <div class="boxText">
                <h6>${item.title}</h6>
                <p>${item.price}$</p>
           
              </div>
         </div>
            
            `
                formProducts.appendChild(myDiv)
            })
        })
    }
}

selectValue.addEventListener('change', sortPriceTwo)
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


/// Add products display

const products = document.getElementById('products')
const btn = document.getElementById('btn')

let page = 1
let limit = 3
let pro = []

async function myFunc() {
    try {
        const response = await axios.get(`https://655c84d425b76d9884fd7251.mockapi.io/product?page=${page}&limit=${limit}`)
        const data = await response.data
        pro = data
        pro.map((item) => {
            const myDiv = document.createElement('div')
            myDiv.className = 'box col-xl-4 col-md-6 col-12'
            myDiv.innerHTML = `
            <div class="productDiv">
               <img src="${item.image}" alt="">
              <div class="boxText">
                <h6>${item.title}</h6>
                <p>${item.price}$</p>
                    <div class="twoBtn">              
                      <button id="add" onclick="addToBasket(${item.id})">Add basket <i class="fa-solid fa-heart-shopping"></i></button>
                      <button id="wish" onclick="addToWishlist(${item.id})"><i       class="fa-solid fa-heart"></i></button>
                    </div>
                </div>
            </div>
            
            `
            products.appendChild(myDiv)
        })
        page++

    }
    catch (error) {
        console.log(error);
    }
}

btn.addEventListener('click', myFunc)

function addToBasket(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    let countData = cart.find(item => item.id == id)
    if (countData) {
        countData.count = (countData.count || 1) + 1
    } else {
        cart.push(pro.find(item => item.id == id))
    }
    localStorage.setItem('cart', JSON.stringify(cart))
}


function addToWishlist(id) {
    let heart = JSON.parse(localStorage.getItem('heart')) || []
    let countData = heart.find(item => item.id == id)
    if (countData) {
        alert('Bu mehsul artiq wishlistde movcuddur!')
    } else {
        heart.push(pro.find(item => item.id == id))
        localStorage.setItem('heart', JSON.stringify(heart))
    }
}

myFunc()

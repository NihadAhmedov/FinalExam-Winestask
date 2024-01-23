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

///  basket

const basketList = document.getElementById('basketList')

function getProducts() {
    basketList.innerHTML = ''
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.map((item, index) => {
        if (item.count == undefined) {
            item.count = 1
        }
        const myDiv = document.createElement('div')
        myDiv.className = 'box col-xl-4 col-md-6 col-12'
        myDiv.innerHTML = `
        <div class="productDiv">
           <img src="${item.image}" alt="">
          <div class="boxText">
            <h6>${item.title}</h6>
            <p>${item.price}$</p>
            <p>count : ${item.count}</p>
        <div class="twoBtn">
           <button id="add" onclick="removeBasket(${index})">Remove basket <i class="fa-solid fa-trash"></i></button>
          
          </div>
          </div>
     </div>
        
        `
        basketList.appendChild(myDiv)
    })
}

function removeBasket(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    let cartItem = cart[index]
    if (cartItem && cartItem.count > 1) {
        cartItem.count--
    } else {
        cart.splice(index, 1)
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    getProducts()
}


getProducts()
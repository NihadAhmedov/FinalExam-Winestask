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

const wishList = document.getElementById('wishList')

function getProductsWish() {
    wishList.innerHTML = ''
    let heart = JSON.parse(localStorage.getItem('heart')) || []
    heart.map((item, index) => {
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
        <div class="twoBtn">
           <button id="add" onclick="removeWish(${index})">Remove wishlist <i class="fa-solid fa-trash"></i></button>
          
          </div>
          </div>
     </div>
        
        `
        wishList.appendChild(myDiv)
    })
}

function removeWish(index) {
    let heart = JSON.parse(localStorage.getItem('heart')) || []
    heart.splice(index, 1)
    localStorage.setItem('heart', JSON.stringify(heart))
    getProductsWish()
}


getProductsWish()
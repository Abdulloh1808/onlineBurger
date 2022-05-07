const product = {
    plainBurger: {
        name: 'GAMBURGER',
        price: 10000,
        amount: 0,
        kkal: 125,
        get sum() {
            return this.price * this.amount
        },
        get kkalSum() {
            return this.kkal * this.amount
        }
    },
    freshBurger: {
        name: 'GAMBURGER FRESH',
        price: 20500,
        amount: 0,
        kkal: 450,
        get sum() {
            return this.price * this.amount
        },
        get kkalSum() {
            return this.kkal * this.amount
        }
    },
    freshCombo: {
        name: 'FRESH COMBO ',
        price: 31900,
        amount: 0,
        kkal: 625,
        get sum() {
            return this.price * this.amount
        },
        get kkalSum() {
            return this.kkal * this.amount
        }
    },
}

const btn = document.querySelectorAll('.main__product-btn')

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function () {
        plusOrMinus(this)
    })
}

function plusOrMinus(el) {
    const parent = el.closest('.main__product'),
        num = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kkal = parent.querySelector('.main__product-kcall span'),
        symbol = el.getAttribute('data-symbol'),
        parentId = parent.getAttribute('id')

    if (symbol == '+' && product[parentId].amount < 10) {
        product[parentId].amount++
    } else if (symbol == '-' && product[parentId].amount > 0) {
        product[parentId].amount--
    }

    num.innerHTML = product[parentId].amount
    price.innerHTML = product[parentId].sum
    kkal.innerHTML = product[parentId].kkalSum
}


const mainProductInfo = document.querySelectorAll('.main__product-info'),
    view = document.querySelector('.view'),
    viewClose = document.querySelector('.view__close')

viewClose.onclick = () => view.classList.remove('active')
// viewClose.addEventListener('click',()=>  view.classList.remove('active'))


for (let i = 0; i < mainProductInfo.length; i++) {
    mainProductInfo[i].addEventListener('dblclick', function () {
        view.classList.add('active')
        img(this)
    })

}

function img(item) {
    const parent = item.closest('.main__product'),
        img = parent.querySelector('.main__product-img'),
        imgAtt = img.getAttribute('src'),
        viewImg = document.querySelector('.view img')
    viewImg.setAttribute('src', imgAtt)
}

const addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptWindowOut = document.querySelector('.receipt__window-out'),
    payBtn = document.querySelector('.receipt__window-btn')

addCart.addEventListener('click', function () {
    receipt.style = `display:flex`
    setTimeout(() => {
        receipt.style.opacity = `1`
        receiptWindow.style.top = '20%'
    }, 500);
    const objValue = Object.values(product).filter(a => a.amount)
    let text = ''
    let total = 0
    let kkal = 0
    for (let i = 0; i < objValue.length; i++) {
        if (objValue[i].amount > 0) {
            text += `   
        <div class="product">
           <span>${i + 1}.</span>
           <div class="product_name">${objValue[i].name}</div>
           <div class="product_amount">${objValue[i].amount} x ${objValue[i].price} = </div>
           <div class="product__price">${objValue[i].sum}</div>
       </div>`
        }
        total += objValue[i].sum
        kkal += objValue[i].kkalSum
    }
    total = ` 
<div class="total">
Total kkall : ${kkal} kkal
Total Price : ${total} sum
</div>
    `
    receiptWindowOut.innerHTML = text + total
})

payBtn.addEventListener('click', () => {
    location.reload()
})

const food = document.querySelector('.header__timer-extra'),
    timer = document.querySelector('.header__timer')
function rand(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
function color(r, g, b) {
    r = rand(0, 255)
    g = rand(0, 255)
    b = rand(0, 255)
    return `rgb(${r},${g},${b})`
}
function lvl() {
    food.innerHTML++
    if (food.innerHTML < 50) {
        setTimeout(() => {
            timer.style.color = color()
            lvl()
        }, 50);
    } else if (food.innerHTML < 100) {
        setTimeout(() => {
            timer.style.color = color()
            lvl()
        }, 100);
    }
}
lvl() 

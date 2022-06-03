
let label = document.getElementById("label")
let shoppingCart = document.getElementById("shopping-cart")

// Taking the data from the local storage
let basket = JSON.parse(localStorage.getItem("data")) || []

// Updating the number of picked items
let basketItems = () => {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML =  basket.map((item) => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
}
basketItems()

let generateCartItems = () => {
    if (basket.length !== 0){
        return shoppingCart.innerHTML = basket.map((item) => {
            let {id, quantity} = item;
            let productInfo = shopItemsData.find((product) => product.id === id) || []
            // console.log(productInfo)
            return `
            <div class="cart-item">
                <img width="100" src=${productInfo.img} alt="">
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${productInfo.name}</p>
                            <p class="cart-item-price">RON ${productInfo.price}</p>
                        </h4>
                        <i class="bi bi-x-lg" onclick="removeItem(${id})"></i>
                    </div>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                            ${item.quantity}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>

                    <h3>${quantity * productInfo.price}</h3>
                    </div>
            </div>
            `
        }).join("")
    }
    else{
        shoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="home-btn">Go back home</button>
        </a>
        `
    }
}

generateCartItems()

let increment = (id) => {
    let selectedItem = id
    let search = basket.find((item) => item.id === id)

    if(search === undefined){
        basket.push({
            id: id,
            quantity: 1,
        })
    }
    else{
        search.quantity+= 1
    }

    generateCartItems()
    updateQuantity(selectedItem)

    // Local Storage - we set the "data" object with a list of the objects containing "id" and "quantity"
    localStorage.setItem("data", JSON.stringify(basket))
}

let decrement = (id) => {
    let selectedItem = id
    let search = basket.find((item) => item.id === id)

    if (search === undefined) return
    else if(search.quantity === 0) return 
    else{
        search.quantity -= 1
    }


    updateQuantity(selectedItem)
    basket = basket.filter((item) => item.quantity != 0)

    generateCartItems()
        // Local Storage
    localStorage.setItem("data", JSON.stringify(basket))
}

let updateQuantity = (id) => {
    let search = basket.find((item) => item.id === id)
    // console.log(search.quantity);
    document.getElementById(id).innerHTML = search.quantity
    basketItems()
    totalAmount()
}

let removeItem = (id) => {
    let selectedItem = id
    basket = basket.filter((item) => item.id !== selectedItem)
    generateCartItems()
    totalAmount()
    basketItems()
    
    localStorage.setItem("data", JSON.stringify(basket))
}

let totalAmount = () => {
    if (basket.length !== 0){
        let amount = basket.map((item) => {
            let {id, quantity} = item
            let productInfo = shopItemsData.find((product) => product.id === id) || []
            return quantity * productInfo.price
        }).reduce((prevItem, currItem) => prevItem+currItem, 0)
        label.innerHTML = `
        <h2>Total Bill: RON ${amount}</h2>
        <button onclick="clearCart()" class="remove-all">Clear Cart</button>
        <button class="checkout">Finish order</button>
        `
    }
    else return
}

let clearCart = () =>{
    basket = []
    generateCartItems()
    basketItems()
    localStorage.setItem("data", JSON.stringify(basket))
}

totalAmount()
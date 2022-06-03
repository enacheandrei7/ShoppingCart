let shop = document.getElementById("shop");

// Here we get the "basket" lost of objects from the localStorage, in case there isn't a basket item (if it's the first time on site), we start with an empty lsit
let basket = JSON.parse(localStorage.getItem("data")) || []

let generateShop = () => {
  return (shop.innerHTML = shopItemsData.map((item) => {
    //   console.log(item);
      let {id, name, price, description, img} = item;
    //   Before we increment/decrement anything, the quantity of each item will be displayed as 0, so in order to avoid that we create a variable that checks if the id is in the "basket" list, if it is we put the quantity, if not then we let it 0 
      let search = basket.find((item) => item.id === id) || []
      console.log(search)
      return `
      <div id=product-id-${id} class="item">
              <img width="220" src=${img} alt="">
              <div class="details">
                  <h3>${name}</h3>
                  <p>${description}</p>
                  <div class="price-quantity">
                      <h2>RON ${price}</h2>
                      <div class="buttons">
                          <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                          <div id=${id} class="quantity">
                            ${search.quantity === undefined? 0 : search.quantity}
                          </div>
                          <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                      </div>
                  </div>
              </div>
          </div>
      `
  }).join(""));
};

generateShop();

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

        // Local Storage
    localStorage.setItem("data", JSON.stringify(basket))
}

let updateQuantity = (id) => {
    let search = basket.find((item) => item.id === id)
    // console.log(search.quantity);
    document.getElementById(id).innerHTML = search.quantity
    basketItems()
}


let basketItems = () => {
    let cartIcon = document.getElementById("cartAmount")
    cartIcon.innerHTML =  basket.map((item) => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);
}

basketItems()
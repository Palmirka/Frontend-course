let products = [];

function random_int () {
    return Math.floor(Math.random() * 50000)
}


function add_product (name, quan, date, stat) {
    let id = random_int();
    let obj = {
        'id': id,
        'name': name,
        'quan': quan,
        'date': new Date(date),
        'status': stat,
        'price': null
    }
    products.push(obj);
    return id
}

function remove_product (id) {
    products = products.filter(product => product['id'] != id)
}

function edit_product (id, param, value) {
    let product = products.find(x => x['id'] == id)
    if (product) {
        product[param] = value
    }
}

function swap_product (id_1, id_2) {
    let arr_id_1 = products.findIndex(x => x['id'] == id_1)
    let arr_id_2 = products.findIndex(x => x['id'] == id_2)
    let product = products[arr_id_1]
    products[arr_id_1] = products[arr_id_2]
    products[arr_id_2] = product
}

function buy_today (date = new Date()) {
    date.setHours(1, 0, 0, 0)
    return products.filter(product => product['date'].toString() == date.toString())
}

function add_price (id, price) {
    products[products.findIndex(x => x['id'] == id)]['price'] = price
}

function summary (date) {
    return buy_today(date).map(x => { 
        if (x['price'] === null) {
            return 0
        } else {
            return x['price']
        }
    }).reduce((a, b) => a + b, 0)
}

function format (fun, ids) {
    products = products.map(x => 
        {if (ids.includes(x['id'])) {fun(x)}
         else {x}
        })
}

let id_1 = add_product(1, 1, "2022-11-20", 1)
let id_3 = add_product(1, 1, "2022-11-20", 1)
let id_2 = add_product(1, 1, "2009-09-12", 1)
add_price(id_3, 10)
//console.log(buy_today(products[products.findIndex(x => x['id'] == id_1)]['date']))
summary(products[products.findIndex(x => x['id'] == id_1)]['date'])
console.log(products)
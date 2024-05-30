import { observer } from "mobx-react-lite"
import { makeAutoObservable } from "mobx"

class Cart {
    items = []

    constructor() {
        makeAutoObservable(this)
    }

    addItem() {
        this.secondsPassed += 1
    }

    emptyCart() {
        this.items = []
    }
}

const myCart = new Cart()
export myCart;
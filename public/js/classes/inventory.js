import ref from "../modules/ref.js";
import Gamestate from "../modules/gamestate.js";
import itemIndex from "../data/items/itemsindex.js";
import slot from "./slot.js";

export default class Inventory {
    constructor(slotcount) {
        this.inventoryDOM = ref.invList;
        this.slotCount = slotcount;
        this.init();
    }

    init() {
        this.renderInventory();
        console.log(Gamestate);
    }

    renderInventory() {
        this.inventoryDOM.innerHTML = "";
        for (let i = 0; i < this.slotCount; i++) {
            this.createSlot(i);
        }
    }

    addItem(name, amount) {
        let ginv = Gamestate.player.inventory;
        let existsInInventory = false;
        ginv.forEach((i) => {
            if (i.item.name == name) {
                i.count += amount;
                existsInInventory = true;
            }
        });

        if (!existsInInventory) {
            Gamestate.player.inventory.push(new slot(itemIndex[name], amount));
        }

        this.renderInventory();
    }

    createSlot(i) {
        let itemDiv = document.createElement("div");
        itemDiv.id = `item-${i}`;
        itemDiv.className = "item";

        let itemCountText = document.createElement("p");
        itemCountText.className = "popupCountText";

        let popUpDiv = document.createElement("div");
        popUpDiv.id = `popup-${i}`;
        popUpDiv.classList = "hidden";

        let popupHeader = document.createElement("p");

        if (Gamestate.player.inventory[i]) {
            console.log(Gamestate.player.inventory[i]);
            let pInv = Gamestate.player.inventory[i];

            itemCountText.innerHTML = pInv.count;
            itemDiv.style.backgroundImage = `url("${pInv.item.icon}")`;
            popupHeader.innerHTML = pInv.item.name;

            itemDiv.addEventListener("mouseenter", () => {
                popUpDiv.className = "popup";
            });
    
            itemDiv.addEventListener("mouseleave", () => {
                popUpDiv.className = "hidden";
            });
        }else {
            console.log("No item in inventory at this index");
        }


        popUpDiv.appendChild(popupHeader);
        itemDiv.appendChild(itemCountText);
        itemDiv.appendChild(popUpDiv);

        this.inventoryDOM.appendChild(itemDiv);
    }
}
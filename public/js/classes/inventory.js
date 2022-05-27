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
        this.handItemOnDragged();
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
        let popuprarity = document.createElement("p");
        let popupprice = document.createElement("p");

        if (Gamestate.player.inventory[i]) {
            let pInv = Gamestate.player.inventory[i];

            itemCountText.innerHTML = pInv.count;
            itemDiv.style.backgroundImage = `url("${pInv.item.icon}")`;
            popupHeader.innerHTML = "Name: " + pInv.item.name;
            popuprarity.innerHTML = "Rariry: " + pInv.item.rarity;
            popupprice.innerHTML = "Price: " + pInv.item.price + "G";

            itemDiv.addEventListener("mouseenter", () => {
                popUpDiv.className = "popup";
            });
    
            itemDiv.addEventListener("mouseleave", () => {
                popUpDiv.className = "hidden";
            });

            itemDiv.addEventListener("dragstart", () => {
                console.log("Dragging");
                ref.itemOnDragged.className = "itemOnDragged";
            });

            itemDiv.addEventListener("dragend", () => {
                console.log("Dragging");
                ref.itemOnDragged.className = "itemOnDragged hidden";
                document.addEventListener('mousemove', function(e) {
                    ref.itemOnDragged.style.left = e.pageX + 'px';
                    ref.itemOnDragged.style.top = e.pageY + 'px';
                  });
            });
        }


        popUpDiv.appendChild(popupHeader);
        popUpDiv.appendChild(popupprice);
        popUpDiv.appendChild(popuprarity);

        itemDiv.appendChild(itemCountText);
        itemDiv.appendChild(popUpDiv);

        this.inventoryDOM.appendChild(itemDiv);
    }

    handItemOnDragged() {
        document.addEventListener('mousemove', function(e) {
            ref.itemOnDragged.style.left = e.pageX + 'px';
            ref.itemOnDragged.style.top = e.pageY + 'px';
          });
    }
}
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

        let interactPopUp = document.createElement("div");
        interactPopUp.className = "interactPopUp hidden";

        let interactPopUpExitButton = document.createElement("button");
        interactPopUpExitButton.className = "interactPopUpExitButton";
        let interactPopUpEquipButton = document.createElement("button"); // Changeable depending on usable or equipable
        interactPopUpEquipButton.className = "interactPopUpEquipButton";

        // TODO: Add sell button ?

        interactPopUpExitButton.innerHTML = "X";
        interactPopUpEquipButton.innerHTML = "Equip";

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

            itemDiv.addEventListener("click", (e) => {
                interactPopUp.className = "interactPopUp";
            });

            interactPopUpExitButton.addEventListener("click", () => {
                setTimeout(() => {
                    interactPopUp.className = "interactPopUp hidden";
                }, 25);
            });

            interactPopUpEquipButton.addEventListener("click", () => {
                console.log("Equip os use");
            });
        }


        popUpDiv.appendChild(popupHeader);
        popUpDiv.appendChild(popupprice);
        popUpDiv.appendChild(popuprarity);

        interactPopUp.appendChild(interactPopUpExitButton);
        interactPopUp.appendChild(interactPopUpEquipButton);

        itemDiv.appendChild(interactPopUp);
        itemDiv.appendChild(itemCountText);
        itemDiv.appendChild(popUpDiv);

        this.inventoryDOM.appendChild(itemDiv);
    }
}
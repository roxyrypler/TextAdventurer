import item from "../../classes/item.js";

export default {
    GoldCoin: new item(
        "GoldCoin",
        "./assets/items/gold-coin.png",
        "Common",
        1
    ),
    Armor1: new item(
        "Armor1",
        "./assets/items/ARMORS/ARMOR 1.png",
        "Rare",
        10
    ),
    Armor2: new item(
        "Armor2",
        "./assets/items/ARMORS/ARMOR 2.png",
        "Epic",
        100
    ),
    Armor3: new item(
        "Armor3",
        "./assets/items/ARMORS/ARMOR 3.png",
        "Legendary",
        1000
    )
}
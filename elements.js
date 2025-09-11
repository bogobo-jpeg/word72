export const initialElements = ["Water", "Fire", "Earth", "Wind"];

export const recipes = {
    "Water": {
        "Fire": "Steam",
        "Earth": "Mud",
        "Wind": "Rain"
    },
    "Fire": {
        "Earth": "Lava",
        "Wind": "Smoke"
    },
    "Earth": {
        "Wind": "Dust"
    },
    "Steam": {
        "Earth": "Geyser"
    },
    "Mud": {
        "Fire": "Brick"
    }
    // Add more recipes here...
};


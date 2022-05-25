/*
import { join, dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const devQuestFile = join(__dirname, '../../DB/quests/devquest.json');

const devQuestAdapter = new JSONFile(devQuestFile);

const devQuestDB = new Low(devQuestAdapter);

await devQuestDB.read();

let GetQuest = (data) => {
    // TODO: Based on data, return the appropriate quest
    return devQuestDB.data;
}

export default {
    GetQuest
}
*/
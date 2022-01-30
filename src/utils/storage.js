import { getUserFollowers, getUserFollowing } from "./api.js";

const getStorage = async (key) => {
    const p = new Promise((resolve, _) => {
        chrome.storage.local.get(key, (options) => {
            resolve(options);
        });
    });
    return await p;
};

/*
username - getfromstorage - return
if null - getFunction - return 
*/
export const getOrSet = async (getRequest, userName, forFollowers) => {
    const people = await getStorage(userName);

    if (Object.keys(people).length !== 0) {
        return people[userName];
    }
    // no stored values
    const users = forFollowers
        ? await getRequest(getUserFollowers, userName)
        : await getRequest(getUserFollowing, userName);
    await chrome.storage.local.set({ [userName]: users });
    return users;
};

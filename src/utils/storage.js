import { getUserFollowers, getUserFollowing } from "./api.js";

/**
 * Returns cached user's mutual followers
 *
 * @param {string} key key to fetch from local db
 * @return {Promise} Resolved promise if user details are cached
 */
const getStorage = async (key) => {
    const p = new Promise((resolve, _) => {
        chrome.storage.local.get(key, (options) => {
            resolve(options);
        });
    });
    return await p;
};

/**
 * Returns users array based on input request
 *
 * @param {number} getRequest request to await
 * @param {string} userName GitHub username to fetch details for 
 * @param {boolean} forFollowers flag to indicate if request is for followers or following
 * @return {Array<object>} Array of users returned if cached else logged and returned
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

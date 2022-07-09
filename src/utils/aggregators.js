import { getOrSet } from "./storage.js";

/**
 * Returns user followers/following list from all pages of GitHub API
 *
 * @param {getRequest} request to await
 * @param {userName} userName to fetch details for
 * @return {Array<object>} User's followers/following array
 */
const getMultiPageResponse = async (getRequest, userName) => {
    let page = 1;
    const results = [];

    while (true) {
        const nextPage = await getRequest(userName, page++);
        if (nextPage.length === 100) {
            results.push(...nextPage);
            continue;
        } else if (nextPage.length < 100 && nextPage.length > 1) {
            results.push(...nextPage);
            break;
        }
        break;
    }
    return results;
};

/**
 * Returns mutual followers for current user 
 *
 * @param {string} clientName logged in user to fetch details for
 * @param {string} currentUser current page's user to fetch details for
 * @return {Array<object>} Client's followers which are in current user's following
 */
export const getOverlap = async (clientName, currentUser) => {
    if (clientName === currentUser) return [];
    const followers = await getOrSet(getMultiPageResponse, clientName, false);
    const following = await getOrSet(getMultiPageResponse, currentUser, true);
    const OVERFLOW_COUNT = 13;

    const filtered = [];

    for (const followee of following) {
        for (const follower of followers) {
            if (followee.login === follower.login) {
                filtered.push(followee);
                break;
            }
        }
    }
    const remainingMutualFollowers = filtered.length - OVERFLOW_COUNT;
    return {
        commonFollowers: filtered.slice(0, OVERFLOW_COUNT),
        remainingMutualFollowers:
            remainingMutualFollowers > 0 ? remainingMutualFollowers : 0,
    };
};

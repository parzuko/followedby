/**
 * Returns user following list from GitHub API
 *
 * @param {string} username userName to fetch details for
 * @param {number} pageNumber pageNumber for paginated requests
 * @return {Array<object>} User's following array
 */
export const getUserFollowing = async (userName, pageNumber) => {
    const response = await fetch(
        `https://api.github.com/users/${userName}/following?per_page=100&page=${pageNumber}`
    );
    return await response.json();
};

/**
 * Returns user followers list from GitHub API
 *
 * @param {string} username userName to fetch details for
 * @param {number} pageNumber pageNumber for paginated requests
 * @return {Array<object>} User's followers array
 */
export const getUserFollowers = async (userName, pageNumber) => {
    const response = await fetch(
        `https://api.github.com/users/${userName}/followers?per_page=100&page=${pageNumber}`
    );
    return await response.json();
};

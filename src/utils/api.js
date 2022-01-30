export const getUserFollowing = async (userName, pageNumber) => {
    const response = await fetch(
        `https://api.github.com/users/${userName}/following?per_page=100&page=${pageNumber}`
    );
    return await response.json();
};

export const getUserFollowers = async (userName, pageNumber) => {
    const response = await fetch(
        `https://api.github.com/users/${userName}/followers?per_page=100&page=${pageNumber}`
    );
    return await response.json();
};

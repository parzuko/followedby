const clientName = document.querySelector('meta[name="user-login"]').content;
const currentUser = window.location.pathname.slice(1);

const followCountTag = document.querySelector(".vcard-details");

const getUserFollowing = async (userName, pageNumber) => {
    const response = await fetch(
        `https://api.github.com/users/${userName}/following?page=${pageNumber}`
    );
    return await response.json();
};

const getUserFollowers = async (userName, pageNumber) => {
    const response = await fetch(
        `https://api.github.com/users/${userName}/followers?page=${pageNumber}`
    );
    return await response.json();
};

const getMultiPageResponse = async (getRequest, userName) => {
    let page = 1;
    const results = [];

    while (true) {
        const nextPage = await getRequest(userName, page++);
        if (nextPage.length === 30) {
            results.push(...nextPage);
            continue;
        } else if (nextPage.length < 30 && nextPage.length > 1) {
            results.push(...nextPage);
            break;
        }
        break;
    }
    return results;
};

const getOverlap = async () => {
    const followers = await getMultiPageResponse(getUserFollowing, clientName);
    const following = await getMultiPageResponse(getUserFollowers, currentUser);

    console.log(followers, following);

    const filtered = [];

    for (const followee of following) {
        for (const follower of followers) {
            if (followee.login === follower.login) {
                filtered.push(followee);
                break;
            }
        }
    }
    return filtered;
};

const tag = document.createElement("p");
const text = document.createTextNode("No followers in common");
tag.appendChild(text);

followCountTag.insertBefore(tag, followCountTag.childNodes[0]);

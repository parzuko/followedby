const clientName = document.querySelector('meta[name="user-login"]').content;
const currentUser = window.location.pathname.slice(1);

const followCountTag = document.querySelector(".vcard-details");

const getUserFollowing = async (userName, pageNumber) => {
    const response = await fetch(
        `https://api.github.com/users/${userName}/following?per_page=100&page=${pageNumber}`
    );
    return await response.json();
};

const getUserFollowers = async (userName, pageNumber) => {
    const response = await fetch(
        `https://api.github.com/users/${userName}/followers?per_page=100&page=${pageNumber}`
    );
    return await response.json();
};

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

const getStorage = async (key) => {
    const p = new Promise(function (resolve, reject) {
        chrome.storage.local.get(key, function (options) {
            resolve(options);
        });
    });
    return await p;
};

/*
username - getfromstorage - return
if null - getFunction - return 
*/
const getOrSet = async (getRequest, userName, forFollowers) => {
    const people = await getStorage(userName);
    if (Object.keys(people).length !== 0) {
        return people;
    }
    // no stored values
    const users = forFollowers
        ? await getRequest(getUserFollowers, userName)
        : await getRequest(getUserFollowing, userName);
    console.log(users);
    const data = { userName: users };
    chrome.storage.local.set(data);
    return users;
};

const getOverlap = async () => {
    if (clientName === currentUser) return;
    const followers = await getOrSet(getMultiPageResponse, clientName, false);
    const following = await getOrSet(getMultiPageResponse, currentUser, true);

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

const tag = document.createElement("div");
const text = document.createTextNode("No followers in common");
tag.appendChild(text);

followCountTag.insertBefore(tag, followCountTag.childNodes[0]);

getOverlap().then((common) => {
    tag.innerHTML = "";
    return common.map(
        (person) =>
            (tag.innerHTML += `
            <a href=${person.html_url}>
                <img src=${person.avatar_url} height=30 width=30 style="border-radius: 50%;"/>
            </a>
`)
    );
});

// (async () => {
//     await getOverlap();
// })();

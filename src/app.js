import { getOverlap } from "./modular.js";
const clientName = document.querySelector('meta[name="user-login"]').content;
const currentUser = window.location.pathname.slice(1);

const followCountTag = document.querySelector(".vcard-details");

export default (async () => {
    const tag = document.createElement("div");
    const text = document.createTextNode("No followers in common");
    tag.appendChild(text);

    followCountTag.insertBefore(tag, followCountTag.childNodes[0]);

    const commonFollowers = await getOverlap(clientName, currentUser);

    if (commonFollowers.length === 0) {
        return;
    }

    tag.innerHTML = "";
    return commonFollowers.map(
        (person) =>
            (tag.innerHTML += `
            <a href=${person.html_url}>
                <img src=${person.avatar_url} height=30 width=30 style="border-radius: 50%;"/>
            </a>`)
    );
})();

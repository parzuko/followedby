import { getOverlap } from "./utils/aggregators.js";
import { createFollowerCTA, showRemainingFollwers } from "./utils/views.js";

const clientName = document.querySelector('meta[name="user-login"]').content;
const currentUser = window.location.pathname.slice(1);
const followCountTag = document.querySelector(".vcard-details");

export default (async () => {
    const { commonFollowers, remainingMutualFollowers } = await getOverlap(
        clientName,
        currentUser
    );
    if (commonFollowers.length < 1) return;

    const commonFollowersSection = document.createElement("section");
    commonFollowersSection.className = "hide-sm hide-md";

    followCountTag.insertBefore(
        commonFollowersSection,
        followCountTag.childNodes[0]
    );

    commonFollowersSection.innerHTML = `
        <h2 class="h4 d-flex flex-items-start mb-2">Followed By</h2>
             ${commonFollowers
                 .map(follower => createFollowerCTA(follower))
                 .join("")}
             ${showRemainingFollwers(remainingMutualFollowers)}
        <div class="border-top color-border-muted pt-3 mt-3 clearfix hide-sm hide-md"></div>
    `;
})();
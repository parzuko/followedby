import { getOverlap } from "./utils/aggregators.js";

const clientName = document.querySelector('meta[name="user-login"]').content;
const currentUser = window.location.pathname.slice(1);
const followCountTag = document.querySelector(".vcard-details");

/*
  Hide some if greater than 13 common
  Hide in mobile
  Hide if none 
 */

const createFollowerCTA = follower => {
    const { login, avatar_url } = follower;
    return `
        <a class="avatar-group-item" data-hovercard-type="user">
            <img/>
        </a>
    `;
};

export default (async () => {
    const { commonFollowers, remainingMutualFollowers } = await getOverlap(
        clientName,
        currentUser
    );
    if (commonFollowers.length < 1) return;

    const commonFollowersSection = document.createElement("section");
    followCountTag.insertBefore(
        commonFollowersSection,
        followCountTag.childNodes[0]
    );

    commonFollowersSection.innerHTML = `
        <h2 class="h4 d-flex flex-items-start mb-2">Followed By</h2>
             ${commonFollowers
                 .map(
                     follower =>
                         `<a class="avatar-group-item" data-hovercard-type="user" data-hovercard-url="/users/${follower.login}/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="/${follower.login}">
                         <img class="avatar avatar-user ml-1" src="${follower.avatar_url}" width="35" height="35" alt="@${follower.login}">
                    </a>`
                 )
                 .join("")}
        
             ${
                 remainingMutualFollowers > 0
                     ? `<div
                         class="d-inline-block border text-center rounded-2 v-align-middle"
                         style="width:35px;height:35px;line-height:33px;"
                     >
                         <a
                             href="?tab=followers"
                             class="no-underline text-small color-fg-muted"
                         >
                             +${remainingMutualFollowers}
                         </a>
                     </div>`
                     : ""
             }
          
          <div class="border-top color-border-muted pt-3 mt-3 clearfix hide-sm hide-md">
      </div>
    `;
})();

// avatar_url: "https://avatars.githubusercontent.com/u/27439197?v=4"
// events_url: "https://api.github.com/users/preetjdp/events{/privacy}"
// followers_url: "https://api.github.com/users/preetjdp/followers"
// following_url: "https://api.github.com/users/preetjdp/following{/other_user}"
// gists_url: "https://api.github.com/users/preetjdp/gists{/gist_id}"
// gravatar_id: ""
// html_url: "https://github.com/preetjdp"
// id: 27439197
// login: "preetjdp"
// node_id: "MDQ6VXNlcjI3NDM5MTk3"
// organizations_url: "https://api.github.com/users/preetjdp/orgs"
// received_events_url: "https://api.github.com/users/preetjdp/received_events"
// repos_url: "https://api.github.com/users/preetjdp/repos"
// site_admin: false
// starred_url: "https://api.github.com/users/preetjdp/starred{/owner}{/repo}"
// subscriptions_url: "https://api.github.com/users/preetjdp/subscriptions"
// type: "User"
// url: "https://api.github.com/users/preetjdp"

// export default (async () => {
//     // Create Dom Elements
//     const heading = document.createElement("h4")
//     const headingText = document.createTextNode("Mutual Followers");
//     heading.appendChild(headingText)
//     heading.style = "display: flex; flex-direction: column;"

//     const tag = document.createElement("div");
//     const text = document.createTextNode("No followers in common");
//     tag.appendChild(text);
//     tag.style = "display: flex; align-items: center; justify-content: space"

//     // Insert Tags to DOM
//     followCountTag.insertBefore(heading, followCountTag.childNodes[0]);
//     heading.insertAdjacentElement("afterend", tag)

//     // ✨ Magic ✨
//     const commonFollowers = await getOverlap(clientName, currentUser);

//     if (commonFollowers.length === 0) return;

//     tag.innerHTML = "";
//     commonFollowers.slice(0, 3).map(
//         (person) =>
//             (tag.innerHTML += `
//             <a key=${person.login} href=${person.html_url} class="avatar-group-item" data-hovercard-type="user" data-hovercard-url="/users/${person.login}/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self">
//                 <img src=${person.avatar_url} alt="@${person.login}"height=35 width=35 style="border-radius: 50%;"/>
//             </a>`)
//     );

//     tag.innerHTML += `<div class="d-inline-block border text-center rounded-2 v-align-middle" style="width:35px;height:35px;line-height:33px;">
//     <a href="/sponsors/fabpot#sponsors" class="no-underline text-small color-fg-muted">
//       +40
//     </a>
//   </div>`

// })();

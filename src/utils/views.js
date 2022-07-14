/**
 * Returns CTA image based on input follower object
 *
 * @param {object} follower object from the GitHub API
 * @return {HTMLAnchorElement} HTML anchor tag redirecting to mutual follower profiles
 */
export const createFollowerCTA = follower => {
    const { login, avatar_url } = follower;
    return `
        <a class="avatar-group-item" data-hovercard-type="user" data-hovercard-url="/users/${login}/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="/${login}">
            <img class="avatar avatar-user ml-1" src="${avatar_url}" width="35" height="35" alt="@${login}">
        </a>
    `;
};

/**
 * Returns a +n badge if any followers are hidden
 *
 * @param {number} remainingMutualFollowers The number of hidden followers
 * @return {HTMLDivElement} HTML div with a +n badge
 */
export const showRemainingFollwers = remainingMutualFollowers => {
    if (remainingMutualFollowers < 1) return ``;
    const excessCount =
        remainingMutualFollowers >= 999 ? 999 : remainingMutualFollowers;
    return `
        <div class="d-inline-block border text-center rounded-2 v-align-middle" style="width:35px;height:35px;line-height:33px;">
            <a href="?tab=followers" class="no-underline text-small color-fg-muted">
                +${excessCount}
            </a>
        </div>
    `;
};

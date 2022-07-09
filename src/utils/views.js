export const createFollowerCTA = follower => {
    const { login, avatar_url } = follower;
    return `
        <a class="avatar-group-item" data-hovercard-type="user" data-hovercard-url="/users/${login}/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="/${login}">
            <img class="avatar avatar-user ml-1" src="${avatar_url}" width="35" height="35" alt="@${login}">
        </a>
    `;
};

export const showRemainingFollwers = remainingMutualFollowers => {
    if (remainingMutualFollowers < 1) return ``;
    return `
        <div class="d-inline-block border text-center rounded-2 v-align-middle" style="width:35px;height:35px;line-height:33px;">
            <a href="?tab=followers" class="no-underline text-small color-fg-muted">
                +${remainingMutualFollowers}
            </a>
        </div>
    `;
};
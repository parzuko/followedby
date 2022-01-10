const clientName = document.querySelector('meta[name="user-login"]').content;
const currentUser = window.location.pathname.slice(1);

const followCountTag = document.querySelector(".vcard-details");

const tag = document.createElement("p");
const text = document.createTextNode("No followers in common");
tag.appendChild(text);

followCountTag.insertBefore(tag, followCountTag.childNodes[0]);

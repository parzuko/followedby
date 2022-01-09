const clientName = document.querySelector('meta[name="user-login"]').content;
const currentUser = window.location.pathname.slice(1);

let clientFollowing = [];
let userFollowers = [];

fetch(`https://api.github.com/users/${clientName}/following?per_page=100`)
    .then((response) => response.json())
    .then((data) => {
        clientFollowing = [...data];
    })
    .catch((error) => console.error(error));

fetch(`https://api.github.com/users/${currentUser}/followers?per_page=100`)
    .then((response) => response.json())
    .then((data) => {
        userFollowers = [...data];
        const filteredArray = clientFollowing.filter((value) =>
            userFollowers.includes(value)
        );
    })
    .catch((error) => console.error(error));

// console.log(clientFollowing, userFollowers);
// console.log(clientFollowing);

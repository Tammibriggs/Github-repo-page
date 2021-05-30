const navRepos = document.getElementById("nav-repos")
const appender = document.getElementById("appender")
const navProfilePic = document.getElementById("profile-image")
const activeNav = document.getElementsByClassName("active-nav")

/* geting the object data object stored in sessionStorage */
const repoData = JSON.parse(sessionStorage.getItem("repoData"))

console.log(repoData)
const repositories = repoData.repositories

/* creating a span element and appending it to the activenav element */ 
for(elem of activeNav){
    const span = document.createElement('span')
    span.innerHTML = repositories.totalCount
    elem.appendChild(span)
}

/* assinging the url of the navigation profile picture to image source attribuute */
navProfilePic.src = repoData.avatarUrl

const profileDetail = `
    <div class="profile-detail">
        <img src="${repoData.avatarUrl}" class="profile-img profile-image">
        <span>${repoData.login}</span>
        <div class="profile-desc">
            <p>${repoData.bio}</p>
        </div>
    </div>`

appender.insertAdjacentHTML("afterend",profileDetail)


/* generates the repository section of the page */
repositories.nodes.map((items) => {

    const divRepo = `
    <div class="div-repo">
        <div class="repo">

            <div>
                <a href="#"><p>${items.name}</p></a>
                <p id="repo-description">${items.description}</p>
                <span><span id="language-color" style="background-color:${items.primaryLanguage.color}"></span>${items.primaryLanguage.name}</span>
                <span id="span-date"></span>
            </div>

            <button><img src="images/star.svg">Star</button>
        </div>
    </div>`
    navRepos.insertAdjacentHTML("afterend", divRepo)

    let description = document.getElementById("repo-description")
     if(items.description === null){
        description.style.display = "none"
    }
})


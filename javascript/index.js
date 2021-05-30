import Github_token from './github-token.js'

const input = document.getElementById('user-input')
const info = document.getElementById('info')
const loginButton = document.getElementById('submit-button')
const baseUrl = "https://api.github.com/graphql"

loginButton.addEventListener('click', getUserRepo)

/* This fucntion check if the input value is empty
    if YES show an erroe and if NO fetches the the user name from Github Graphql api
*/
function getUserRepo(){

    let inputValue = input.value

    const headers = {
        Accept: 'application/json',
        "Content-Type" : "application/json",
        Authorization : "bearer " + Github_token,
    }

    const body = {
        "query":`
        query{
            user(login:"${inputValue}"){
            login
            bio
            avatarUrl
            repositories(first: 15) {
                totalCount
                nodes {
                    name, 
                    description,
                    primaryLanguage{
                        color
                        name
                    }
                    forkCount
                    stargazerCount
                }
            }
            }
        }`
    }

    if(inputValue === ""){
        info.innerHTML = "input should not be empty"
    }else{
        fetch(baseUrl, {
            method : "POST",
            headers : headers,
            body: JSON.stringify(body),
        })
        .then(response => {
            response.json()
            .then((responseData) =>{
                const repoUser = responseData.data.user
                if(repoUser === null){
                   info.innerHTML = `User "${inputValue}" does not exist`
                }else{
                    sessionStorage.setItem("repoData", JSON.stringify(repoUser)) 
                    window.location.href = "repositories.html"
                }
               
            })
        })
        .catch(error => info.innerHtml = "check your internet connection")
    }
  
}

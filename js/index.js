
document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'https://api.github.com/search/users';
    const reposUrl = 'https://api.github.com/users/'
    const reposSearch = 'https://api.github.com/search/repositories?q='

    const submitForm = document.getElementById('github-form');
    const searchQuery = document.getElementById('search');
    const userNameContainer = document.querySelector('#user-list');
    const reposContainer = document.querySelector('#repos-list')
    const checkBox = document.getElementById('search-repo');

    const searchRepos = (searchQuery) => {
        searchQuery = searchQuery.split(' ').join('+');
        fetch(reposSearch + searchQuery)
        .then(response => response.json())
        .then(data => justRepos(data))
    }
    const retrieveData = (nameValue) => {
        fetch(baseUrl + `?q=${nameValue}`)
        .then(response => response.json())
        .then(data => displayData(data))
    }
    const retrieveRepos = (selectedUser, e) => {
        fetch(reposUrl + `${selectedUser}/repos`)
        .then(response => response.json())
        .then(data => displayRepos(data, e))
        
    }
    const displayData = (data) => {
        console.log(data)
        for (let i = 0; i < data.items.length; i++) {
            let newItem = document.createElement('li')
            let avatar = document.createElement('img')
            let refLink = document.createElement('p')

            avatar.src = data.items[i].avatar_url
            newItem.innerHTML =  data.items[i].login
            refLink.innerHTML = `<a href=${data.items[i].html_url}>See Profile</a>`


            avatar.style.width = '50px';
            avatar.style.marginLeft = '100px';
            refLink.style.marginLeft = '100px';
            refLink.style.display = 'inline-block';

            newItem.appendChild(refLink)
            newItem.appendChild(avatar)

            userNameContainer.appendChild(newItem)

            newItem.addEventListener('click', (e) => {
                retrieveRepos(data.items[i].login, e)
            })
        }
        
            
        
    }
    const displayRepos = (data, e) => {
        let newUL = document.createElement('ul')
        e.target.appendChild(newUL)
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].name)
            let repo = document.createElement('li')

            repo.innerHTML = data[i].name

            newUL.appendChild(repo)
            
        }

    }
    const justRepos = (data) => {
        for (let i = 0; i < data.items.length; i++) {
            let newItem = document.createElement('li');

            newItem.innerHTML = data.items[i].name
            
            reposContainer.appendChild(newItem)
        }
    }
    
    submitForm.addEventListener('submit', (e) => {
        e.preventDefault()
        if (checkBox.checked) {
            searchRepos(searchQuery.value);
        } else {
            retrieveData(searchQuery.value);
        }
        
        
    })
    
})


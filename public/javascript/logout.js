
const logout = async() => {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: {'Content-Type': 'application/json'}
    });

    if(response.ok)
    {
        document.location.replace('/posts');
    }
    else
    {
        console.log(response.statusText);
    }
} 

document.querySelector('#logout').addEventListener('click', logout);
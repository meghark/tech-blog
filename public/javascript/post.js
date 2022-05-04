//To do
//Save post
//Update post
//Delete post

const newPostEventHandler = async() =>{
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-message').value.trim();

    if(title && content)
    {
            const response =  await fetch('/api/posts',{
                method: 'POST',
                body: JSON.stringify({
                    title,
                    content
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if(response.ok)
        {
        document.location.replace('/dashboard/');
        }
        else{
        console.log(response.statusText);
        }
    }
    
}

document.querySelector('.post-form').addEventListener('submit', newPostEventHandler);


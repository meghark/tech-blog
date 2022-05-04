const updatePostEventHandler = async() =>{
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-message').value.trim();
    const post_id=  window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response =  await fetch(`/api/posts/${post_id}`,{
                                method: 'PUT',
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

const deletePostEventHandler = async() =>{
    event.preventDefault();

    const post_id=  window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response =  await fetch(`/api/posts/${post_id}`,{
                                method: 'DELETE',
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


document.querySelector('.post-update-form').addEventListener('submit',updatePostEventHandler);
document.querySelector('.delete-button').addEventListener('click',deletePostEventHandler );
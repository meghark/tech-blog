const commentFormHandler = async() => {
    event.preventDefault();

    const note = document.querySelector('#comment-message').value.trim();
    //The url contains the post id. Split the url by / then
    //get the item in last index
    const post_id = window.location.toString()
                        .split('/')[window.location.toString().split('/').length - 1];

    //Saving a new post record also requires the user_id, the api method
    //will have access to session information with user details
    if(note)
    {
        const response =await fetch('/api/comments',{
                method: 'POST',
                body: JSON.stringify({
                    post_id,
                    note
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

         if(response.ok)
        {
            document.location.reload();
        }
        else{
            console.log(response.statusText);
        }

    }

};


document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);

const loginFormHandler =async () =>{

    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#pass-login').value.trim();

    if(email && password)
    {
        const result = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if(result.ok)
        {
            console.log('Login Successfull');
        }
        else{
            console.log(result.statusText);
        }
    }
};

//Method to add a new user
const signUpFormHandler =async () => {
    event.preventDefault();

    const username = document.querySelector('#user-name').value.trim();
    const email  = document.querySelector('#email').value.trim();
    const password = document.querySelector('#pass').value.trim();

    //All 2 fields are required to create the user.
    if(username && email && password)
    {
        const result =await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if(result.ok)
        {
            console.log('User sign up completed successully');
        }
        else{
            console.log(result.statusText);
        }

        
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.sign-up-form').addEventListener('submit', signUpFormHandler);
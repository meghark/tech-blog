
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
            document.location.replace('/');
        }
        else{
            console.log(result.statusText);
        }
    }
};


document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

import React, { useState } from 'react';
import { Container, CssBaseline, FormControl, TextField, Button, Typography } from '@mui/material';
import Map from './Map'

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitted, setisSubmitted] = useState(false)
    // Function to handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log("Form submitted");
        console.log("Name:", name);
        console.log("Email:", email);
        const UserData = {
            name:name,
            email:email,
        }
        const result = await fetch('http://localhost:8000/create',{
            headers:{
                'Content-Type':'Application/json'
            },
            method:'POST',
            body: JSON.stringify(UserData)
        })
        const res = await result.json();
        if(res === "ok"){
            setisSubmitted(true)
        }
    }

    return (
        <>
        {!isSubmitted ? (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm" sx={{height: '100vh' }}>
                    <Typography variant='h3' sx={{px:'20px', py:'15px'}}>
                        Create an Account
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth size='sm'>
                            <TextField
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                id="name"
                                label="Name"
                                variant="standard"
                                sx={{ py: '10px' }}
                            />
                            <TextField
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                id="email"
                                label="Email"
                                variant="standard"
                                sx={{ py: '10px' }}
                            />
                            
                            <Button
                                type='submit'
                                variant="contained"
                                sx={{ mt: '20px' }}
                            >
                                Submit
                            </Button>
                        </FormControl>
                    </form>
                </Container>
            </React.Fragment>
        ) :(
            <Map name={name} />
        )}
        </>
    );
}

export default SignUp;

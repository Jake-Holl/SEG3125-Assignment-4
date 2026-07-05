import {Backdrop, Box, Rating, TextField, Typography, Button} from '@mui/material'
import { useState } from 'react'

function Survey({show, setShow}){

    return (
        <Box>
            {show && <Backdrop open={true}>
                <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', boxShadow:5, p:2, borderRadius:5, bgcolor:"#fff", pointerEvents:'auto'}}>
                    <Typography align='center' variant='h4' sx={{pb:2}}>Purchase Successful!</Typography>
                    <Typography align='center' variant='h5'>Please rate your experience</Typography>
                    <Rating sx={{m:2}} />
                    <TextField label='Suggestions' multiline rows={4}/>
                    <Button onClick={() => {setShow(false)}} variant='contained' sx={{m:2}}>Submit</Button>
                </Box>
            </Backdrop>}
        </Box>
    )
}

export default Survey
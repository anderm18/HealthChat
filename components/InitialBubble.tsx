import React from 'react';
import { Box, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';


export default function BubInit() {

    return(
        <Box sx={{width: '100vw'}}>
            <Typography variant="h6" align="center" sx={{paddingTop: '20px'}}>
                <Box sx={{border: 'solid', borderColor: '#0a0c0f', borderWidth: '5px', borderRadius: '25px', marginLeft: '10%', marginRight: '10%', backgroundColor: '#0a0c0f', fontWeight: 'bold', position: 'relative'}}>
                    <InfoIcon sx={{position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', marginLeft: '10px'}}/>
                    <Typography align='left' sx={{marginLeft: '50px', marginRight: '10px' }}>
                        Hello! What would you like to do today? I can help find you a physician, or maybe answer other questions you may have. Just say: "Find me a doctor" or "I have a question."
                    </Typography>
                </Box>
            </Typography>
        </Box>
    );

}
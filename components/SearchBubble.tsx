import { Box, Button, Typography } from "@mui/material";
import React from "react";
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from "react";



export default function searchBubble() {
    const [isVisible, setIsVisible] = useState(false);
    const [isServer, setIsServer] = useState(true);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return(
        <Box sx={{width: '100vw'}} style={{opacity: `${isVisible ? '1' : '0'}`, transition: 'opacity 1.0s ease-in-out'}}>
            <Typography variant="h6" align="center" sx={{paddingTop: '20px'}}>
                <Box sx={{paddingTop: '5px', paddingBottom: '5px', border: 'solid', borderColor: '#0a0c0f', borderWidth: '5px', borderRadius: '25px', marginLeft: '10%', marginRight: '10%', backgroundColor: '#0a0c0f', fontWeight: 'bold', position: 'relative'}}>
                    <InfoIcon sx={{position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', marginLeft: '10px'}}/>
                    <Typography align='left' sx={{marginLeft: '50px', marginRight: '20px'}}>
                        Sure! Click the Button to be taken to Physician Search:
                        <Typography align='center'>
                            <Button href="/search" variant="contained" sx={{height: '30px', marginTop: '10px', marginBottom: '10px'}}>
                                Search
                            </Button>
                        </Typography>
                    </Typography>
                </Box>
            </Typography>
        </Box>
    );
}

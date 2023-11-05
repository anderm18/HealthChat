'use client'
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import { Person } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';


export default function BubInit(props: any) {

    const [isVisible, setIsVisible] = useState(false);
    const [isServer, setIsServer] = useState(true);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return(
        <Box sx={{width: '100vw'}} style={{opacity: `${isVisible ? '1' : '0'}`, transition: 'opacity 1.0s ease-in-out'}}>
            <Typography variant="h6" align="center" sx={{paddingTop: '20px'}}>
                <Box sx={{paddingTop: '5px', paddingBottom: '5px', border: 'solid', borderColor: '#0a0c0f', borderWidth: '5px', borderRadius: '25px', marginLeft: '10%', marginRight: '10%', backgroundColor: '#0a0c0f', fontWeight: 'bold', position: 'relative'}}>
                    {
                        props?.agent == "ai" ? 
                        <InfoIcon sx={{position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', marginLeft: '10px'}}/>:
                        <Person sx={{position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', marginLeft: '10px'}}/>
                    }
                    <Typography align='left' sx={{marginLeft: '50px', marginRight: '20px'}}>
                        {props?.desc}
                    </Typography>
                </Box>
            </Typography>
        </Box>
    );

}

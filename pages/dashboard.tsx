import {Box, Button, Typography} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import React from 'react';
import BubInit from '../components/InitialBubble';

const Typer: ComponentType<{
  strings: string[];
  style?: any;
}> = dynamic(() => import('../components/TyperComponent'), {
  ssr: false
});

export default function Dashnoard() {
  return (
    <Box sx={{backgroundColor: '#151A20', color: 'white', width: '100%', height: '100vh', position: 'relative'}}>
        <Typography variant="h5" align="center" sx={{paddingTop: '20px'}}>
            <Box sx={{border: 'solid', borderColor: '#5b708b', borderWidth: '5px', borderRadius: '25px', marginLeft: '20%', marginRight: '20%', backgroundColor: '#748aa4', fontWeight: 'bold'}}>
                HealthChat
            </Box>
        </Typography>
        <Box>
            <BubInit/>
        </Box>
        <Box sx={{position: 'absolute', bottom: 0, height: '70px', width: '100vw'}}>
            <Box sx={{position: 'relative', backgroundColor: '#0a0c0f', height: '50px', borderRadius: '25px', marginLeft: '20px', marginRight: '20px'}}>
            <Typography sx={{paddingTop: '11px', marginLeft: '25px'}}>
                <Typer strings={['My back hurts...', "There's a bump on my skin...", "My vision is blurred..."]}/>
            </Typography>
            <Box sx={{position: 'absolute', right: 0, marginTop: '-23px', marginRight: '15px'}}>
                <SendIcon/>
            </Box>
            </Box>
        </Box>
    </Box>
  )
}

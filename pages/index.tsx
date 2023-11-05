import {Box, Button, Typography} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

const Typer: ComponentType<{
  strings: string[];
  style?: any;
}> = dynamic(() => import('../components/TyperComponent'), {
  ssr: false
});

export default function Home() {
  return (
    <Box sx={{backgroundColor: '#151A20', color: 'white', width: '100%', height: '100vh', position: 'relative'}}>
      <Box>
        <Typography align="center" variant='h3' sx={{paddingTop: '100px', fontWeight: 'bold'}}>
            Connecting <div style={{color: '#3399FF'}}>Patients</div>To<div style={{color: '#3399FF'}}>Physicians</div>
        </Typography>
        <Typography align="center" variant='h5' sx={{paddingTop: '20px', maxWidth: '10cm', margin: 'auto'}}>
            Using AI to connect you to a physician in your area to address your health concerns!
        </Typography>
        <Typography align="center" sx={{paddingTop: '20px'}}>
          <Button variant='contained' href="/dashboard">
            Get Started
          </Button>
        </Typography>
      </Box>
      <Box sx={{position: 'absolute', bottom: 0, height: '70px', width: '100vw'}}>
        <Box sx={{position: 'relative', backgroundColor: '#0a0c0f', height: '50px', borderRadius: '25px', marginLeft: '20px', marginRight: '20px'}}>
          <Typography sx={{paddingTop: '11px', marginLeft: '25px'}}>
            <Typer strings={['My back hurts...', "There's a bump on my skin...", "My stomach hurts..."]}/>
          </Typography>
          <Box sx={{position: 'absolute', right: 0, marginTop: '-23px', marginRight: '15px'}}>
            <SendIcon/>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

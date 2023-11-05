import {Box, Button, Typography} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import dynamic from 'next/dynamic';
import { ComponentType, useState } from 'react';
import React from 'react';
import BubInit from '../components/InitialBubble';

const QUESTION_STRING = 
`Great! Ask your question whenever you are ready. Remember, anything I say should not be taken as a diagnosis or medical advice.
I am an AI tool developed to search the web and generate the best possible response based on the info I can find. Please see
a Physician for an official diagnosis or medical advice!`

const SEARCH_STRING = `ai_internal_search`

const NO_UNDERSTAND =
`Sorry, I don't understand. What would you like to do? You can ask a question or find a physician. Just say "Question" or "Find".`

const Typer: ComponentType<{
  strings: string[];
  style?: any;
}> = dynamic(() => import('../components/TyperComponent'), {
  ssr: false
});

const callAPI = async (body: Object, endpoint: string) => {
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            body
        )
    }).then((response) => {
        if (!response.ok) {
            return JSON.parse("{\"error\": \"request failed\"}")
        }
        return response.json();
    })
}

export default function Dashnoard() {

    const [text, setText] = useState('');
    const [userInput, setUserInput] = useState<string[]>([]);
    const [isAiTurn, setIsAiTurn] = useState(false);
    const [isInputDisabled, setIsInputDisabled] = useState(false)

    const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
      setText(e.target.value);
    };

    const handleKeyPress = async (e: { key: string; }) => {
        setIsInputDisabled(true);
        if (e.key === 'Enter' && text) {

          // copy string, assure works on all browsers with this trick
          const holdText = (' ' + text).slice(1);
          setText('');
          setUserInput((inps) => [...inps, holdText]);
          if (!isAiTurn) {
            if (holdText.toLowerCase().includes("question")) {
                setUserInput((inps) => [...inps, QUESTION_STRING]);
                setIsAiTurn(true);
            } else if (holdText.toLowerCase().includes("find") || holdText.toLowerCase().includes("search")) {
                //setUserInput((inps) => [...inps, NO_UNDERSTAND]);
            } else {
                setUserInput((inps) => [...inps, NO_UNDERSTAND]);
            }
          } else {
            if (userInput[userInput.length-2] != SEARCH_STRING) {
                var data: JSON = await callAPI({MEDICAL_ISSUE: holdText}, '/api/askMed')
                console.log(data);
            }
          }
        }
        setIsInputDisabled(false);
      };
    return (
        <Box sx={{backgroundColor: '#151A20', color: 'white', width: '100%', height: '100vh', position: 'relative'}}>
            <Typography variant="h5" align="center" sx={{paddingTop: '20px'}}>
                <Box sx={{border: 'solid', borderColor: '#5b708b', borderWidth: '5px', borderRadius: '25px', marginLeft: '20%', marginRight: '20%', backgroundColor: '#748aa4', fontWeight: 'bold'}}>
                    HealthChat
                </Box>
            </Typography>
            <Box>
                <BubInit agent="ai" desc="init"/>
                {
                    
                    userInput.map((inp, index) => {
                        const agent = index%2!=0 ? "ai" : "person";
                        return <BubInit agent={agent} desc={inp}/>
                    })
                }
            </Box>
            <Box>
                <Box sx={{position: 'absolute', bottom: 0, height: '70px', width: '100vw'}}>
                    <Box sx={{position: 'relative', backgroundColor: '#0a0c0f', height: '50px', borderRadius: '25px', marginLeft: '20px', marginRight: '20px'}}>
                        <Typography sx={{paddingTop: '11px', marginLeft: '25px'}}>
                            <input
                                type="text"
                                value={text}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                placeholder='What you would you like to do?'
                                disabled={isInputDisabled}
                                style={{height:'100%', width: '90%', backgroundColor:'#0a0c0f', border: 'none', outline: 'none', color: 'white'}}/>
                        </Typography>
                        <Box sx={{position: 'absolute', right: 0, marginTop: '-23px', marginRight: '15px'}}>
                            <button onClick={() => { handleKeyPress({key: "Enter"}); return;}} style={{backgroundColor:'#0a0c0f', border: 'none', outline: 'none', color: 'white', cursor: 'pointer'}}>
                                <SendIcon/>
                            </button>
                           
                        </Box>
                    </Box>
                </Box>
            </Box>
        
        </Box>
  )
}

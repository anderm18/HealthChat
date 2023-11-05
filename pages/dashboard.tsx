import {Box, Button, CircularProgress, Typography} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import dynamic from 'next/dynamic';
import SearchBubble from '../components/SearchBubble'
import { ComponentType, useEffect, useRef, useState } from 'react';
import React from 'react';
import BubInit from '../components/InitialBubble';

type QuestionResponse = {
    general_desc: string,
    possibles: [{desc: string, possible_name: string, source: string}]
}|{
    error: string
};

const WELCOME_MSG = 
`Hello! What would you like to do today? 
I can help find you a physician, or maybe answer other questions you may have. 
Just say: "Find me a doctor" or "I have a question."`

const QUESTION_STRING = 
`Great! Ask your question whenever you are ready. Remember, anything I say should not be taken as a diagnosis or medical advice.
I am an AI tool developed to search the web and generate the best possible response based on the info I can find. Please see
a Physician for an official diagnosis or medical advice!`

const SEARCH_STRING = `__ai_internal_search`

const DISCLAIMER = `Remember, this is not a diagnosis. I am a AI tool. Please seek a medical professional for an accurate medical advice and diagnoses.
Is there anything else I can help you with? Just say: "Find me a doctor" or "I have a question."`

const NO_UNDERSTAND =
`Sorry, I don't understand. What would you like to do? You can ask a question or find a physician. Just say "Question" or "Find".`

export const callAPI = async (body: Object, endpoint: string) => {
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
    });
}

const formQuestionResponse = (responseObject: QuestionResponse): any => {
    if ('error' in responseObject) {
        return responseObject.error == "Unknown Request" ?
        "Hmmm... that doesn't look like a medical question. If you think I'm incorrect, feel free to ask again!"
        : "Something went wrong. This usually happens when I have a lot of requests to handle. Please wait a moment and try again."
    }

    var returnArray = [`${responseObject.general_desc}`, <br/>, <br/>];
    console.log(responseObject);
    responseObject.possibles.forEach((possible: {desc: string, possible_name: string, source: string}) => {
        let array = [<b>Possible Cause: </b>, ` ${possible.possible_name}`, <br/>, 
                     <b>Description:</b>, ` ${possible.desc}`, <br/>, 
                     <a href={possible.source}>Source</a>, <br/>, <br/>];
        returnArray = returnArray.concat(array);
        console.log(returnArray)
    });

    returnArray.push(DISCLAIMER);
    return returnArray
}

export default function Dashnoard() {

    const [text, setText] = useState('');
    const [userInput, setUserInput] = useState<any>([]);
    const [isAiTurn, setIsAiTurn] = useState(false);
    const [isInputDisabled, setIsInputDisabled] = useState(false)
    const [showLoad, setShowLoad] = useState(false);

    const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
      setText(e.target.value);
    };

    const containerRef: any = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [text]);
    

    const handleKeyPress = async (e: { key: string; }) => {
        setIsInputDisabled(true);
        if (e.key === 'Enter' && text) {

          // copy string, assure works on all browsers with this trick
          const holdText = (' ' + text).slice(1);
          setText('');
          setUserInput((inps: any) => [...inps, [holdText]]);
          if (!isAiTurn) {
            if (holdText.toLowerCase().includes("question")) {
                setUserInput((inps: any) => [...inps, [QUESTION_STRING]]);
                setIsAiTurn(true);
            } else if (holdText.toLowerCase().includes("find") || holdText.toLowerCase().includes("search")) {
                setUserInput((inps: any) => [...inps, [SEARCH_STRING]]);
            } else {
                setUserInput((inps: any) => [...inps, [NO_UNDERSTAND]]);
            }
          } else {
            if (userInput[userInput.length-2] != SEARCH_STRING) {
                
                setShowLoad(true);
                var data: any = await callAPI({MEDICAL_ISSUE: holdText}, '/api/askMed')
                    .then((json: QuestionResponse) => {
                        return formQuestionResponse(json);
                });

                setUserInput((inps: any) => [...inps, data]);
                setShowLoad(false);
                setIsAiTurn(false);
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
                <Box ref={containerRef} sx={{maxWidth: '100vw', maxHeight: 'calc(100vh - 150px)', overflowY: 'auto', overflowX: 'hidden'}}>
                    <BubInit agent="ai" desc={[WELCOME_MSG]}/>
                    {
                        userInput.map((inp: any, index: number) => {
                            const agent = index%2!=0 ? "ai" : "person";
                            
                            return !(agent == "ai" && inp[0] == SEARCH_STRING) ? <BubInit agent={agent} desc={inp}/> : <SearchBubble/>
                        })
                    }
                    {showLoad && 
                    <Typography align='center' sx={{marginTop: '20px'}}>
                        <CircularProgress size={20} />
                        <Typography >
                            Gathering data to generate a response<br/>
                            This may take a minute...
                        </Typography>
                    </Typography>
                    }
                </Box>
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

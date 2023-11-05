import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import BubInit from '../components/InitialBubble';


const sendRequest = async (packet: {
    MEDICAL_ISSUE: string,
    CITY: string,
    STATE: string,
    INSURANCE: string
}) => {
    return fetch('/api/searchMed', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(packet)
    }).then((response) => {
        if (!response.ok) {
            return JSON.parse("{\"error\": \"request failed\"}")
        }
        return response.json();
    });
}


export default function SearchPage() {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    const [text4, setText4] = useState('');
    const [showBub, setShowBub] = useState(false);
    const [bubText, setBubText]: any = useState([]);
    const [isInputDisabled, setIsInputDisabled] = useState(false)
    const [disableButton, setDisableButton] = useState(false);

    const handleInputChange1 = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setText1(e.target.value);
    };

    const handleInputChange2 = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setText2(e.target.value);
    };

    const handleInputChange3 = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setText3(e.target.value);
    };

    const handleInputChange4 = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setText4(e.target.value);
    };

    const gather = async () => {

        if(!text1 || !text2 || !text3) {
            return;
        }

        setDisableButton(true);
        setIsInputDisabled(true);
        setShowBub(false);

        const packet = {
            "MEDICAL_ISSUE": text1,
            "CITY": text2,
            "STATE": text3,
            "INSURANCE": text4
        }

        const response = await sendRequest(packet)
        if ('error' in response) {
            return response.error == "Unknown Request" ?
            "Hmmm... that doesn't look like a medical question. If you think I'm incorrect, feel free to ask again!"
            : "Something went wrong. This usually happens when I have a lot of requests to handle. Please wait a moment and try again."
        }
        
        var ResponseArray = [
            `Based on the information I found, here are doctors that might be a good fit for your concern in your area:`
            , <br/>, <br/>, <b>Specialty: </b>, `${response.specialty}`, <br/>, <br/> 
        ]

        response.doctors.forEach((doctor: any) => {
            let array = [<b>Name: </b>, `${doctor.doctorname}`, <br/>,
                         <b>Address: </b>, `${doctor.address}`, <br/>,
                         <b>Phone Number: </b>, `${doctor.phone_number}`, <br/>,
                         <a href={`${doctor.website}`}>Website</a>, <br/>,
                         <b>Board Certified: </b>, `${doctor.board_certified}`, <br/>,
                         <b>Rating:</b>, `${doctor.rating == -1 ? "Not Found": doctor.rating}`, <br/>, <br/> ];
            ResponseArray = ResponseArray.concat(array);
            console.log(ResponseArray)
        });
        console.log(response);
        ResponseArray.push("If you entered an Insurance Provider, the above physicians were found to accept your insurance; though it is always safe to call and confirm!");
        setDisableButton(false);
        setIsInputDisabled(false);
        setShowBub(true);
        setBubText(ResponseArray);

        console.log(bubText)

        return ResponseArray;
    }
    
    return (
        <Box sx={{backgroundColor: '#151A20', color: 'white', width: '100%', minHeight: '100vh', height: 'auto', position: 'relative', overflow: 'hidden', paddingBottom: '30px'}}>
            <Typography variant="h5" align="center" sx={{paddingTop: '20px'}}>
                <Box sx={{border: 'solid', borderColor: '#5b708b', borderWidth: '5px', borderRadius: '25px', marginLeft: '20%', marginRight: '20%', backgroundColor: '#748aa4', fontWeight: 'bold'}}>
                    HealthChat
                </Box>
                <Button href='/dashboard'>
                    Back to Dashboard
                </Button>
            </Typography>
            <Box>
                <Typography sx={{marginLeft: '20px', marginTop: '20px'}}>
                    <b>* Describe your Medical Concern :</b>
                    <input
                        type="text"
                        value={text1}
                        onChange={handleInputChange1}
                        placeholder='Enter your concern here...'
                        disabled={isInputDisabled}
                        style={{height:'20px', width: '90%', backgroundColor:'#0a0c0f', border: 'none', outline: 'none', color: 'white'}}/>
                </Typography>
                <Typography sx={{marginLeft: '20px', marginTop: '20px'}}>
                    <b>* City to Search Near :</b>
                    <input
                        type="text"
                        value={text2}
                        onChange={handleInputChange2}
                        placeholder='Enter your City here...'
                        disabled={isInputDisabled}
                        style={{height:'20px', width: '90%', backgroundColor:'#0a0c0f', border: 'none', outline: 'none', color: 'white'}}/>
                </Typography>
                <Typography sx={{marginLeft: '20px', marginTop: '20px'}}>
                    <b>* State to Search Near :</b>
                    <input
                        type="text"
                        value={text3}
                        onChange={handleInputChange3}
                        placeholder='Enter your State here...'
                        disabled={isInputDisabled}
                        style={{height:'20px', width: '90%', backgroundColor:'#0a0c0f', border: 'none', outline: 'none', color: 'white'}}/>
                </Typography>
                <Typography sx={{marginLeft: '20px', marginTop: '20px'}}>
                    <b>Insurance Provider (Optional) :</b>
                    <input
                        type="text"
                        value={text4}
                        onChange={handleInputChange4}
                        placeholder='Enter your Insurance Provider here...'
                        disabled={isInputDisabled}
                        style={{height:'20px', width: '90%', backgroundColor:'#0a0c0f', border: 'none', outline: 'none', color: 'white'}}/>
                </Typography>
                <Typography align='center'>
                    <Button onClick={gather} disabled={disableButton} variant="contained" sx={{height: '30px', marginTop: '10px'}}>
                        Find Physicians
                    </Button>
                    {disableButton && 
                    <Typography align='center' sx={{marginTop: '20px'}}>
                        <CircularProgress size={20} />
                        <Typography >
                            Gathering data to generate a response<br/>
                            This may take a minute...
                        </Typography>
                    </Typography>
                    }
                </Typography>
                <Typography align="center">
                    {showBub && <BubInit key={0} agent="ai" desc={bubText}/>}
                </Typography>
            </Box>
        </Box>
    )
}
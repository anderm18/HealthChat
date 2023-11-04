'use client'
import Typewriter from 'typewriter-effect';
import React from 'react';


export default function Typer(props: {strings: string[], style?: any}) {

    return(
        <div style={props.style}>
            <Typewriter
                options={{
                    strings: props.strings,
                    autoStart: true,
                    loop: true,
                    delay: 100
                }}/>
        </div>
    );

}
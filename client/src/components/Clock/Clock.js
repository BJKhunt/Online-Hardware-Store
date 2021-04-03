import { Typography, Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';

const Clock = ({ white }) => {
    const [time, setTime] = useState(new Date().toUTCString());
    var interval;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        interval = setInterval(() => {
            setTime(new Date().toUTCString());
        }, 1000);

        return () => { clearInterval(interval); };
    }, [])

    return (
        <Container maxWidth="lg">
            {white ?
                <Typography variant="caption" component="h1" align="right" color="textPrimary" style={{ marginTop: 10, color: '#ffffff' }}>*{time}</Typography>
                : <Typography variant="caption" component="h1" align="right" color="textPrimary" style={{ marginTop: 10 }}>*{time}</Typography>
            }
        </Container>
    )
}

export default Clock;
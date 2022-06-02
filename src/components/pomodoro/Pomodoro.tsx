import { Button } from '@mui/material';
import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Pomodoro.css';

export const Pomodoro = () => {
    const [start, setStart] = useState(false);
    const [minute, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [percentage, setPercentage] = useState(100)
    const zeroSeconds = seconds < 10 ? '0' + seconds : seconds;
    const [secondPercentage, setSecondPercentage] = useState(1499);

    useEffect(() => {
        if (start) {
            let interval = setInterval(() => {
                if (displayMessage) {
                    setSecondPercentage(secondPercentage - 1);
                    setPercentage((secondPercentage / 300) * 100);
                    if (percentage === 0) {
                        setSecondPercentage(1499)
                        setPercentage(100)
                    }
                } else {
                    setSecondPercentage(secondPercentage - 1);
                    setPercentage((secondPercentage / 1500) * 100);
                    if (percentage === 0) {
                        setSecondPercentage(299)
                        setPercentage(100)
                    }
                }
                clearInterval(interval);
                if (seconds === 0) {
                    if (minute !== 0) {
                        setSeconds(59)
                        setMinutes(minute - 1);
                    } else {
                        let minutes = displayMessage ? 24 : 4;
                        let seconds = 59;
                        setSeconds(seconds);
                        setMinutes(minutes);
                        setDisplayMessage(d => !displayMessage);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000)
        }
    }, [seconds, displayMessage, minute, percentage, start, secondPercentage])

    const startCount = () => {
        setStart(true);
    }

    const stopCount = () => {
        setStart(false);
    }

    return (
        <div className='divContainer'>
            <CircularProgressbar className='circular'
                value={percentage}
                text={''}
                styles={buildStyles({
                    rotation: 10,
                    textColor: '282c34',
                    pathColor: '#cccc00',
                    trailColor: '#282c34'
                })} />
            <header className="Pomodoro-header">
                <div>{displayMessage && <div>Descanso!</div>}</div>
                <div>{minute}:{zeroSeconds}</div>
            </header>
            <Button
                variant='contained'
                color='success'
                fullWidth
                size='large'
                className='button'
                onClick={startCount}
            >
                <strong>PLAY</strong>
            </Button>
            <Button
                variant='contained'
                color='error'
                fullWidth
                size='large'
                className='button'
                sx={{ mt: 1 }}
                onClick={stopCount}
            >
                <strong>STOP</strong>
            </Button>
            <Button
                variant='contained'
                color='primary'
                size='large'
                className='button'
                sx={{ mt: 1 }}
            >
                <strong>SETUP</strong>
            </Button>
        </div >
    )
}

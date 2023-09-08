import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { age } from "../age"
import { FormControl, FormHelperText } from '@mui/material';

const AgeGroupSelect = (props) => {
    const { ageError, selectStartAge, selectEndAge, setSelectStartAge, setSelecEndtAge } = props

    const handleStartAgeChange = (e) => {
        const newStartAge = parseInt(e.target.value, 10);
        setSelectStartAge(newStartAge);
        setSelecEndtAge(Math.max(newStartAge, selectEndAge));
      };
    
      const handleEndAgeChange = (e) => {
        const newEndAge = parseInt(e.target.value, 10);
        setSelecEndtAge(newEndAge);
        setSelectStartAge(Math.min(newEndAge, selectStartAge));
      };
    
    return (
        <div className='ageContainer'>
            <div className='title'>年齡</div>
            
            <FormControl error={ageError}>
                <div className='textfield'>
                    <TextField
                        error={ageError}
                        sx={{ minWidth: 120 }}
                        select
                        defaultValue={selectStartAge}
                        // value={selectAge}
                        onChange={handleStartAgeChange}
                        displayEmpty
                        variant="outlined"

                    >
                        {age.map((n) => (
                            <MenuItem value={n.value} disabled={n.value > selectEndAge}>{n.label}</MenuItem>
                        ))}
                    </TextField>
                    <span className='spacing'>~</span>
                    <TextField
                        error={ageError}
                        sx={{ minWidth: 120 }}
                        select
                        defaultValue={selectEndAge}
                        // value={selectAge}
                        onChange={handleEndAgeChange}
                        displayEmpty
                        variant="outlined"
                    >
                        {age.map((n) => (
                            <MenuItem value={n.value} disabled={n.value < selectStartAge}>
                                {n.value}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                {
                    ageError && <FormHelperText variant="standard" sx={{backgroundColor: "pink", m:0}}>年齡區間不可重疊</FormHelperText>
                }

            </FormControl>
            <div></div>


            {/* </FormControl> */}

        </div>
    )
}

export default AgeGroupSelect
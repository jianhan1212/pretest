import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { age } from "../age"
import { FormControl, FormHelperText } from '@mui/material';
import { useEffect, useState } from 'react';

const AgeGroupSelect = ({ onSelectChange,initialAgeRange, ageError }) => {
    // const { ageError, selectStartAge, selectEndAge, setSelectStartAge, setSelecEndtAge } = props
    const [selectStartAge, setSelectStartAge] = useState(initialAgeRange[0]);
    const [selectEndAge, setSelectEndAge] = useState(initialAgeRange[1]);
    // const [ageError, setAgeError] = useState(false);

    const handleStartAgeChange = (e) => {
        const newStartAge = parseInt(e.target.value, 10);
        setSelectStartAge(newStartAge);
        // setSelectEndAge(Math.max(newStartAge, selectEndAge));
        onSelectChange([newStartAge, selectEndAge]);
        
    };

    const handleEndAgeChange = (e) => {
        const newEndAge = parseInt(e.target.value, 10);
        setSelectEndAge(newEndAge);
        // setSelectStartAge(Math.min(newEndAge, selectStartAge));
        onSelectChange([selectStartAge, newEndAge]);
    };

    // useEffect(()=>{

    //     onSelectChange([selectStartAge, selectEndAge])

    // },[selectStartAge, selectEndAge])
//     useEffect(() => {
//     // 检查逻辑，将 selectedAgeRanges 与当前选择的范围进行比较
//     const isOverlap = selectedAgeRanges.some(([start, end]) => {
//       return (start >= selectStartAge && start <= selectEndAge) || (end >= selectStartAge && end <= selectEndAge);
//     });

//     // 更新错误状态
//     setAgeError(isOverlap);

//     // 如果没有重叠，将当前范围添加到 selectedAgeRanges 中
//     if (!isOverlap) {
//       onSelectChange([selectStartAge, selectEndAge]);
//     }
//   }, [selectStartAge, selectEndAge, selectedAgeRanges, onSelectChange]);

    return (
        <div className='ageContainer'>
            <div className='title'>年齡</div>

            <FormControl error={ageError}>
                <div className='textfield'>
                    <TextField
                        error={ageError}
                        sx={{ minWidth: 120 }}
                        select
                        value={selectStartAge}
                        onChange={handleStartAgeChange}
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
                        value={selectEndAge}
                        onChange={handleEndAgeChange}
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
                    ageError && <FormHelperText variant="standard" sx={{ backgroundColor: "pink", m: 0 }}>年齡區間不可重疊</FormHelperText>
                }

            </FormControl>

        </div>
    )
}

export default AgeGroupSelect
import { FormHelperText, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

const addComma = (number) => {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split(".")[0])
    const decimalDigits = stringNumber.split(".")[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
        integerDisplay = ""
    } else {
        integerDisplay = integerDigits.toLocaleString("en", { minimumFractionDigits: 0 })
    }

    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay
    }
}

const PriceInput = ({initialPrice, onPriceChange}) => {
    const [inputError, setInputError] = useState(false)
    const [price, setPrice] = useState(initialPrice)

    const handleInputChange = (e) => {
        const value = e.target.value.replace(/,/g, "")
        const addCommaValue = addComma(value)
        setPrice(addCommaValue)
        onPriceChange(value)
    }

    useEffect(()=>{
        if(price==="") {
            setInputError(true)
        } else {
            setInputError(false)
        }
    }, [price])

    return (
        <div className='priceInputContainer'>
            <div className='title'>入住費用(每人每晚)</div>
            <div className='inputContainer'>
                <label className='exchange'>TWD</label>
                <TextField
                    defaultValue={price}
                    type='text'
                    value={price}
                    onChange={handleInputChange}
                    id="outlined-helperText"
                    placeholder="請輸入費用"
                    size="medium"
                    error={inputError}
                    sx={{
                        "& .MuiInputBase-input::-webkit-inner-spin-button": {
                            WebkitAppearance: 'none',
                            margin: 0,
                        },
                        backgroundColor: "white",
                        minWidth: "auto" 
                    }}
                />
            </div>
            {
                inputError 
                ? (<FormHelperText variant="standard" error={inputError} sx={{backgroundColor: "pink", m: 0}}>不可以為空白</FormHelperText>)
                :<></>
            }
            <div className='message'>輸入0表示免費</div>

        </div>
    )
}

export default PriceInput
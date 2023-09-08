import React, { useEffect, useState } from 'react'
import AgeGroupSelect from './components/AgeGroupSelect'
import PriceInput from './components/PriceInput'

const AgeGroupPriceList = ({onAgeRangeChange, isAgeOverlap, setIsAgeOverlap, selectedAgeRanges}) => {

  const [price, setPrice] = useState(0)
  // const [ageError, setAgeError] = useState(false)
  const [inputError, setInputError] = useState(false)
  const [selectStartAge, setSelectStartAge] = useState(0)
  const [selectEndAge, setSelecEndtAge] = useState(20)

  useEffect(() => {
    if (price === "") {

      setInputError(true)
    } else {

      setInputError(false)
    }

    if (isAgeOverlap) {
      setIsAgeOverlap(true)
    } else {
      setIsAgeOverlap(false)
      onAgeRangeChange([selectStartAge, selectEndAge])
    }

  }, [isAgeOverlap, price, inputError, selectStartAge, selectEndAge, onAgeRangeChange])



  return (
    <div className='ageGroupPriceList'>
      <AgeGroupSelect
        ageError={isAgeOverlap}
        selectStartAge={selectStartAge}
        setSelectStartAge={setSelectStartAge}
        selectEndAge={selectEndAge}
        setSelecEndtAge={setSelecEndtAge}
      />
      <PriceInput
        inputError={inputError}
        price={price}
        setPrice={setPrice}
      />
    </div>
  )
}

export default AgeGroupPriceList
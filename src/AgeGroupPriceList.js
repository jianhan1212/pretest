import React, { useEffect, useState } from 'react'
import AgeGroupSelect from './components/AgeGroupSelect'
import PriceInput from './components/PriceInput'
import { Button, Divider } from '@mui/material';
import { GrFormAdd } from 'react-icons/gr'
import './util/getNumberIntervals'

const AgeGroupPriceList = () => {

  const [isAgeOverlap, setIsAgeOverlap] = useState(false);
  const [ageRanges, setAgeRanges] = useState([{
    age: [0, 20],
    price: 0
  }]);


  const addItems = () => {
    setAgeRanges([...ageRanges, { age: [0, 20], price: 0 }])
  }

  const removeItem = (index) => {
    const updatedAgeRanges = [...ageRanges];
    updatedAgeRanges.splice(index, 1);
    setAgeRanges(updatedAgeRanges);
  }

  const handleAgeRangeChange = (selectedRange, index) => {
    const updatedAgeRanges = [...ageRanges];
    updatedAgeRanges[index].age = selectedRange;
    setAgeRanges(updatedAgeRanges);
  };
  
  const handlePriceChange  = (inputPrice, index) => {
    const updatedAgeRanges = [...ageRanges];
    updatedAgeRanges[index].price = inputPrice;
    setAgeRanges(updatedAgeRanges);
  };

  const checkAgeRangeOverlap = () => {
    const ageRangeList = ageRanges.map((item) => item.age);
    for (let i = 0; i < ageRangeList.length - 1; i++) {
      for (let j = i + 1; j < ageRangeList.length; j++) {
        const [start1, end1] = ageRangeList[i];
        const [start2, end2] = ageRangeList[j];
        if (start1 <= end2 && end1 >= start2) {
          return true; // 有重疊
        }
      }
    }
    return false; // 無重疊
  };
  
  useEffect(() => {
    const overlap = checkAgeRangeOverlap();
    setIsAgeOverlap(overlap);
  }, [ageRanges]); // 在ageRanges發生變化時檢查
  


  return (
    <div>
      {ageRanges.map((ageRange, index) => (
        <div key={index}>
          <div className='top'>
            <div>價格設定-{index + 1}</div>
            {index === ageRanges.length - 1 && <Button onClick={() => removeItem(index)} color="error" startIcon="x" >移除</Button>}
          </div>
          <div className='ageGroupPriceList'>
            <AgeGroupSelect
              ageError={isAgeOverlap}
              initialAgeRange={ageRange.age}
              onSelectChange={(selectedRange) => handleAgeRangeChange(selectedRange, index)}
            />
            <PriceInput
              initialPrice={ageRange.price}
              onPriceChange={(newPrice) => handlePriceChange(newPrice, index)}
            />
          </div>
          {index !== ageRanges.length - 1 && <Divider sx={{ my: 2 }} />}
        </div>
      ))}
      <Button startIcon={<GrFormAdd />} onClick={addItems}>新增價格設定</Button>
      {console.log(ageRanges)}
    </div>


  )
}

export default AgeGroupPriceList
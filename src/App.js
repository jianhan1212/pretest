import './App.css';
import AgeGroupPriceList from './AgeGroupPriceList';
import { Button, Divider } from '@mui/material';
import { GrFormAdd } from 'react-icons/gr'
import { useState } from 'react';

const getNumberIntervals = (intervals) => {
  const numberRange = Array.from({ length: 21 }, (_, i) => i)
  for (const [start, end] of intervals) {
    for (let i = start; i <= end; i++) {
      numberRange[i] = true;
    }
  }

  const overlap = [];
  const notInclude = [];
  let currentOverlap = null;

  for (let i = 0; i <= 20; i++) {
    if (numberRange[i]) {

      if (!currentOverlap) {
        currentOverlap = [i, i];
      } else {
        currentOverlap[1] = i;
      }
    } else {
      if (currentOverlap) {
        overlap.push([...currentOverlap]);
        currentOverlap = null;
      }
      notInclude.push([i, i]);
    }
  }
  if (currentOverlap) {
    overlap.push([...currentOverlap]);
  }

  return { overlap, notInclude };
}


function App() {
  const [addList, setAddList] = useState([{}])
  const [selectedAgeRanges, setSelectedAgeRanges] = useState([]);
  const [isAgeOverlap, setIsAgeOverlap] = useState(false);

  const addItems = () => {
    setAddList([...addList, {}]);
  }

  const removeItem = () => {
    setAddList([...addList.slice(0, -1)]);
  }

  const handleAgeRangeChange = (selectedRange) => {
    if (selectedAgeRanges.length > 0) {
      const intervals = [...selectedAgeRanges, selectedRange];
      const result = getNumberIntervals(intervals);
      console.log(selectedAgeRanges);

      if (result.overlap.length > 0) {
        setIsAgeOverlap(true);
      } else {
        setIsAgeOverlap(false);
      }
    }
    setSelectedAgeRanges([...selectedAgeRanges, selectedRange]);
  };

  return (
    <div className="App">

      {addList.map((addItem, index) => (
        <div key={index}>
          <div className='top'>
            <div>價格設定-{index + 1}</div>
            <Button onClick={removeItem} color="error" startIcon="x" >移除</Button>
          </div>
          <AgeGroupPriceList 
            selectedAgeRanges={selectedAgeRanges}
            setIsAgeOverlap={setIsAgeOverlap}
            onAgeRangeChange={handleAgeRangeChange} 
            isAgeOverlap={isAgeOverlap} 
          />
          {index !== addList.length - 1 && <Divider sx={{ my: 2 }} />}
        </div>
      ))}
      <Button startIcon={<GrFormAdd />} onClick={addItems}>新增價格設定</Button>
    </div>
  );
}

export default App;

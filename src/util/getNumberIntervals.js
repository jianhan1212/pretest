export const getNumberIntervals = (intervals) => {
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
  
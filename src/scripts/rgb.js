let chartBackgrounds = [];

  for(let i=0;i<10;i++){
    let rgb =[];
    for(let j = 0; j < 3; j++){
      rgb.push(Math.floor(Math.random() * 255));
    }
    let backgroundColor = 'rgb('+ rgb.join(',') +')';
    chartBackgrounds.push(backgroundColor)
  }

  console.log(chartBackgrounds)
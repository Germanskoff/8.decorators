function cachingDecoratorNew(func) {
  // Ваш код
  let cache = [];

  function wrapper(...args) {
    const hash = args.join(",");
    let idx = cache.findIndex((item) => item.hash === hash);
    if (idx !== -1) {
      console.log("Из кэша: " + cache[idx].value);
       return "Из кэша: " + cache[idx].value;
    } 

      let result = func(...args);
      cache.push({hash: hash, value: result});
      if (cache.length > 5) {
        cache.shift();
      }
      console.log("Вычисляем: " + result);
      return "Вычисляем: " + result;
    
  }
  return wrapper
}


function debounceDecoratorNew(func) {
  // Ваш код
  let timeout;
  let _isRunning = false;
  function wrapper(...args) {
    wrapper.count += 1;
    console.log(`Общее количество вызовов ${wrapper.count}`);
    if(!_isRunning) {
      func.call(this, ...args);  
      _isRunning = true;
    }
    else {
      console.log('Сигнал проигнорирован');
      return;
    }
    // one timout for interval from first call
    timeout = setTimeout(() => {            
      _isRunning = false;              
    }, ms);
  }
  wrapper.count = 0;  
  return wrapper;
}

function debounceDecorator2(func) {
  // Ваш код
  let timerId;
  let isCooldown = true;
  wrapper.count = 0;

  function wrapper(...args) {
      if (isCooldown) {
          isCooldown = false;
          func.apply(this, ...args);
          return;
      }
      wrapper.count++;
      clearTimeout(timerId);
      console.log('Пропуск');
      timerId = setTimeout(() => {
          func.apply(this, args);
      }, ms);
  };
  return wrapper;
}

function useRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
    
    xhr.onerror = function() {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    
    xhr.send();
};

const resultNode = document.querySelector('.j-result');

function displayResult(apiData) {
    let cards = '';
    
    apiData.forEach(function(item) {
      const cardBlock = `
        <div class="card">
          <img
            src="${item.download_url}"
            class="card-image"
          />
          <p>${item.author}</p>
        </div>
      `;
      cards = cards + cardBlock;
    });
      
    resultNode.innerHTML = cards;
}

const btnNode = document.querySelector('.j-btn-request');
btnNode.addEventListener('click', function() {
    let value;
    value = Number(document.querySelector('input').value);

    //Проверка числа
    if (typeof value == 'number' && !isNaN(value)) {
        if (value >= 1 && value <= 10) {
            let linkPhoto= `https://picsum.photos/v2/list?limit=${value}`;
            useRequest(linkPhoto, displayResult);
        } else {
            alert('Введите число в диапозоне от 1 до 10');
        }
    } else {
        alert('Введите число');
    }
  });
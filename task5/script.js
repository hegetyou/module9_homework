function useRequest(url, callback) {
	var xhr = new XMLHttpRequest();
	console.log('url:', url);
	xhr.open('GET', url, true);

	xhr.onload = function () {
		if (xhr.status != 200) {
			console.log('Статус ответа: ', xhr.status);
		} else {
			const result = JSON.parse(xhr.response);

			// Записываем результат запроса в localStorage

			let latestData = localStorage.setItem('myJSON', xhr.response);
			if (callback) {
				callback(result);
			}
		}
	};

	xhr.onerror = function () {
		console.log('Ошибка! Статус ответа: ', xhr.status);
	};

	xhr.send();
};

const resultNode = document.querySelector('.result');
const btnNode = document.querySelector('.btn');

//Функция обработки полученного результата
//apiData - объект с результатом запроса
function displayResult(apiData) {
	let cards = '';
	apiData.forEach(function(item){
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
	//Вставляем контент в поле вывода данных
	resultNode.innerHTML = cards;
}

//Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', function() {
	const valuePage = document.querySelector('.input_page').value;//получение данных из input
	const valueLimit = document.querySelector('.input_limit').value;
	if (((valuePage < 1 || valuePage > 10) && (valueLimit < 1 || valueLimit > 10)) || (isNaN(+valuePage) && isNaN(+valueLimit))) {
		resultNode.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
	} else {
		if ((valuePage < 1 || valuePage > 10 || isNaN(+valuePage)) && (valueLimit >= 1 && valueLimit <= 10)) {
			resultNode.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
		} else {
			if ((valueLimit < 1 || valueLimit > 10 || isNaN(+valueLimit)) && (valuePage >= 1 && valuePage <= 10)) {
				resultNode.innerHTML = 'Лимит вне диапазона от 1 до 10';
			} else {
				useRequest(` https://picsum.photos/v2/list?page=${valuePage}&limit=${valueLimit}`, displayResult);
			}
		}
	}
})

// При перезагрузке страницы
window.onload = function () {
	// Получаем данные по ключу myJSON в localStorage
	let latestData = localStorage.getItem('myJSON');
	// Если данные в localStorage есть - передаем в cb для вывода
	if (latestData !== null) {
		displayResult(JSON.parse(latestData));
	}
}
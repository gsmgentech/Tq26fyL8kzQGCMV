const buttonsData = [
    { label: '6 HOURS ₱200', href: '6hours/checkout', imgSrc: '../../img/gentechserver.png' },
    { label: '8 HOURS ₱250', href: '8hours/checkout', imgSrc: '../../img/gentechserver.png' },
    { label: '12 HOURS ₱350', href: '12hours/checkout', imgSrc: '../../img/gentechserver.png' },
    { label: '24 HOURS ₱450', href: '24hours/checkout', imgSrc: '../../img/gentechserver.png' },   
];

const itemsPerPage = 200;
let currentPage = 1;
let filteredData = [...buttonsData];

function displayButtons() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const buttonsContainer = document.getElementById('buttons-container');
    buttonsContainer.innerHTML = '';

    filteredData.slice(start, end).forEach(button => {
        const btnElement = document.createElement('a');
        btnElement.className = 'button';
        btnElement.href = button.href;

        const imgElement = document.createElement('img');
        imgElement.src = button.imgSrc;
        imgElement.alt = button.label;
        imgElement.className = 'button-icon';

        const labelSpan = document.createElement('span');
        labelSpan.textContent = button.label;

        btnElement.appendChild(imgElement);
        btnElement.appendChild(labelSpan);

        buttonsContainer.appendChild(btnElement);
    });  
}

function searchButtons() {
    const searchTerm = document.getElementById('search-box').value.toLowerCase();
    filteredData = buttonsData.filter(button => button.label.toLowerCase().includes(searchTerm));
    currentPage = 1;
    displayButtons();
}

displayButtons();
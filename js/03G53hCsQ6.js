const copyButton = document.getElementById('copyButton');
const gcashNumber = '09923965626';

copyButton.addEventListener('click', () => {
    const tempInput = document.createElement('input');
    tempInput.value = gcashNumber;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Number copied: ' + gcashNumber);
});
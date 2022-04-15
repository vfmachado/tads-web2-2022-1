function unusedDigits(arr) {
    let letras = arr.join('');
    letras = letras.split('');
    let faltam = '';
    for (let i = 0; i < 10; i++) {
        if (letras.indexOf("" + i) < 0) {
            faltam += i;
        }
    }

    return faltam;
}
const numbers = [12, 34, 56, 78];    // 0 e 9
console.log(unusedDigits(numbers))
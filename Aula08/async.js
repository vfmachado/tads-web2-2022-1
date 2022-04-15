console.log('Antes da funcao')

const fn = () => new Promise(
    function(resolve, reject) {
        setTimeout(() => {
            console.log('Executando minha funcao');
            resolve();
        }, 2000)
        
    }
)
console.log(fn);
/*
fn().then(() => {
    console.log('Depois da funcao')
})

console.log(' ... o terceiro ...')
*/

(async () => {
    console.log('AQUI')
    await fn();
    console.log("eu esperei o amigo")
})();
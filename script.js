// 1
let howManyCanYouNeedToPaintAnOffice = function(L, W, H) {
    const ONE_CAN = 16;
    let validArr = [...arguments].sort((a, b) => a - b);
    if (validArr[0] > 0 && validArr[validArr.length - 1] <= 1000) {
        return Math.ceil((((L + W) * H) * 2) / ONE_CAN);
    }
    return new Error('Data is incorrect!')
}


//2
let batterChoiсe = function(A1, A2, A3, B1, B2, b3) {
        let validation = Math.max.apply(Math, [...arguments]) <= 100;
        if (validation) {
            let prise = [...arguments].slice(0, 3).sort((a, b) => a - b).reverse();
            let can = [...arguments].slice(3, 6).sort((a, b) => a - b).reverse();
            return prise.reduce((total, item, index) => {
                console.log(item * can[index]);
                return total += item * can[index];
            }, 0)
        }
        return new Error(
            `You entered incorrect data,
             the numbers passed to the function 
             should not be more than 100`);

    }
    // console.log(batterChoise(1, 2, 3, 4, 5, 100))


//3
Array.prototype.sum = function() {
    return this.reduce((total, item) => { return total += Number(item) }, 0)
}

let isItHappyTicket = function(number) {
    let value = String(number);
    let validation = number <= Math.pow(10, 6);
    if (validation) {
        while (value.length < 6) {
            value = value + '0'
        }
        let ferstHalf = value.slice(0, 3).split('').sum();
        let secoundHalf = value.slice(3, 6).split('').sum();
        console.log(ferstHalf, secoundHalf)
        return ferstHalf == secoundHalf ? 'yes' : 'no';
    }
    return new Error(`You entered incorrect data!`);
}

console.log(isItHappyTicket(1236));

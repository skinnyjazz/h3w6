//<-------------------------task 1---------------------->
const maxIpRange = 256;

function getNumberOfIp(ip) {
    let arrOfValues = [...ip.split('.')]
    return (Number(arrOfValues[0]) * Math.pow(maxIpRange, 3)) +
        (Number(arrOfValues[1]) * Math.pow(maxIpRange, 2)) +
        (Number(arrOfValues[2]) * maxIpRange) +
        (Number(arrOfValues[3]))
}


const ipsBetween = function(firstIp, secondIp) {
    return Math.abs(getNumberOfIp(firstIp) - getNumberOfIp(secondIp));
}



// console.log(ipsBetween("20.0.0.10", "20.0.1.0") === 246)

//<-------------------------task 1 End------------------>

//<-------------------------task 2---------------------->


const alphabet = {
    "-----": "0",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    ".-": "a",
    "-...": "b",
    "-.-.": "c",
    "-..": "d",
    ".": "e",
    "..-.": "f",
    "--.": "g",
    "....": "h",
    "..": "i",
    ".---": "j",
    "-.-": "k",
    ".-..": "l",
    "--": "m",
    "-.": "n",
    "---": "o",
    ".--.": "p",
    "--.-": "q",
    ".-.": "r",
    "...": "s",
    "-": "t",
    "..-": "u",
    "...-": "v",
    ".--": "w",
    "-..-": "x",
    "-.--": "y",
    "--..": "z",
    "/": " ",
    "-.-.--": "!",
    ".-.-.-": ".",
    "--..--": ",",
    "···−−−···": 'SOS'
};

const decodeMorse = function(morseString) {

    return morseString.split(' ').map((el, i, arr) => {
        if (el == '' && arr[i + 1] == '') return ' ';
        return alphabet[el];
    }).join('').toUpperCase()
}

// const decodeMorse = (morzeString) => morzeString
//     .split(' ')
//     .map((el, i, arr) => el == '' && arr[i + 1] == '' ? ' ' : alphabet[el])
//     .join('')
//     .toUpperCase();



// console.log(decodeMorse('... --- ...'))
//<-------------------------task 2 End---------------------->

//<-------------------------task 3---------------------->

const winList = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function isSolved(board) {
    let flatBoard = board.flat();
    let res = 0;
    console.log(flatBoard)
    for (let i = 0; i < winList.length; i++) {
        if (flatBoard[winList[i][0]] != 0 && flatBoard[winList[i][0]] == flatBoard[winList[i][1]] && flatBoard[winList[i][0]] == flatBoard[winList[i][2]]) {
            console.log('winer here', winList[i])

            res = flatBoard[winList[i][0]]
            break
        }
        if (res == 0 && flatBoard.includes(0)) {
            res = -1
        } else if (res == 0 && !flatBoard.includes(0)) {
            res = 0
        }
    }
    return res
}

// console.log(isSolved([
//         [0, 0, 2],
//         [0, 0, 0],
//         [1, 0, 1]
//     ]))
//<-------------------------task 3 End------------------>


//<-------------------------task 5---------------------->

// #1
// 'creative' decision of Вася - Делопроизводитель
// This method finds the index of an element in an object by its value
Object.getKey = (object, key) => Object.keys(object)[Object.keys(object).indexOf(String(key))];
const cashRegister = {
    '25': 0,
    '50': 0,
    '100': 0,
    getAllCash: function() {
        let sum = 0;
        for (const key in this) {
            if (!isNaN(this[key] * key)) sum += this[key] * key;
        }
        return sum;
    },
    giveChange: function(money) {
        if (this.getAllCash() >= money) {
            switch (money) {
                case 25:
                    cashRegister[25]--;
                    break;
                case 75:
                    if (cashRegister[50]) {
                        cashRegister[50]--;
                        cashRegister[25]--;
                    } else cashRegister[25] -= 3;
                    break;
            }
        }

    }
}
const costOfTicket = 25;


const possibleToChange = function(queue) {
    return queue.reduce((acc, element) => {
        if (acc === false) return acc;

        let indexOfbill = Object.getKey(cashRegister, element);
        console.log(Object.getKey(cashRegister, 25))
        if (element - costOfTicket == 0) {
            cashRegister[indexOfbill]++;
            return acc = cashRegister.getAllCash();
        };
        if (element - costOfTicket > 0 && element - costOfTicket <= cashRegister.getAllCash()) {
            cashRegister.giveChange(element - costOfTicket);
            cashRegister[indexOfbill]++;
            return acc = cashRegister.getAllCash();

        }
        return false

    }, 0);
}

// console.log(possibleToChange([25, 25, 100, 25]))

// #2
// const costOfTicket = 25;

// const possibleToChange = function(queue) {
//     return queue.reduce((acc, element) => {
//         if (acc === false) {
//             return false
//         }
//         if (element - costOfTicket == 0) {
//             return acc += element;
//         }
//         if (element - costOfTicket > 0 && element - costOfTicket <= acc) {
//             return acc += element - (element - costOfTicket);
//         }
//         return false;
//     }, 0)
// }

// console.log(possibleToChange([25, 25, 100, 25]))
// console.log(cashRegister)
// console.log(cashRegister.getAllCash())

//<-------------------------task 5 End------------------>

//<-------------------------task 4---------------------->
const anyFreeChairs = function(hall) {
    let freeChairs = hall[1] - hall[0].length
    return freeChairs > 0 ? freeChairs : 0

}

const meeting = function(meetingConfig, chairsNeed) {
    if (chairsNeed == 0) return 'Game On';
    if (chairsNeed > 8) return 'You want the impossible!';
    const maxChairs = 8;
    let resultArr = [];
    let newChairs = 0;
    meetingConfig.forEach(item => {
        const currentHall = anyFreeChairs(item);
        if (newChairs >= chairsNeed) return;
        if (currentHall + newChairs < maxChairs) {
            newChairs += currentHall;
            resultArr.push(currentHall);
        }
        if (currentHall + newChairs >= maxChairs) {
            resultArr.push(chairsNeed - newChairs);
            newChairs += maxChairs - newChairs;
        }
    })
    return newChairs == chairsNeed ? resultArr : 'Not enough!';
}

//<-------------------------task 4 End------------------>

//<-------------------------task 6---------------------->

const calculate = function(quipu) {
    let arr = quipu.split('')
    let normal = []
    let currentNum = '';
    // convert to normal numbers
    arr.forEach((element, index, arr) => {
        console.log(element)
        if (index == arr.length - 1) {
            currentNum += element;
            normal.push(currentNum)
        }
        if (element != '@' && element != '~') {
            if (currentNum.length > 0) {
                normal.push(currentNum)

            }
            normal.push(element)
            currentNum = ''
        }
        if (element == '@' || element == '~') {
            currentNum += element;
        }
    })

    normal.forEach((element, index, arr) => {
        if (element.includes('@')) {
            let newNum = 0;
            element.split('').forEach((element, index, arr) => {
                if (element == '@') {
                    newNum += 1
                }
                if (element == '~' && index < arr.length - 1) {
                    newNum *= 10
                }
            })
            arr[index] = newNum;

        }
    })

    let solution = String(eval(normal.join('')))
    let res = ''
    solution.split('').forEach((element, index, arr) => {
        if (element > 0) {
            res += '@'.repeat(element)
        }
        if (index < arr.length - 1) {
            res += '~'
        }
        if (element == 0 && index == arr.length - 1) {
            res += '~'

        }

    })



    return res
}

// console.log(calculate('@@~@@@@@@~@*@@@~@@@@@@@@@~@@@@@@@+(@@@~@@@@@~@@@+@@@@~@@@@@@~@@@@@@@@)') == '@@~@@@@@@~@*@@@~@@@@@@@@@~@@@@@@@+(@@@~@@@@@~@@@+@@@@~@@@@@@~@@@@@@@@)')


//<-------------------------task 6 End---------------------->

//<-------------------------task 7---------------------->
const findMaxValue = (num) => num % 2 == 0 ? [num / 2, num / 2] : [Math.round((num) / 2), (num - 1) / 2];
const insert = (arr, index, newItem) => [...arr.slice(0, index), newItem, ...arr.slice(index)];
const multiplyArr = (arr) => arr.reduce((acc, item, index, arr) => item == 0 ? arr.splice(index, 1) : acc *= item, 1);

// finds all combinations and a little more

const getUniqueValue = function(arr) {
    let res = arr.map((element) => element = element.join(''));
    return [...new Set(res)].map(element => element.split('').map(e => e = Number(e)));

}

const findMaxAllCombinations = function(num) {
    let arr = [];

    if (arr.length == 0) { arr.push([num]) }
    for (let i = 1; i < num / 2 + 1; i++) {
        arr.push([num - i, i])
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] >= 3) {


                let newItem = [...arr[i].slice(0, j), ...findMaxValue(arr[i][j]), ...arr[i].slice(j + 1)].sort((a, b) => b - a);
                if (arr.some((e) => e == newItem) == false) arr.push(newItem);

            }
        }
    }
    return getUniqueValue(arr)
}


const findPartMaxProd = function(num) {
    let arr = findMaxAllCombinations(num)

    let res = [
        [], 0
    ]
    arr.forEach((item, index, arr) => {
        let currentItem = multiplyArr(item);

        if (currentItem > res[res.length - 1]) {
            res[0] = item;
            res[[res.length - 1]] = currentItem;
        } else if (currentItem == res[res.length - 1] && item.length > 1) {
            res = insert(res, res.length - 2, item)

        }
    })
    return res

}
console.log(findPartMaxProd(8))

//<-------------------------task 7 End---------------------->
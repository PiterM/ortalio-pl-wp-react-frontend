export const getRandomNumberFromString = (text: string) => {
    let index = 0;
    for (let i=0; i<text.length; i++) {
        index += text.charCodeAt(i) * (Math.floor(Math.random() * 10) + 1)
    }
    return index;
}
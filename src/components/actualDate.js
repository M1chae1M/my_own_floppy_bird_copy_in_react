export default function actualDate(){
    const data=new Date(),
    day=data.getDate(),
    month=data.getMonth(),
    year=data.getFullYear();
    return `${day}-${month+1}-${year}`
}
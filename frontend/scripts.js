const orderBtn = document.getElementById('order-btn')
const roomElem = document.getElementById('room-id')
const hourElem = document.getElementById('hour-id')

orderBtn.addEventListener('click', () => {
    const room = roomElem.value
    const hour = hourElem.value
    fetch('/api/order/order_room', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: 'XXXX',
            room: room.value,
            hour: hour.value
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
})
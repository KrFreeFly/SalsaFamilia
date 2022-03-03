//TODO: finish a script to remove and update passes

document.addEventListener('click', function (event) {
    let action = event.target.id
    let idPass = document.getElementById('idPass')
    let idClient = document.getElementById('idClient')
    let idPassType = document.getElementById('idPassType')
    let cost = document.getElementById('cost')
    let startDate = document.getElementById('startDate')
    let endDate = document.getElementById('endDate')
    let classesLeft = document.getElementById('classesLeft')
    let wasFrozen = document.getElementById('wasFrozen')
    switch (action) {
        case 'delete':
            if (del.name === 'delete') {
                if (confirm(`Точно удалить трату "${info.value}" от "${date.value}" ?`)) {
                    fetch(`/expenses/${id}`, {
                        method: 'delete'
                    }).then(document.location.reload()).catch((err) => alert(err))
                }
            } else {
                fetch(`/expenses/${id}`, {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: JSON.stringify({id: id, type: type.value, date: date.value, cost: cost.value, info: info.value})
                }).then(document.location.reload()).catch((err) => alert(err))
            }
            break
        case 'change':
            idPassType.disabled = !idPassType.disabled
            startDate.disabled = !startDate.disabled
            endDate.disabled = !endDate.disabled
            cost.disabled = !cost.disabled
            classesLeft.disabled = !classesLeft.disabled
            wasFrozen.disabled = !wasFrozen.disabled
            if (del.innerText === 'Удалить') {
                del.name = 'save'
                del.innerText = 'Сохранить'
                change.innerText = 'Отмена'
                change.type = 'button'
            } else {
                del.name = 'delete'
                del.innerText = 'Удалить'
                change.innerText = 'Редактировать'
                change.type = 'reset'
            }
    }
})

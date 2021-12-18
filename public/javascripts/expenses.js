document.addEventListener('click', function (event) {
    let [action, id] = event.target.id.split('_')
    let type = document.getElementById(`type_${id}`)
    let date = document.getElementById(`date_${id}`)
    let cost = document.getElementById(`cost_${id}`)
    let info = document.getElementById(`info_${id}`)
    let del = document.getElementById(`delete_${id}`)
    let change = document.getElementById(`change_${id}`)
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
            type.disabled = !type.disabled
            date.disabled = !date.disabled
            cost.disabled = !cost.disabled
            info.disabled = !info.disabled
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
document.addEventListener('click', function (event) {
    let [action, id] = event.target.id.split('_')
    let type = document.getElementById(`type_${id}`)
    let amount = document.getElementById(`amount_${id}`)
    let week = document.getElementById(`week_${id}`)
    let cost = document.getElementById(`cost_${id}`)
    let del = document.getElementById(`delete_${id}`)
    let change = document.getElementById(`change_${id}`)
    switch (action) {
        case 'delete':
            if (del.name === 'delete') {
                if (confirm(`Точно удалить тип абонемента "${type.value}" ?`)) {
                    fetch(`/passtypes/${id}`, {
                        method: 'delete'
                    }).then(document.location.reload())
                }
            } else {
                fetch(`/passtypes/${id}`, {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({id: id, type: type.value, amount: amount.value, week: week.value, cost: cost.value})
                }).then(document.location.reload())
            }
            break
        case 'change':
            type.disabled = !type.disabled
            amount.disabled = !amount.disabled
            week.disabled = !week.disabled
            cost.disabled = !cost.disabled
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
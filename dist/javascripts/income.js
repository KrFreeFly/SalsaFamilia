document.addEventListener('click', function (event) {
    let [action, id] = event.target.id.split('_')
    let type = document.getElementById(`type_${id}`)
    let date = document.getElementById(`date_${id}`)
    let sum = document.getElementById(`sum_${id}`)
    let info = document.getElementById(`info_${id}`)
    let del = document.getElementById(`delete_${id}`)
    let change = document.getElementById(`change_${id}`)
    switch (action) {
        case 'delete':
            if (del.name === 'delete') {
                if (confirm(`Точно удалить доход "${type.value}" ?`)) {
                    fetch(`/income/${id}`, {
                        method: 'delete'
                    })
                }
                document.location.reload()
            } else {
                fetch(`/income/${id}`, {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({id: id, type: type.value, date: date.value, sum: sum.value, info: info.value})
                })
                document.location.reload()
            }
            break
        case 'change':
            type.disabled = !type.disabled
            date.disabled = !date.disabled
            sum.disabled = !sum.disabled
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
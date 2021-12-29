document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', function (event) {
        let [action, id] = event.target.id.split('_')
        let type = document.getElementById(`type_${id}`)
        let date = document.getElementById(`date_${id}`)
        let cost = document.getElementById(`cost_${id}`)
        let info = document.getElementById(`info_${id}`)
        let del = document.getElementById(`delete_${id}`)
        let change = document.getElementById(`change_${id}`)
        switch (action) {
            case 'change':
                type.disabled = !type.disabled
                date.disabled = !date.disabled
                cost.disabled = !cost.disabled
                info.disabled = !info.disabled
                if (del.name === 'delete') {
                    del.name = 'put'
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
})
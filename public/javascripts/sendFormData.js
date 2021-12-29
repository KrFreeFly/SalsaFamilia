document.addEventListener('DOMContentLoaded', () => {

    const send = async (formData, formMethod, formAction) => {
        const fetchResp = await fetch(formAction, {
            method: formMethod,
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!fetchResp.ok) {
            throw new Error(`Ошибка по адресу ${formAction}, статус ошибки ${fetchResp.status}`);
        }
        return await fetchResp.text();
    };

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit',
            function (e) {
                e.preventDefault();
                let formData = new FormData(this);
                const formMethod = this.method
                const formAction = this.action
                formData = Object.fromEntries(formData)
                const response = send(formData, formMethod, formAction)
                    .then(() => {
                    })
                    .catch((err) => console.error(err))
            });
    });

});
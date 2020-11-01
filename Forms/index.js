window.UI = {
    initializer: () => {
    },
    isInputValid: (element) => {
        if (element.value.trim() == '') {
            $(element).removeClass('input-sucess');
            $(element).addClass('input-error');

            window.functions.addIconResult($(`#${element.id}-icon>i`)[0], false);
        } else {
            $(element).removeClass('input-error');
            $(element).addClass('input-sucess');

            window.functions.addIconResult($(`#${element.id}-icon>i`)[0]);
        }
        $(`#${element.id}-icon`).show();
    }
}

window.functions = {
    initializer: () => {
        window.functions.insertMask();
    },

    addIconResult: (element, sucess = true) => {

        if (sucess) {
            $(element).removeClass();
            $(element).addClass('fas fa-check-circle success-color');
            $(element).show();
        }
        else {
            $(element).removeClass();
            $(element).addClass('fas fa-times-circle error-color');
            $(element).show();
        }
    },

    insertMask: () => {
        $('.cnpj-mask').mask('00.000.000/0000-00', { reverse: true });
        $('.zip-mask').mask('00.000-000', { reverse: true });
        $('.agency-mask').mask('000-0', { reverse: true });
        $('.account-mask').mask('00.000-0', { reverse: true });
        $('.phone-mask').mask('(00)0000-0000', { reverse: true });
    },
}

window.Events = {
    initializer: () => {
    },
}

window.UI.initializer();
window.Events.initializer();
window.functions.initializer();
window.company = {}

window.company.UI = {
    initializer: () => {
    },

    fillReturnAPI: data => {
        $('address').val(data.address);
    }
}

window.company.functions = {
    initializer: () => {
    },
    
    created: e => {
        $(`#created-load`).show();

        if (!window.company.functions.isValid()){
            $(`#created-load`).hide();
            return false;
        }

        let data = {

        };

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: `${config.url}`,
            data: data,
            async:false,
            success: function (response) {
                $(`#created-load`).hide();
            },
            error: function (err) {
                $(`#created-load`).hide();
            }
        });
    },

    isValid: () => {
        //Validar os campos do formulário não esquecer
    }
}

window.company.Events = {
    initializer: () => {
        $('#companynName').change(e => window.company.Events.onChangeValidateInput(e));
        $('#fantasyName').change(e => window.company.Events.onChangeValidateInput(e));
        $('#cnpj').change(e => window.company.Events.onChangeValidateInput(e));
        $('#agency').change(e => window.company.Events.onChangeValidateInput(e));
        $('#account').change(e => window.company.Events.onChangeValidateInput(e));
        $('#created').click(e => window.company.Events.onClickCreated(e));
    },

    onKeyUpCnpj: e => {
        window.company.UI.formatCNPJ(e);
    },

    onChangeCNPJ: e => {
        window.company.functions.IsValidCNPJ(e);
    },

    onClickCreated: e => {
        window.company.functions.created(e.target);
        e.preventDefault();
    },

    onChangeValidateInput: e => {
        window.UI.isInputValid(e.target);
    }
}


window.company.UI.initializer();
window.company.Events.initializer();

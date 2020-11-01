window.company = {}

window.company.UI = {
    initializer: () => {
        $('#status').prop("checked","true")
    },

    fillReturnAPI: data => {
        $('address').val(data.address);
    }
}

window.company.functions = {
    initializer: () => {
    },
    
    created: () => {
        $(`#created-load`).show();

        if (!window.company.functions.isValid()){
            $(`#created-load`).hide();
            return false;
        }

        let data = {
            CompanyName: $('#companynName').val(),
            FantasyName: $('#fantasyName').val(),
            CNPJ: $('#cnpj').val(),
            Email: $('#Email').val(),
            Telephone: $('#phone').val(),
            Status: $('#status').prop("checked"),
            Address: {
                Address: $('#address').val(),
                City: $('#city').val(),
                State: $('#state').val()
            },
            Category: parseInt($('#select-category').val()),
            Account: {
                Agency: $('#agency').val(),
                Account: $('#account').val()
            }
        };

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: `${config.url}`,
            data: JSON.stringify(data),
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
    },

    onKeyUpCnpj: e => {
        window.company.UI.formatCNPJ(e);
    },

    onChangeCNPJ: e => {
        window.company.functions.IsValidCNPJ(e);
    },

    onClickCreated: () => {
        window.company.functions.created();
    },

    onChangeValidateInput: e => {
        window.UI.isInputValid(e.target);
    }
}


window.company.UI.initializer();
window.company.Events.initializer();

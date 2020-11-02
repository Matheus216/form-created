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

        let cnpj = $('#cnpj').val().replaceAll('.', '').replace('/','').replace('-','');
        let telephone = $('#phone').val().replace('(', '').replace(')', '').replace('-', '');

        let data = {
            CompanyName: $('#companynName').val(),
            FantasyName: $('#fantasyName').val(),
            CNPJ: cnpj,
            Email: $('#Email').val(),
            Telephone: telephone,
            Status: $('#status').prop("checked"),
            Address: {
                Address: $('#address').val(),
                City: $('#city').val(),
                State: $('#state').val()
            },
            CategoryId: parseInt($('#select-category').val()),
            Account: {
                Agency: $('#agency').val(),
                Account: $('#account').val()
            }
        };

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: `${config.url}api/Establishment`,
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
        return true;
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

        window.company.functions.created();
        $(`#created-load`).hide();
        e.preventDefault();
    },

    onChangeValidateInput: e => {
        window.UI.isInputValid(e.target);
    }
}

window.company.UI.initializer();
window.company.Events.initializer();

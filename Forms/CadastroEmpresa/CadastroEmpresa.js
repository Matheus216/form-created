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
            crossDomain:true,
            data: JSON.stringify(data),
            success: function (response) {
                window.functions.messageReturn('modal-alert', 'Empresa cadastrada com sucesso !');
            },
            error: function (err) {
                window.functions.messageReturn('modal-alert', 'Erro ao cadastrar empresa !', false);
            }
        });
    },

    isValid: () => {
        return true;
    },

    openModalCategory: (e) => {
        $('#category-modal').modal('show');

        e.preventDefault();
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
        $('#edit-modal-category').click(e => window.company.functions.openModalCategory(e));
    },

    onKeyUpCnpj: e => {
        window.company.UI.formatCNPJ(e);
    },

    onChangeCNPJ: e => {
        window.company.functions.IsValidCNPJ(e);
    },

    onClickCreated: e => {
        try {
            window.company.functions.created();
            e.preventDefault();
            $(`#created-load`).hide();
        } catch (e) {
            $(`#created-load`).hide();
        }
    },

    onChangeValidateInput: e => {
        window.UI.isInputValid(e.target);
    }
}

window.company.UI.initializer();
window.company.Events.initializer();
window.company.functions.initializer();
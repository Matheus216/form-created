window.company = {}

var isUpdate = false;

window.company.UI = {
    initializer: () => {
        var varUrl = location.search.slice(1);

        if (varUrl.split('=')[0].includes('cnpj')){
            isUpdate = true;
            window.company.UI.loadData(varUrl.split('=')[1]);
        }
    },

    fillReturnAPI: data => {
        $('address').val(data.address);
    },

    loadData: cnpj => {
        if (cnpj){
            $.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: `${config.url}api/Establishment?cnpj=${cnpj}`,
                crossDomain:true,
                success: function (response) {
                    $('#companynName').val(response.establishmentModel.companyName);
                    $('#fantasyName').val(response.establishmentModel.fantasyName);
                    $('#cnpj').val(cnpj);
                    $('#Email').val(response.establishmentModel.email),
                    $('#phone').val(response.establishmentModel.telephone);
                    $('#status').prop("checked",response.establishmentModel.status.toString());
                    $('#address').val(response.establishmentModel.address.address);
                    $('#city').val(response.establishmentModel.address.city);
                    $('#state').val(response.establishmentModel.address.state);
                    $('#select-category').val(response.establishmentModel.categoryId);
                    $('#agency').val(response.establishmentModel.account.agency);
                    $('#account').val(response.establishmentModel.account.account);
                },
                error: function (err) {
                    window.functions.messageReturn('modal-alert', 'Erro ao carregar empresa!', false);
                }
            });
        }
        else{
            $('#status').prop("checked","true");
        }
    }
}

window.company.functions = {
    initializer: () => {
    },

    getObject: () => {
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

        return data;
    },
    
    created: () => {      
        if (!window.company.functions.isValid()){
            $(`#created-load`).hide();
            return false;
        }     

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: `${config.url}api/Establishment`,
            crossDomain:true,
            data: JSON.stringify(window.company.functions.getObject()),
            success: function (response) {
                window.functions.messageReturn('modal-alert', 'Empresa cadastrada com sucesso !');
            },
            error: function (err) {
                window.functions.messageReturn('modal-alert', 'Erro ao cadastrar empresa !', false);
            }
        });
    },

    update: () => {
        if (!window.company.functions.isValid()){
            $(`#created-load`).hide();
            return false;
        }     

        $.ajax({
            type: "PUT",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: `${config.url}api/Establishment`,
            crossDomain:true,
            data: JSON.stringify(window.company.functions.getObject()),
            success: function (response) {
                window.functions.messageReturn('modal-alert', 'Empresa salva com sucesso!');
            },
            error: function (err) {
                window.functions.messageReturn('modal-alert', 'Erro ao salvar empresa!', false);
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
            $(`#created-load`).show();

            if (!isUpdate){
                window.company.functions.created();
            }
            else{
                window.company.functions.update();
            }

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
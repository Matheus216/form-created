window.companyGet = {}

window.companyGet.UI = {
    initializer: () => {
    }
}

window.companyGet.functions = {
    initializer: () => {
    },

    getCompanyName: () => {
        let companyName = $('#companynName').val();
        
        $('#table-company-body').html('');

        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: `${config.url}api/Establishment/GetEstablishmentByCompanyName?companyName=${companyName}`,
            crossDomain: true,
            success: function (response) {
                let cont = 1;
                response.establishmentModel.forEach(x => {
                    window.companyGet.functions.fillTable(x, cont);

                    cont++;
                });
            },
            error: function (err) {
                window.functions.messageReturn('modal-alert', 'Erro ao buscar empresa !', false);
            }
        });
    },

    getCompanyCategory: () => {
        let companyCategoryId = parseInt($('#select-category-get').val());
        
        $('#table-company-body').html('');

        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: `${config.url}api/Establishment/GetEstablishmentByCategory?categoryId=${companyCategoryId}`,
            crossDomain: true,
            success: function (response) {
                let cont = 1;
                response.establishmentModel.forEach(x => {
                    window.companyGet.functions.fillTable(x, cont);

                    cont++;
                });
            },
            error: function (err) {
                window.functions.messageReturn('modal-alert', 'Erro ao buscar empresa !', false);
            }
        });
    },

    getCompanyCnpj: () => {
        let cnpj = $('#cnpj').val();
        cnpj = cnpj.replaceAll('.', '').replace('/','').replace('-','');
        
        $('#table-company-body').html('');

        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: `${config.url}api/Establishment?cnpj=${cnpj}`,
            crossDomain: true,
            success: function (response) {
                window.companyGet.functions.fillTable(response.establishmentModel, 1);
            },
            error: function (err) {
                window.functions.messageReturn('modal-alert', 'Erro ao buscar empresa !', false);
            }
        });
    },

    fillTable: (establishmentModel, cont) => {
        var line = `
        <tr>
            <th scope="row">${cont}</th>
            <td>${establishmentModel.companyName}</td>
            <td>${establishmentModel.cnpj}</td>
            <td>${establishmentModel.dateOfRegistration}</td>
            <td>
                <button class="btn btn-outline-primary btn-sm" onClick="window.companyGet.Events.onClickEdit(${establishmentModel.establishmentId})"><i class="fas fa-edit"></i></button>    
                <button class="btn btn-outline-danger btn-sm" onClick="window.companyGet.Events.onClickDelete(${establishmentModel.establishmentId})"><i class="fas fa-trash-alt"></i></button>    
            </td>
        </tr>
        `;

        $('#table-company-body').append(line);
    }
}

window.companyGet.Events = {
    initializer: () => {
        $('#companynName').change(() => window.companyGet.Events.onChangeCompanyName());
        $('#select-category-get').change(() => window.companyGet.Events.onChangeCompanyCategory());
        $('#cnpj').change(() => window.companyGet.Events.onChangeCompanyCnpj());
    },

    onChangeCompanyName: () => {
        window.companyGet.functions.getCompanyName();
    },

    onChangeCompanyCategory: () => {
        window.companyGet.functions.getCompanyCategory();
    },

    onChangeCompanyCnpj: () => {
        window.companyGet.functions.getCompanyCnpj();
    }

}

window.companyGet.UI.initializer();
window.companyGet.Events.initializer();
window.companyGet.functions.initializer();


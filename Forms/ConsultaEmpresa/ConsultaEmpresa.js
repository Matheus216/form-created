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

        $.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: `${config.url}api/Establishment/GetEstablishmentByCompanyName?companyName=${companyName}`,
            crossDomain:true,
            success: function (response) {
                alert(response);
            },
            error: function (err) {
                window.functions.messageReturn('modal-alert', 'Erro ao buscar empresa !', false);
            }
        });
    },
}

window.companyGet.Events = {
    initializer: () => {
        $('#companynName').change(() => window.companyGet.Events.onChangeCompanyName());
    },

    onChangeCompanyName: () => {
        window.companyGet.functions.getCompanyName();
    },


}

window.companyGet.UI.initializer();
window.companyGet.Events.initializer();
window.companyGet.functions.initializer();


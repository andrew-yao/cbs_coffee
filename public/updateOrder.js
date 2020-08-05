function updateOrder(id){
    $.ajax({
        url: '/orders/' + id,
        type: 'PUT',
        data: $('#update-order').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

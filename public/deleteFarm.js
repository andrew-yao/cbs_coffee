function deleteProduct(id){
    $.ajax({
        url: '/farms/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

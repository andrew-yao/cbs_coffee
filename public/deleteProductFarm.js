function deleteProductFarm(product_id, farm_id){
    $.ajax({
        url: `/products/productsfarms/${product_id}${farm_id}`,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

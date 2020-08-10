function addProductFarm(product_id, farm_id){
    $.ajax({
        url: '/products/productsfarms',
        type: 'POST',
        data: $('#addProductFarm').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

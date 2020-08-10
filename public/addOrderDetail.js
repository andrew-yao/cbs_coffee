function addOrderDetail(order_id, product_id){
    $.ajax({
        url: '/orders/orderdetails',
        type: 'POST',
        data: $('#addOrderDetail').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};

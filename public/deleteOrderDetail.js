function deleteOrderDetail(order_id, product_id){
    $.ajax({
        url: `/orders/orderdetails/${order_id}/${product_id}`,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

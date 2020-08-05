function searchCustomersFirstName() {
    // retrieve customer first name
    var customer_firstname_search  = document.getElementById('customer_firstname_search').value
    window.location = '/customers/search/' + encodeURI(customer_firstname_search)
}

function searchCustomersLastName() {
    // retrieve customer first name
    var customer_lastname_search  = document.getElementById('customer_lastname_search').value
    window.location = '/customers/search/' + encodeURI(customer_lastname_search)
}

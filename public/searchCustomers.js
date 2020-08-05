function searchCustomersFirstName() {
    // retrieve customer first name
    var customer_firstname_search  = document.getElementById('customer_firstname_search').value
    window.location = '/customers/search/' + encodeURI(customer_firstname_search)
}
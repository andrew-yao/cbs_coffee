function getCustomersByName(){
    var searchFirstNameInput = document.getElementById('searchFirstNameInput').value;
    //construct the URL and redirect to it
    window.location = '/people/search/' + encodeURI(searchFirstNameInput);
}

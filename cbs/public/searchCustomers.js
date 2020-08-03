function getCustomersByName(){
    var searchFName = document.getElementById('search-fname').value;
    //construct the URL and redirect to it
    window.location = '/people/search/' + encodeURI(searchFName);
}

function populateSelectField() {
    let len = parseInt($('#some_selector').attr('value'));
    var select = '';
    // populate select field with numbers from 3 to 33
    for (i=3;i<=33;i++){
    if (i == len) {
        select += '<option selected val=' + i + '>' + i + '</option>';
    } else {
        select += '<option val=' + i + '>' + i + '</option>';
    }
    
}
    $('#some_selector').html(select);
}

populateSelectField();
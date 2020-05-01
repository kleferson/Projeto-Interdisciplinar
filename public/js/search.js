$('#search').keyup(function() {
    var busca = $(this).val().toLowerCase();
    //console.log(busca);
    
    $('table tbody').find('tr').each(function() {
        var conteudoCelula = $(this).find('td:first').text();
        //console.log(conteudoCelula);
        var corresponde = conteudoCelula.toLowerCase().indexOf(busca) >= 0;
        $(this).css('display', corresponde ? '' : 'none');
    });
    
});
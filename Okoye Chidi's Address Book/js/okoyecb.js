$(function(){ //onload function
    $('.deletepage').hide();
    $('.create_page').hide();

    //function to clear the inputs of createpage
    function createpage(){
        $('#name').val('');
        $('#num').val('');
        $('#address').val('');
        $('#email').val('');
        $('.create_page').show();
    }

    //function to show the create page
    $('.create').click(function(){
        clearSearch();
        $('.main').hide();
        createpage();
        $('.create_page .edit-save').hide();
        $('.create_page .save').show();

    });

    // function to save data
    function saveData(){
        $('.main main ol').append(
            '<li class="contacts contact-display">' +
                '<ul class="contact-group" id="ul">' +
                    '<li class="contact contactname" id="contactname">' + $('#name').val() + '</li>' +
                    '<li class="contact contacttel" id="contacttel">'+$('#num').val()+'</li>'+
                    '<li><address class="contactaddress" id="contactaddress">'+ $('#address').val()+ '</address></li>' +
                    '<li class="contact contactmail" id="contactmail"><span><a href="mailto:'+$('#email').val()+'">'+$('#email').val() + '</a></span></li>' +
                    '<li class="right red edit">Edit</li>' + 
                    '<br>' + 
                '</ul>'+
                '<hr>' + 
            '</li>'
        )
        $('.create_page').hide();
        $('.main').show();
    }

    //adding the saveData function to a click event
    $('.save').click(function(){
        saveData();
    })

    // function to cancel create action
    $('.cancel').click(function(){
        $('.create_page').hide();
        $('.main').show();
    })

    // function to show deletepage
    $('.deletebtn').click(function(){
        $('.main_header').hide();
        $('.deletepage').show();
        $('.main main ol li .contact-group').prepend('<input type="checkbox" class="contacts" name="" id="">');
        $('.ol').addClass('delete-clicked');
        $('.edit').hide();
        $('#select-all').prop('checked', false);
    })

    //adding the click event to delete button
    $('.delete').click(function(){
        let parent = $('input:checkbox.contacts:checked').parent();
        parent.parent().remove();
        back();
        })
    
    // function to cancel delete action
    function back(){
        $('.main_header').show();
        $('.deletepage').hide();
        $('.edit').show();
        $('.main main ol li .contact-group input').remove();
        $('.ol').removeClass('delete-clicked');
    }

    // adding the click event to back action
    $('.back').click(function(){
        back();
    })

    // function to edit a contact using event delegation
    $('.ol').on('click', '.edit', function(){
        createpage();

        contactName = $(this).siblings('.contactname');
        let name = contactName.text();
        contactNumber = $(this).siblings('.contacttel');
        let tel = contactNumber.text();
        contactAddress = $(this).siblings('.contactaddress');
        let address = contactAddress.text();
        email = $(this).siblings('.contactmail');
        let mail = email.text();

        $('.main').hide();
        $('.create_page .save').hide();
        $('.create_page .edit-save').show();

        //get the values of the clicked contact
        $('#name').val(name);
        $('#num').val(tel);
        $('#address').val(address);
        $('#email').val(mail);
        
        //function to assign the new values to the contact
        $('.edit-save').click(function(){
       let newName = $('#name').val();
       let newNum = $('#num').val();
       let newAddress = $('#address').val();
       let newEmail = $('#email').val();

       contactName.text(newName);
       contactNumber.text(newNum);
       contactAddress.text(newAddress);
       email.text(newEmail);
       $('.main').show();
        $('.create_page .edit-save').hide();
        $('.create_page').hide();
        })           
    })

    //function to select/unselect all checkboxes for delete
    var checked = false;
    function selectAll(){            
        $('input:checkbox.contacts').prop('checked', !checked);
        checked = !checked;
    }
    $('#select-all').click(function(){
        selectAll();
    })
    
    //function to search
    function search(){
        var inputValue, filter, ol, li, className;
        inputValue = document.getElementById('input');
        filter = inputValue.value.toUpperCase();
        ol = document.getElementById('ol');
        li = ol.getElementsByClassName('contact-group');

        for( i = 0; i < li.length; i++){
            className = li[i].getElementsByClassName('contact')[0];
            listParent = $(li[i]).parent();
            if (className.innerHTML.toUpperCase().indexOf(filter) > -1){
                $(listParent).css('display', '');
            }else{
                $(listParent).css('display', 'none');
            }
        }

        // function to diplay no contact found
        var contact;
        contact = document.getElementsByClassName('contact-display');
        for( i = 0; i < li.length; i++){
            var val = $(contact[i]).css('display');
            if (val == 'list-item'){
                var value = true;
            }
            if (value){
                $('.nocontact').css('display', 'none');
            }else{
            $('.nocontact').css('display', 'block');
            } 
        }            
        
   }
   //function to clear search input
   function clearSearch(){
       $('#input').val('');
   }
    $('#input').keyup(function(){
        search();
    })
})

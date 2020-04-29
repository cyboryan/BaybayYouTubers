var checkBoxes = $('tbody .user_checkbox');
    checkBoxes.change(function () {
        $('#addAdmin').prop('disabled', checkBoxes.filter(':checked').length < 1);
    });
    $('tbody .user_checkbox').change();
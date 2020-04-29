var checkBoxes = $('tbody .student_checkbox');
    checkBoxes.change(function () {
        $('#enrollStudentSubmit').prop('disabled', checkBoxes.filter(':checked').length < 1);
    });
    $('tbody .student_checkbox').change();
<script src="https://authcdn.geeksforgeeks.org/js/auth.min.js?ver=0.1"></script>

var instituteListBlood = new Bloodhound({
    initialize: false,
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    sufficient: 5,
    prefetch: {
        url: 'https://api.geeksforgeeks.org/api/institutes/all'
    },
    remote: {
        url: 'https://api.geeksforgeeks.org/api/institutes/%QUERY/all',
        wildcard: '%QUERY',
        filter: function (data) {
            // console.log(data);
            instituteListBlood.add(data);
            return data;
        }
    }
});
$(document).ready(function () {

    instituteListBlood.clearPrefetchCache();
    instituteListBlood.initialize();
    $('input[name=institute]').typeahead({
        minLength: 2,
        dynamic: false,
        highlight: true,
        cache: "sessionStorage",
        searchOnfocus: true,
        offset: true,
        blurOnTab: true
    }, {
        displaykey: 'value',
        limit: 15,
        source: instituteListBlood.ttAdapter(),
        accent: true,
        templates: {
            empty: [
                ''
            ].join('\n')
        }
    });
});


$('body').on('submit', 'form.no-email-form', function (e) {
    e.preventDefault();
    var type = "email";

    if (!isValidFields()) {
        return;
    }
    $('.submit-loader').show();
    $.ajax({
        url: 'ajax/roadBlockAjax.php',
        data: $(this).serialize() + '&type=' + type,
        type: 'POST',
        success: function (data) {
            if (data.trim() == "Error!") {
                window.location.href = "https://auth.geeksforgeeks.org/";
            }
            else if (data.trim() == "Success") {
                window.location.href = "https://www.geeksforgeeks.org/how-to-use-multiple-submit-buttons-in-an-html-form/";
            }
            else {
                $('p.response').html(data.trim());
                $('.submit-loader').hide();
            }
        },
        error: function (data) {
            console.log(data);
            $('.submit-loader').hide();
        }
    });
});

$('.skip-btn').click(function (e) {
    e.preventDefault();
    var type = 'skip';
    $('.submit-loader').show();
    $.ajax({
        url: 'ajax/roadBlockAjax.php',
        data: 'type=' + type,
        type: 'POST',
        success: function (data) {
            if (data.trim() == "Error!") {
                window.location.href = "https://auth.geeksforgeeks.org/";
            }
            else if (data.trim() == "Success") {
                window.location.href = "https://www.geeksforgeeks.org/how-to-use-multiple-submit-buttons-in-an-html-form/";
            }
            else {
                $('.submit-loader').hide();
                $('p.response').html(data.trim());
            }
        },
        error: function (data) {
            console.log(data);
            $('.submit-loader').hide();
        }
    });
});

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function isValidFields() {
    var name = $('.no-email-form').find('input[name=name]').val().trim();
    var phone = $('.no-email-form').find('input[name=phone]').val().trim();
    var city = $('.no-email-form').find('input[name=city]').val().trim();
    var gender = $('.no-email-form').find('select[name=gender]').val();
    var hq = $('.no-email-form').find('select[name=hq_details]').val();
    var state = $('.no-email-form').find('select[name=stateid]').val();
    var workExp = $('.no-email-form').find('input[name=work_experience]').val();
    var gradYear = $('.no-email-form').find('input[name=graduation_year]').val().trim();
    var institution = $('.no-email-form').find('input[name=institute]').length ? $('.no-email-form').find('input[name=institute]').val().trim() : '';
    var isSchoolStudent = $('input[name="is_school_student"]').prop('checked');
    var schoolYear = $('.no-email-form').find('select[name=school_class]').val();

    if (name.length > 50) {
        showtoast("Size Limit for Display Name exceeded");
        $('.no-email-form').find('input[name=name]').focus();
        return false;
    }
    if (phone.length > 20) {
        showtoast("Size Limit for Contact Number exceeded");
        $('.no-email-form').find('input[name=phone]').focus();
        return false;
    }
    if (city.length > 60) {
        showtoast("Size Limit for City exceeded");
        $('.no-email-form').find('input[name=city]').focus();
        return false;
    }
    if (gradYear.length > 4) {
        showtoast("Size Limit for Graduation Year exceeded");
        $('.no-email-form').find('input[name=graduation_year]').focus();
        return false;
    }
    if (workExp.length > 2) {
        showtoast("Size Limit for Work Experience exceeded");
        $('.no-email-form').find('input[name=work_experience]').focus();
        return false;
    }
    if (institution.length > 300) {
        showtoast("Size Limit for Institution/Organization exceeded");
        $('.no-email-form').find('input[name=institution]').focus();
        return false;
    }
    if (workExp < 0 || workExp > 100) {
        showtoast("Please enter a valid Work Experience");
        $('.no-email-form').find('input[name=work_experience]').focus();
        return false;
    }
    if (isSchoolStudent && (schoolYear == null || schoolYear.length == 0)) {
        showtoast("Please enter school class");
        $('.no-email-form').find('select[name=school_class]').focus();
        return false;
    }

    var curYear = new Date().getFullYear()
    if (gradYear != '' && (gradYear < 1950 || gradYear > (curYear + 10))) {
        showtoast("Please enter a valid Graduation Year");
        $('.no-email-form').find('input[name=graduation_year]').focus();
        return false;
    }

    if (hq == "8") {       // Validating Other Qualification Value when Others Option is selected in Qualification
        var otherQualification = $('body').find('input[name=other_qualification]').val().trim();
        if (!otherQualification.length || otherQualification.length > 300) {
            $('body').find('input[name=other_qualification]').focus();
            showtoast("Invalid Other qualification entered");
            invalid = 1;
            return;
        }
    }

    return true;
}

var prevotherHqValue = $('input[name="other_qualification"]').val();
$('.no-email-form').on('change', 'select[name=hq_details]', function () {
    $('select[name=school_class]').val('');
    $('#school-class-div').addClass('hide');
    $('input[name="is_school_student"]').prop('checked', false);
    // $('input[name="work_experience"]').closest('.col-sm-6').show();
    $('input[name=graduation_year]').val('');
    $('input[name=work_experience]').val(0);
    $('#graduation-year-div, #work-experience-div').removeClass('hide');

    if ($(this).val() == "8") {
        $(this).closest('.column-div').find('.other-qualification-container').show();
        $(this).closest('.column-div').find('.other_qualification').focus();
        $('input[name="other_qualification"]').val(prevotherHqValue);
    } else {
        $(this).closest('.column-div').find('.other-qualification-container').hide();
        $('input[name=other_qualification]').val('');
        if ($(this).val() == '9') {
            $('input[name="is_school_student"]').prop('checked', true);
            $('#school-class-div').removeClass('hide');
            // $('input[name="work_experience"]').closest('.col-sm-6').hide();
            $('#graduation-year-div, #work-experience-div').addClass('hide');
        }
    }
})

$(document).ready(function () {
    var prevHqValue = $('select[name="hq_details"]').val();
    $('input[name="is_school_student"]').change(function (event) {
        let curHqValue = $('select[name="hq_details"]').val();
        if (prevHqValue == '9' && curHqValue == '9') {
            $(this).prop('checked', !$(this).prop('checked'));
            event.preventDefault();
            showtoast("Please change Highest Qualification");
            return false;
        }
        $('select[name=school_class]').val('');
        $('input[name=other_qualification]').val('');
        if (this.checked) {
            $('select[name="hq_details"]').val("9").change();
            $('#school-class-div').removeClass('hide');
            // $('#graduation-year-div, #work-experience-div').removeClass('hide');
            // $('input[name="work_experience"]').closest('.col-sm-6').hide();
        } else {
            $('select[name="hq_details"]').val(prevHqValue).change();
            $('input[name="other_qualification"]').val(prevotherHqValue);
            $('#school-class-div').addClass('hide');
            // $('#graduation-year-div, #work-experience-div').addClass('hide');
            // $('input[name="work_experience"]').closest('.col-sm-6').show();
        }
    });
});
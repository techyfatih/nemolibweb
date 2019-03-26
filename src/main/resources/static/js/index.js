$(document).ready(function() {
    const uploadInput = $("#uploadInput");
    const graphFile = $('#graphFile');
    const label = graphFile.siblings('.custom-file-label');

    const textInput = $("#textInput");
    const graphText = $('#graphText');

    const form = $("#nemolibwebForm");
    const formInputs = $('#nemolibwebForm :input');

    const output = $('#output');


    textInput.hide();

    function getInputType() {
        return input = $('input[name=inputRadios]:checked').val();
    }

    graphFile.on('change', function() {
        const fileName = $(this).val().split('\\').pop();
        if (fileName === '') {
            label.html('No file uploaded');
        } else {
            label.html(fileName);
        }
    });

    $('input[name=inputRadios]').change(function() {
        const input = getInputType();
        if (input == 'upload') {
            uploadInput.show();
            textInput.hide();

            graphFile.prop('required', true);
            graphText.prop('required', false);
        } else {
            uploadInput.hide();
            textInput.show();

            graphFile.prop('required', false);
            graphText.prop('required', true);
        }
    });

    form.submit(function(e) {
        e.preventDefault();
        const data = new FormData(form[0]);

        const input = getInputType();
        if (input == 'upload') {
            const file = graphFile.val();
            console.log(file);
            if (!file) {
                output.val('No input provided; please either upload a file or paste text describing the graph.');
                return;
            }
            data.delete('graphText');
        } else {
            const file = graphText.val();
            console.log(file);
            if (!file) {
                output.val('No input provided; please either upload a file or paste text describing the graph.');
                return;
            }
            data.delete('graphFile');
        }

        let motifSize = data.get('motifSize');
        if (motifSize === '') {
            motifSize = 3;
        }
        let randGraphCount = data.get('randGraphCount');
        if (randGraphCount === '') {
            randGraphCount = 1000;
        }

        console.log(data.get('graphText'));
        console.log(data.get('graphFile'));

        if (!data.get('graphText') && !data.get('graphFile')) {
            output.val('No input provided; please either upload a file or paste text describing the graph.');
            return;
        }

        output.val('Finding network motifs for target graph...\n(motif size: ' + motifSize + ', rand graph count: ' + randGraphCount + ')\n');
        $.ajax('/findmotifs', {
            type: 'POST',
            data,
            cache: false,
            contentType: false,
            processData: false,
            error: function(xhr) {
                output.val(output.val() + '\nAn error occurred, please try again or contact server admin. Error code ' + xhr.status);
                formInputs.prop('disabled', false);
            },
            success: function(response) {
                output.val(output.val() + '\n' + response);
                formInputs.prop('disabled', false);
            }
        });
        formInputs.prop('disabled', true);
    });
})
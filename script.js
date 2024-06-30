function toggleAnonymous() {
    const isAnonymous = document.getElementById('anonymous').checked;
    document.getElementById('name').disabled = isAnonymous;
    document.getElementById('email').disabled = isAnonymous;
    document.getElementById('name').required = !isAnonymous;
    document.getElementById('email').required = !isAnonymous;
}

function validateForm() {
    const isAnonymous = document.getElementById('anonymous').checked;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    if (!isAnonymous && (name === '' || email === '')) {
      alert('Please fill in your name and email, or select the anonymous option.');
      return false;
    }

    return true;
}

document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    var templateParams = {
        from_name: document.getElementById('name').value,
        reply_to: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    if (document.getElementById('anonymous').checked) {
        templateParams.from_name = 'Anonymous';
        templateParams.reply_to = '';
    }

    emailjs.send('service_b49sgai', 'template_9rhsble', templateParams)
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
           alert('Pesan berhasil dikirim!');
        }, function(error) {
           console.log('FAILED...', error);
           alert('Pesan gagal dikirim. Silakan coba lagi.');
        });
});

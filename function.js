(function(){
    var wl = window.location;
    // Check browser has required bits to function
    if(! window.XMLHttpRequest) {
        alert('This browser doesnt support XMLHttpRequest so cant send an email');
        return false;
    }

    // Create request
    var thisUrl = wl.protocol + '//' + wl.host + wl.pathname;
    var data = {
        key: 'your-mandrill-key',
        message: {
            html: 'New URL bookmark: <a href=\'' + thisUrl + '\'>' + thisUrl + '</a>',
            text: 'New URL bookmark: ' + thisUrl,
            subject: 'New URL bookmark: ' + thisUrl,
            from_email: 'your@email.com',
            from_name: 'YourName',
            to: [
                {
                    'email': 'your@email.com',
                    'name': 'YourName',
                    'type': 'to'
                }
            ],
        }
    };
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://mandrillapp.com/api/1.0/messages/send.json', true);
    xmlhttp.send(JSON.stringify(data));

    // Handle response
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status != 200) {
                alert('Sorry, something went wrong...' );
                return false;
            } else if (xmlhttp.status == 200) {
                alert('Email sent with url: ' + thisUrl);
                return true;
            }
        }
    };

})()
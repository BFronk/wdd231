
myinfo = new URLSearchParams(window.location.search)
console.log(myinfo)
document.querySelector('#results').innerHTML = `
<p>First Name: ${myinfo.get('first name')}
<p>Last Name: ${myinfo.get('lastname')}
<p>Email: ${myinfo.get('email')}
<p>Phone: ${myinfo.get('phone')}
<p>Membership: ${myinfo.get('audience')}
<p>Orgaization: ${myinfo.get('org')}
`
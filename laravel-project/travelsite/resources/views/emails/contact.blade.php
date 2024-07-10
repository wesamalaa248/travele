<!DOCTYPE html>
<html>
<head>
    <title>Contact Details</title>
</head>
<body>
<h2>Hey, It's me {{ $contact->name }}</h2> 
<br>
    <h1>Contact Details</h1>
    <p><strong>Name:</strong> {{ $contact->name }}</p>
    <p><strong>Email:</strong> {{ $contact->email }}</p>
    <p><strong>Message:</strong> {{ $contact->message }}</p>

Thank you
</body>
</html>

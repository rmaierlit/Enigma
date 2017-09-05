# Enigma

### Starting Enigma
If you wish, you can change the server secret by editing _server/helpers/secret.js_

Then run these commands:
````
npm install
npm start
````

### How Enigma Works

Enigma performs two layers of encryption to ensure users can have complete confidence in the security and privacy of their messages. First the message field itself is encrypted on the client side, using the passphrase in the hash route of the application. This encrypted message is then combined with the name field and the expiration field to create a JSON object (the "tablet") that is then send to the server for the second layer of encryption.

At this point the tablet will look something like this:
```
{
  tablet: {
    name: "Robert",
    encrypted: 'U2FsdGVkX19SG8oqUAFtUQyoxTI9fO4MWokmXJeqids='
    expDate: '2017-09-10T07:00:00.000Z'
  }
}
```

The server encrypts this entire JSON object using a secret passphrase (stored in secret.js). After this second layer of encryption, the encrypted tablet is sent back in the http response.

```
{
  encryptedTablet: d73073d794a1f0eee2827a8b6e2417bd427fd494522df6a4540883c5d5498622384f06839444f9abdf73f04eb4f32284dcb01b6b785abc74a48d1a848c94bb6a58c3901cd0d8f19fdd257d41ab06cfeee4e8dcc63c1603cd711f7f6465c309138ddb805fbb022de71e1a9b2238e80107b5
}
```

Because the message is encrypted both on the client and the server, neither the user nor the Enigma administrators will have all the information necessary for decryption. Both sides will have to work together. This approach has several advantages:

* Users do not need to "trust" Enigma to keep secret the contents of their messages, as the message field itself is already encrypted when sent to the server, and the server never sees the client-side passphrase.

* An expired message is truly unavailable to any user, as the server will see that the expiration date has passed after the first step of decryption and refuse to send the tablet. Even if the user has the client passphrase and undestands the encryption algorithm, they will be unable to perform the decryption on their own, as they lack the client-side passcode.

* Since the expiration date is part of the top layer of encryption, a user cannot alter part of the final encrypted tablet to change or remove the expiration date.


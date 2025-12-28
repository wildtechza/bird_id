Create Keystore if not already done:
`keytool -genkey -v -keystore bird_id.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias bird_id`

Generate key(s):
`java -jar pepk.jar --keystore=bird_id.keystore --alias=bird_id --output=bird_id_keys.zip --include-cert --rsa-aes-encryption --encryption-key-path=encryption_public_key.pem`

Build signed APK with Capacitor:

Run from "mobile" folder:
```bash
npx cap build android --keystorepath="../android_keys/bird_id.keystore" --keystorepass="..." --keystorealias="bird_id" --keystorealiaspass="..."
```

Replace:
- `your_keystore_password` with the password you created for the keystore
- `your_key_password` with the password for the key alias

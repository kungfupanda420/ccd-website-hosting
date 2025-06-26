import secrets

# Generate a secure 32-character secret key
secret_key = secrets.token_urlsafe(32)

print(f"Your secret key:\n{secret_key}")

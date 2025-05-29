import os
import asyncio
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from dotenv import load_dotenv

load_dotenv()

conf = ConnectionConfig(
    MAIL_USERNAME='sip@nitc.ac.in',
    MAIL_PASSWORD=os.getenv('MAIL_PASSWORD'),
    MAIL_FROM='sip@nitc.ac.in',
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True
)

# message = MessageSchema(
#     subject="Termination of Services",
#     recipients=["nadeem_b230440cs@nitc.ac.in"],  # must be a list
#     body="""
#     <h3>Dear Student</h3>
#     <p>Dear student </p>
#     <p>We thank you for your contributions and wish you the best in your future endeavors.</p>
#     <p>Sincerely,</p>
#     <p>[Your Name]  
#     <br>[Your Title]  
#     <br>[Organization Name]</p>
#     """,
#     subtype="html"
# )

# async def send_email():
#     fm = FastMail(conf)
#     await fm.send_message(message)

# # Run the async function
# if __name__ == "__main__":
#     asyncio.run(send_email())
